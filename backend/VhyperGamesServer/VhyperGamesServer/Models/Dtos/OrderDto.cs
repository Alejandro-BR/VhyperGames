using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Entities.Enuml;

namespace VhyperGamesServer.Models.Dtos;

public class OrderDto
{
    public DateTime BillingDate { get; set; }
    public List<OrderGame> OrderGames { get; set; }
    public PayMode ModeOfPay { get; set; }
    public int TotalPrice { get; set; }
}
