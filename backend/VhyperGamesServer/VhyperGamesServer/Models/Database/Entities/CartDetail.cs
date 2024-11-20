using System.Text.Json.Serialization;

namespace VhyperGamesServer.Models.Database.Entities;

public class CartDetail
{
    public int Id { get; set; }
    public int CartId { get; set; }
    public int GameId { get; set; }
    public int Quantity { get; set; }

    public Cart Cart { get; set; }

    public Game Game { get; set; }
}
