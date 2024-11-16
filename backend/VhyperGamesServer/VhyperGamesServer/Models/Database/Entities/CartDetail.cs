using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace VhyperGamesServer.Models.Database.Entities;

public class CartDetail
{
    public int Id { get; set; }
    public int CartId { get; set; }
    public int GameId { get; set; }
    public int Quantity { get; set; }

    [JsonIgnore]
    public Cart Cart { get; set; }

    [JsonIgnore]
    public Game Game { get; set; }
    public int Price { get; internal set; }
}
