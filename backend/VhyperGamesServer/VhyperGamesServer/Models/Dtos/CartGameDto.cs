using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Dtos;

public class CartGameDto
{
    public int Id { get; set; }

    public int IdGame { get; set; }

    public string Title { get; set; }

    public int Price { get; set; }

    public ImageGame ImageGames { get; set; }

    public int Quantity { get; set; }

    public int Stock { get; set; }
}
