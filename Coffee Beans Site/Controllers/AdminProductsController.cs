using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Coffee_Beans_Site.Data;
using Coffee_Beans_Site.Models;

/// <summary>
/// Admin controller for managing coffee products.
/// All endpoints require JWT authentication (admin only).
/// </summary>
[ApiController]
[Route("api/admin/products")]
[Authorize]
public class AdminProductsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public AdminProductsController(ApplicationDbContext db)
    {
        _db = db;
    }

    /// <summary>
    /// Get all products (including inactive ones). Admin-only endpoint.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _db.CoffeeProducts.ToListAsync();
        return Ok(products);
    }

    /// <summary>
    /// Create a new coffee product. IsActive defaults to true if not specified.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CoffeeProduct product)
    {
        // Ensure new products are active by default
        // IsActive is already set to true by default in the model, but we ensure it here as well
        product.IsActive = true;
        product.CreatedAt = DateTime.UtcNow;
        
        _db.CoffeeProducts.Add(product);
        await _db.SaveChangesAsync();
        return Ok(product);
    }

    /// <summary>
    /// Update an existing coffee product.
    /// IsActive can be set to false to disable/hide the product from customers (soft delete).
    /// Disabled products won't appear in public product listings but remain in the database.
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CoffeeProduct updated)
    {
        var product = await _db.CoffeeProducts.FindAsync(id);
        if (product == null) return NotFound();

        product.Name = updated.Name;
        product.Origin = updated.Origin;
        product.TastingNotes = updated.TastingNotes;
        product.RoastLevel = updated.RoastLevel;
        product.Price12oz = updated.Price12oz;
        product.Price2lb = updated.Price2lb;
        product.ImageUrl = updated.ImageUrl;
        product.IsActive = updated.IsActive; // Set to false to disable product

        await _db.SaveChangesAsync();
        return Ok(product);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _db.CoffeeProducts.FindAsync(id);
        if (product == null) return NotFound();

        _db.CoffeeProducts.Remove(product);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
