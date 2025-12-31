namespace Coffee_Beans_Site.DTOs.Checkout;

public class CheckoutRequestDto
{
    public string CustomerName { get; set; }
    public string Email { get; set; }
    public List<CartItemDto> Items { get; set; }
}
