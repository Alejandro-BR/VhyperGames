using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Dtos;

public class OrderDetailDto
{
    public int GameId { get; set; }
    public string Title { get; set; }
    public int Quantity { get; set; }
    public int Price { get; set; }
    public ImageGame ImageGame { get; set; }

}
