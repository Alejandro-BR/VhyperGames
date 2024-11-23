using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Dtos;

public class OrderDetailDto
{
    public int GameId { get; set; }
    public int Quantity { get; set; }
}
