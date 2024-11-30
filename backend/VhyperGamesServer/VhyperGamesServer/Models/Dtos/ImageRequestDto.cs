namespace VhyperGamesServer.Models.Dtos;

public class ImageRequestDto
{
    public string AltText { get; set; }
    public IFormFile File { get; set; }
}
