using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Coffee_Beans_Site.Data;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public ProductsController(ApplicationDbContext db)
    {
        _db = db;
    }

    // GET: /api/products
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _db.CoffeeProducts
            .Where(p => p.IsActive)
            .OrderBy(p => p.Name)
            .Select(p => new ProductListDto
            {
                Id = p.Id,
                Name = p.Name,
                Origin = p.Origin,
                RoastLevel = p.RoastLevel,
                ImageUrl = p.ImageUrl,
                Price12oz = p.Price12oz,
                Price2lb = p.Price2lb
            })
            .ToListAsync();

        return Ok(products);
    }

    // GET: /api/products/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _db.CoffeeProducts
            .Where(p => p.IsActive && p.Id == id)
            .Select(p => new ProductDetailsDto
            {
                Id = p.Id,
                Name = p.Name,
                Origin = p.Origin,
                TastingNotes = p.TastingNotes,
                RoastLevel = p.RoastLevel,
                ImageUrl = p.ImageUrl,
                Price12oz = p.Price12oz,
                Price2lb = p.Price2lb
            })
            .FirstOrDefaultAsync();

        if (product == null)
            return NotFound();

        return Ok(product);
    }
}
