using VhyperGamesServer.Models.Database.Entities.Enuml;

namespace VhyperGamesServer.Models.Dtos;

public class OrderDto
{
    public int GameId { get; set; }
    public int TotalPrice { get; set; }
    public PayMode PayMode { get; set; }
}
