namespace VhyperGamesServer.Models.Database.Entities;

public class OrderDetail
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int GameId { get; set; }
    public int Quantity { get; set; }

    public Order Order { get; set; }

    public Game Game { get; set; }
}