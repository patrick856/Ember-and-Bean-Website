public class ProductListDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Origin { get; set; }
    public string RoastLevel { get; set; }
    public string ImageUrl { get; set; }

    public decimal Price12oz { get; set; }
    public decimal Price2lb { get; set; }
}
