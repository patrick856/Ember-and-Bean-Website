using Coffee_Beans_Site.DTOs.Checkout;
using Coffee_Beans_Site.Models;

public class CartService
{
    public decimal CalculateTotal(List<CartItemDto> items, List<CoffeeProduct> products)
    {
        decimal total = 0;
        foreach (var item in items)
        {
            var product = products.First(p => p.Id == item.CoffeeProductId);
            var price = item.BagSize == "12oz" ? product.Price12oz : product.Price2lb;
            total += price * item.Quantity;
        }
        return total;
    }
}