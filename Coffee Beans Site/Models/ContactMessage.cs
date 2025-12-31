using System.ComponentModel.DataAnnotations;

namespace Coffee_Beans_Site.Models;

public class ContactMessage
{
    public int Id { get; set; }

    [Required, MaxLength(150)]
    public required string Name { get; set; }

    [Required, EmailAddress, MaxLength(150)]
    public required string Email { get; set; }

    [Required, MaxLength(500)]
    public required string Message { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
