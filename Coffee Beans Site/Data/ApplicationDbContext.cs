using Microsoft.EntityFrameworkCore;
using Coffee_Beans_Site.Models;

namespace Coffee_Beans_Site.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<CoffeeProduct> CoffeeProducts { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<ContactMessage> ContactMessages { get; set; }
    public DbSet<AdminUser> AdminUsers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<OrderItem>()
            .HasOne(o => o.Order)
            .WithMany(i => i.Items)
            .HasForeignKey(o => o.OrderId);
    }
}
