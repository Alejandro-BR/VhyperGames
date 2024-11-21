using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Dtos;

public class CartGameDto
{

    public int IdGame { get; set; }

    public string Title { get; set; }

    public int Price { get; set; }

    public string ImageGame { get; set; }

    public int Stock { get; set; }
}
