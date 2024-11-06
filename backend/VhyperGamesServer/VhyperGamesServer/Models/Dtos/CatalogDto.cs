namespace VhyperGamesServer.Models.Dtos;

public class CatalogDto
{
    public List<GameCardDto> Games { get; set; }

    public int TotalPages { get; set; }
}
