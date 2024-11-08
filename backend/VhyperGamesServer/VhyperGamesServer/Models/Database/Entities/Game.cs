using System.Text.Json.Serialization;
using VhyperGamesServer.Models.Database.Entities.Enum;

namespace VhyperGamesServer.Models.Database.Entities;

public class Game
{
    public int Id { get; set; }
    public int GameRequirementsId { get; set; }
    public Guid GameCode {  get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Sinopsis { get; set; } 
    public Genre Genre { get; set; }
    public Drm DrmFree {  get; set; }
    public DateTime ReleaseDate {  get; set; }
    public int Price { get; set; }
    public int Stock {  get; set; }
    public int AvgRating { get; set; }
    public List<ImageGame> ImageGames { get; set; }
    [JsonIgnore]
    public GameRequirements GameRequirements { get; set; }

    public Game()
    {
        GameCode = Guid.NewGuid();
        AvgRating = 0;
        ImageGames = new List<ImageGame>();
    }
}
