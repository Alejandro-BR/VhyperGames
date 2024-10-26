namespace VhyperGamesServer.Models.Database.Entities;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Surname { get; set; }

    public string Email { get; set; }

    public string HashPassword { get; set; }

    public string Rol { get; set; }

    public string Address { get; set; }
}
