using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Coffee_Beans_Site.Models;

public class CoffeeProduct
{
    public int Id { get; set; }

    [Required, MaxLength(150)]
    public required string Name { get; set; }

    [Required, MaxLength(100)]
    public required string Origin { get; set; }

    [MaxLength(300)]
    public string? TastingNotes { get; set; }

    [Required, MaxLength(50)]
    public required string RoastLevel { get; set; }

    public string? ImageUrl { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    public decimal Price12oz { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    public decimal Price2lb { get; set; }

    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
