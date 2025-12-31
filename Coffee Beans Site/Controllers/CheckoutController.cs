using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Stripe.Checkout;
using Coffee_Beans_Site.Data;
using Coffee_Beans_Site.DTOs.Checkout;

[ApiController]
[Route("api/checkout")]
public class CheckoutController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IConfiguration _config;

    public CheckoutController(ApplicationDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    /// <summary>
    /// Creates a Stripe Checkout Session for the provided cart items.
    /// 
    /// CHECKOUT FLOW:
    /// 1. Validates cart items (product IDs, bag sizes, quantities)
    /// 2. Loads current product prices from database (prevents client-side price manipulation)
    /// 3. Recalculates totals server-side using database prices
    /// 4. Creates Stripe Checkout Session with validated prices
    /// 5. Stores cart items as metadata for webhook processing
    /// 6. Returns checkout URL to redirect customer to Stripe payment page
    /// 
    /// After successful payment, Stripe webhook creates the order in our database.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateCheckoutSession(
        [FromBody] CheckoutRequestDto request)
    {
        try
        {
            if (request == null || request.Items == null || !request.Items.Any())
                return BadRequest("Cart is empty.");

            if (string.IsNullOrWhiteSpace(request.Email))
                return BadRequest("Email is required.");

            // Get frontend URLs from configuration
            // Success URL should redirect to frontend homepage with ?checkout=success query parameter
            // Cancel URL redirects back to cart page
            var successUrl = _config["Frontend:SuccessUrl"];
            var cancelUrl = _config["Frontend:CancelUrl"];
            var frontendBaseUrl = _config["Frontend:BaseUrl"] ?? "http://localhost:3000";
            
            if (string.IsNullOrWhiteSpace(successUrl) || string.IsNullOrWhiteSpace(cancelUrl))
                return StatusCode(500, "Checkout configuration is missing. Please contact support.");

            // Validate URLs are absolute (Stripe requires absolute URLs)
            if (!Uri.TryCreate(successUrl, UriKind.Absolute, out var successUri))
                return StatusCode(500, $"Invalid SuccessUrl format: {successUrl}. Must be an absolute URL (e.g., http://localhost:3000/?checkout=success)");
            
            if (!Uri.TryCreate(cancelUrl, UriKind.Absolute, out var cancelUri))
                return StatusCode(500, $"Invalid CancelUrl format: {cancelUrl}. Must be an absolute URL (e.g., http://localhost:3000/cart)");

            // STEP 1: Validate and load products from database
            // WHY: We recalculate prices server-side to prevent client-side manipulation
            // This ensures customers always pay the current database price, not a stale client-side price
            var productIds = request.Items.Select(i => i.CoffeeProductId).Distinct();

            var products = await _db.CoffeeProducts
                .Where(p => p.IsActive && productIds.Contains(p.Id))
                .ToDictionaryAsync(p => p.Id);

            if (products.Count != productIds.Count())
                return BadRequest("One or more products are invalid or no longer available.");

            // STEP 2: Validate cart items and build Stripe line items
            // WHY RECALCULATE PRICES: Prices are loaded from database, not trusted from client
            // This prevents price manipulation attacks where a malicious client sends lower prices
            var lineItems = new List<SessionLineItemOptions>();
            var cartItemsMetadata = new List<string>(); // Store cart items as JSON for webhook

            foreach (var item in request.Items)
            {
                // Validate quantity
                if (item.Quantity <= 0)
                    return BadRequest($"Invalid quantity for product ID {item.CoffeeProductId}.");

                // Validate bag size
                if (string.IsNullOrWhiteSpace(item.BagSize))
                    return BadRequest($"Bag size is required for product ID {item.CoffeeProductId}.");

                if (item.BagSize != "12oz" && item.BagSize != "2lb")
                    return BadRequest($"Invalid bag size '{item.BagSize}'. Valid sizes are '12oz' and '2lb'.");

                var product = products[item.CoffeeProductId];

                // Get price from database (not from client request)
                decimal unitPrice = item.BagSize switch
                {
                    "12oz" => product.Price12oz,
                    "2lb" => product.Price2lb,
                    _ => throw new Exception($"Invalid bag size '{item.BagSize}'. Valid sizes are '12oz' and '2lb'.")
                };

                if (unitPrice <= 0)
                    return BadRequest($"Product '{product.Name}' has an invalid price for size {item.BagSize}.");

                // Store cart item metadata as JSON string for webhook to parse
                // Format: "ProductId|BagSize|Quantity|UnitPrice|ProductName"
                cartItemsMetadata.Add($"{product.Id}|{item.BagSize}|{item.Quantity}|{unitPrice}|{product.Name}");

                // Convert relative image URLs to absolute URLs for Stripe
                List<string>? imageUrls = null;
                if (!string.IsNullOrWhiteSpace(product.ImageUrl))
                {
                    if (Uri.TryCreate(product.ImageUrl, UriKind.Absolute, out _))
                    {
                        // Already absolute URL
                        imageUrls = new List<string> { product.ImageUrl };
                    }
                    else if (product.ImageUrl.StartsWith("/"))
                    {
                        // Relative URL - convert to absolute using frontend base URL
                        var baseUri = new Uri(frontendBaseUrl.TrimEnd('/'));
                        var imageUri = new Uri(baseUri, product.ImageUrl);
                        imageUrls = new List<string> { imageUri.ToString() };
                    }
                    // If neither absolute nor relative starting with /, omit images (Stripe allows this)
                }

                lineItems.Add(new SessionLineItemOptions
                {
                    Quantity = item.Quantity,
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        UnitAmount = (long)(unitPrice * 100), // Convert to cents
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = $"{product.Name} ({item.BagSize})",
                            Images = imageUrls
                        }
                    }
                });
            }

            // STEP 3: Create Stripe Checkout Session
            // Success URL redirects to frontend homepage with ?checkout=success query parameter
            // Cancel URL redirects back to cart page
            // Metadata stores cart items for webhook to create order in database
            var options = new SessionCreateOptions
            {
                Mode = "payment",
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = lineItems,
                CustomerEmail = request.Email,
                SuccessUrl = successUrl, // e.g., http://localhost:3000/?checkout=success
                CancelUrl = cancelUrl,   // e.g., http://localhost:3000/cart
                Metadata = new Dictionary<string, string>
                {
                    { "cartItems", string.Join("||", cartItemsMetadata) }, // Store cart items for webhook
                    { "customerName", request.CustomerName ?? "Unknown" } // Store customer name in metadata
                }
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            // STEP 4: Return checkout URL to frontend
            // Frontend should redirect customer to this URL to complete payment
            // After payment, Stripe webhook will create the order in our database
            return Ok(new
            {
                checkoutUrl = session.Url
            });
        }
        catch (StripeException ex)
        {
            // Check if it's an API key issue
            if (ex.Message.Contains("Invalid API Key") || ex.Message.Contains("sk_test_xxx") || ex.Message.Contains("sk_live_xxx"))
            {
                return StatusCode(500, "Stripe API key is not configured. Please configure your Stripe secret key in appsettings.json. Get your keys from https://dashboard.stripe.com/apikeys");
            }
            // Check if it's a URL validation issue
            if (ex.Message.Contains("Not a valid URL") || ex.Message.Contains("url") || ex.Message.Contains("URL"))
            {
                var successUrl = _config["Frontend:SuccessUrl"];
                var cancelUrl = _config["Frontend:CancelUrl"];
                return StatusCode(500, $"Invalid URL configuration. SuccessUrl: '{successUrl}', CancelUrl: '{cancelUrl}'. Both must be absolute URLs (e.g., http://localhost:3000/success)");
            }
            return StatusCode(500, $"Payment processing error: {ex.Message}");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred during checkout: {ex.Message}");
        }
    }
}
