using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Dtos;

public class AdminGameDto
{
    public int Id { get; set; }

    public string Title { get; set; }

    public int Price { get; set; }

    public int Stock { get; set; }

    public ImageGame ImageGame { get; set; }
}
