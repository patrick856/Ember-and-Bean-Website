using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using Coffee_Beans_Site.Data;
using Coffee_Beans_Site.Models;

[ApiController]
[Route("api/stripe")]
public class StripeWebhookController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IConfiguration _config;

    public StripeWebhookController(ApplicationDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    /// <summary>
    /// Stripe webhook endpoint that processes payment events.
    /// 
    /// WEBHOOK RESPONSIBILITY:
    /// - Receives checkout.session.completed event from Stripe after successful payment
    /// - Creates order record in database with customer information and order items
    /// - Retrieves cart items from session metadata (stored during checkout session creation)
    /// - Only creates order after payment is confirmed by Stripe (prevents unpaid orders)
    /// 
    /// This endpoint must be secured with Stripe webhook signature verification.
    /// </summary>
    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        var stripeSignature = Request.Headers["Stripe-Signature"];

        var webhookSecret = _config["Stripe:WebhookSecret"];

        Event stripeEvent;

        try
        {
            // Verify webhook signature to ensure request is from Stripe
            stripeEvent = EventUtility.ConstructEvent(
                json,
                stripeSignature,
                webhookSecret
            );
        }
        catch (Exception e)
        {
            return BadRequest($"Webhook Error: {e.Message}");
        }

        // Handle checkout.session.completed event (payment successful)
        if (stripeEvent.Type == "checkout.session.completed")
        {
            var session = stripeEvent.Data.Object as Session;

            if (session == null)
                return BadRequest("Invalid session data");

            // Create order record
            var order = new Order
            {
                CustomerName = session.CustomerDetails?.Name ?? "Unknown",
                Email = session.CustomerDetails?.Email ?? string.Empty,
                StripePaymentIntentId = session.PaymentIntentId,
                Status = "Paid",
                CreatedAt = DateTime.UtcNow,
                TotalAmount = 0m, // Will be calculated from items
                Items = new List<OrderItem>()
            };

            // Retrieve cart items from session metadata (stored during checkout session creation)
            // Format: "ProductId|BagSize|Quantity|UnitPrice|ProductName||..."
            if (session.Metadata != null && session.Metadata.TryGetValue("cartItems", out var cartItemsData))
            {
                var cartItems = cartItemsData.Split(new[] { "||" }, StringSplitOptions.RemoveEmptyEntries);

                foreach (var cartItem in cartItems)
                {
                    var parts = cartItem.Split('|');
                    if (parts.Length >= 5)
                    {
                        var productId = int.Parse(parts[0]);
                        var bagSize = parts[1];
                        var quantity = int.Parse(parts[2]);
                        var unitPrice = decimal.Parse(parts[3]);
                        var productName = parts[4];

                        order.Items.Add(new OrderItem
                        {
                            CoffeeProductId = productId,
                            ProductName = productName,
                            BagSize = bagSize,
                            Quantity = quantity,
                            UnitPrice = unitPrice
                        });

                        order.TotalAmount += unitPrice * quantity;
                    }
                }
            }
            else
            {
                // Fallback: If metadata is missing, try to get from Stripe line items
                // This is less reliable but provides a backup
                var lineItemService = new SessionLineItemService();
                var lineItems = lineItemService.List(session.Id);

                foreach (var item in lineItems)
                {
                    var unitPrice = (decimal)(item.Price?.UnitAmount / 100.0 ?? 0);
                    var quantity = (int)(item.Quantity ?? 1L);
                    
                    // Try to extract bag size from product name
                    var bagSize = item.Description?.Contains("12oz") == true ? "12oz" : "2lb";

                    order.Items.Add(new OrderItem
                    {
                        CoffeeProductId = 0, // Unknown without metadata
                        ProductName = item.Description ?? "Unknown Product",
                        BagSize = bagSize,
                        Quantity = quantity,
                        UnitPrice = unitPrice
                    });

                    order.TotalAmount += unitPrice * quantity;
                }
            }

            // Get customer name from metadata if available
            if (session.Metadata != null && session.Metadata.TryGetValue("customerName", out var customerName))
            {
                order.CustomerName = customerName;
            }

            // Save order to database
            _db.Orders.Add(order);
            await _db.SaveChangesAsync();
        }

        return Ok();
    }
}
