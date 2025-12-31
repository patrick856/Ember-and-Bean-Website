using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Coffee_Beans_Site.Models;

public class OrderItem
{
    public int Id { get; set; }

    public int OrderId { get; set; }
    public Order? Order { get; set; }

    public int CoffeeProductId { get; set; }
    public CoffeeProduct? CoffeeProduct { get; set; }

    [Required, MaxLength(150)]
    public required string ProductName { get; set; }

    [Required, MaxLength(20)]
    public required string BagSize { get; set; }

    public int Quantity { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    public decimal UnitPrice { get; set; }
}
