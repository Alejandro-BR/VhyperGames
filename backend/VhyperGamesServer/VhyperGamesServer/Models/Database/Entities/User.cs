using System.ComponentModel.DataAnnotations;

namespace VhyperGamesServer.Models.Database.Entities;

public class User
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [Required]
    [MaxLength(100)]
    public string Surname { get; set; }

    [Required]
    [MaxLength(100)]
    public string Email { get; set; }

    [Required]
    [MaxLength(40)]
    public string Password { get; set; }

    [Required]
    public string Rol { get; set; }

    [Required]
    [MaxLength(250)]
    public string Address { get; set; }
}
