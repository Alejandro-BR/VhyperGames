using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace VhyperGamesServer.Models.Database.Entities;

public class Cart
{
    public int Id { get; set; }

    public int UserId { get; set; }

    [JsonIgnore]
    public List<CartDetail> CartDetails { get; set; } = new List<CartDetail>();

}
