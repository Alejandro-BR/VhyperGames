using System.Text.Json.Serialization;

namespace VhyperGamesServer.Models.Database.Entities;

public class ImageGame
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public string ImageUrl { get; set; }
    public string AltText { get; set; }

    [JsonIgnore]
    public Game Game { get; set; }
}
