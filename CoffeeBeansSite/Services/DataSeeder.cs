using Coffee_Beans_Site.Data;
using Coffee_Beans_Site.Models;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace Coffee_Beans_Site.Services;

/// <summary>
/// Service responsible for seeding initial demo data into the database.
/// This seeder is idempotent - it can be run multiple times safely without creating duplicates.
/// </summary>
public class DataSeeder
{
    private readonly ApplicationDbContext _db;

    public DataSeeder(ApplicationDbContext db)
    {
        _db = db;
    }

    /// <summary>
    /// Seeds the database with admin user and coffee products if they don't already exist.
    /// Also updates existing products' image URLs to match the current image files.
    /// </summary>
    public async Task SeedAsync()
    {
        await SeedAdminUserAsync();
        await SeedCoffeeProductsAsync();
        await UpdateExistingProductImagesAsync();
    }

    /// <summary>
    /// Seeds a default admin user (username: admin, password: admin) if it doesn't exist.
    /// </summary>
    private async Task SeedAdminUserAsync()
    {
        try
        {
            // Check if admin user already exists
            var existingAdmin = await _db.AdminUsers
                .FirstOrDefaultAsync(u => u.Username == "admin");

            if (existingAdmin == null)
            {
                // Hash password using BCrypt (automatically generates salt)
                var passwordHash = BCrypt.Net.BCrypt.HashPassword("admin");

                var adminUser = new AdminUser
                {
                    Username = "admin",
                    PasswordHash = passwordHash
                };

                _db.AdminUsers.Add(adminUser);
                await _db.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            // Log error but don't fail application startup
            // This can happen if the database schema isn't ready yet
            Console.WriteLine($"Warning: Could not seed admin user: {ex.Message}");
        }
    }

    /// <summary>
    /// Seeds 4-6 realistic coffee products if they don't already exist.
    /// Checks for existing products by name to avoid duplicates.
    /// </summary>
    private async Task SeedCoffeeProductsAsync()
    {
        try
        {
            var productsToSeed = new List<CoffeeProduct>
            {
            new CoffeeProduct
            {
                Name = "Ethiopia Yirgacheffe",
                Origin = "Ethiopia",
                RoastLevel = "Light",
                TastingNotes = "Floral, citrus, tea-like body with bright acidity",
                Price12oz = 18.00m,
                Price2lb = 55.00m,
                ImageUrl = "/images/Ethiopia_Yirgacheffe.png",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new CoffeeProduct
            {
                Name = "Colombia Huila",
                Origin = "Colombia",
                RoastLevel = "Medium",
                TastingNotes = "Chocolate, caramel, balanced acidity with smooth finish",
                Price12oz = 16.00m,
                Price2lb = 48.00m,
                ImageUrl = "/images/Colombia_Huila.png",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new CoffeeProduct
            {
                Name = "Kenya AA",
                Origin = "Kenya",
                RoastLevel = "Light-Medium",
                TastingNotes = "Black currant, wine-like acidity, full body",
                Price12oz = 20.00m,
                Price2lb = 60.00m,
                ImageUrl = "/images/Kenya_AA.png",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new CoffeeProduct
            {
                Name = "Sumatra Mandheling",
                Origin = "Indonesia",
                RoastLevel = "Dark",
                TastingNotes = "Earthy, herbal, low acidity with bold body",
                Price12oz = 17.00m,
                Price2lb = 50.00m,
                ImageUrl = "/images/Sumatra_Mandheling.png",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new CoffeeProduct
            {
                Name = "Guatemala Antigua",
                Origin = "Guatemala",
                RoastLevel = "Medium",
                TastingNotes = "Cocoa, spice, nutty with balanced sweetness",
                Price12oz = 15.00m,
                Price2lb = 45.00m,
                ImageUrl = "/images/Guatemala_Antigua.png",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new CoffeeProduct
            {
                Name = "Brazil Cerrado",
                Origin = "Brazil",
                RoastLevel = "Medium-Dark",
                TastingNotes = "Nutty, chocolate, low acidity with creamy body",
                Price12oz = 14.00m,
                Price2lb = 42.00m,
                ImageUrl = "/images/Brazil_Cerrado.png",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
            };

            // Get existing product names to avoid duplicates
            var existingNames = await _db.CoffeeProducts
                .Select(p => p.Name)
                .ToListAsync();

            // Only add products that don't already exist
            var newProducts = productsToSeed
                .Where(p => !existingNames.Contains(p.Name))
                .ToList();

            if (newProducts.Any())
            {
                _db.CoffeeProducts.AddRange(newProducts);
                await _db.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            // Log error but don't fail application startup
            // This can happen if the database schema isn't ready yet
            Console.WriteLine($"Warning: Could not seed coffee products: {ex.Message}");
        }
    }

    /// <summary>
    /// Updates image URLs for existing products to match the current image file names.
    /// This ensures existing products in the database use the correct image paths.
    /// </summary>
    private async Task UpdateExistingProductImagesAsync()
    {
        try
        {
            // Map of product names to their corresponding image URLs
            var productImageMap = new Dictionary<string, string>
            {
                { "Ethiopia Yirgacheffe", "/images/Ethiopia_Yirgacheffe.png" },
                { "Colombia Huila", "/images/Colombia_Huila.png" },
                { "Kenya AA", "/images/Kenya_AA.png" },
                { "Sumatra Mandheling", "/images/Sumatra_Mandheling.png" },
                { "Guatemala Antigua", "/images/Guatemala_Antigua.png" },
                { "Brazil Cerrado", "/images/Brazil_Cerrado.png" }
            };

            // Get all existing products
            var existingProducts = await _db.CoffeeProducts.ToListAsync();

            bool hasChanges = false;

            foreach (var product in existingProducts)
            {
                // Update image URL if we have a mapping for this product name
                if (productImageMap.TryGetValue(product.Name, out var newImageUrl))
                {
                    if (product.ImageUrl != newImageUrl)
                    {
                        product.ImageUrl = newImageUrl;
                        hasChanges = true;
                    }
                }
            }

            // Save changes if any updates were made
            if (hasChanges)
            {
                await _db.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            // Log error but don't fail application startup
            Console.WriteLine($"Warning: Could not update existing product images: {ex.Message}");
        }
    }
}

