using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Dtos;

public class GameDatesDto
{
    public int Id { get; set; }

    public string Title { get; set; }
    public string Description { get; set; }
    public string Sinopsis { get; set; }
    public List<ImageGame> ImageGames { get; set; }

    public GameDatesDto()
    {
        ImageGames = new List<ImageGame>();
    }
}
