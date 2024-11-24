namespace VhyperGamesServer.Models.Database.Entities;

//clase OrderDetail
public class OrderGame
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int GameId { get; set; }
    public int Quantity { get; set; }

    public Order Order { get; set; }

    public Game Game { get; set; }
}