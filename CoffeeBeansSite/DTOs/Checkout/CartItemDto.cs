namespace Coffee_Beans_Site.DTOs.Checkout;

public class CartItemDto
{
    public int CoffeeProductId { get; set; }
    public string BagSize { get; set; } // "12oz" or "2lb"
    public int Quantity { get; set; }
}
