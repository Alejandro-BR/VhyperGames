using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Dtos;

public class CartGameDto
{
    public int IdGame { get; set; }

    public string Title { get; set; }

    public int Price { get; set; }

    public ImageGame ImageGame { get; set; }

    public int Stock { get; set; }
}
