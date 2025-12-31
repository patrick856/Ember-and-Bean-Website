using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Coffee_Beans_Site.Models;

public class Order
{
    public int Id { get; set; }

    [Required, MaxLength(150)]
    public required string CustomerName { get; set; }

    [Required, EmailAddress, MaxLength(150)]
    public required string Email { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    public decimal TotalAmount { get; set; }

    public string? StripePaymentIntentId { get; set; }

    [MaxLength(50)]
    public string? Status { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<OrderItem> Items { get; set; } = new();
}
