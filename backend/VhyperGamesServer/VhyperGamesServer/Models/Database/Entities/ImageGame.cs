using System.Text.Json.Serialization;

namespace VhyperGamesServer.Models.Database.Entities;

public class ImageGame
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public string ImageUrl { get; set; }
    public string AltText { get; set; }

    [JsonIgnore] // Para que no lo meta en el json y no hacer un bucle de referencias circulares
    public Game Game { get; set; }
}
