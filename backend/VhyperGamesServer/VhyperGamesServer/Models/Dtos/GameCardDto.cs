namespace VhyperGamesServer.Models.Dtos;

public class GameCardDto
{
    public int Id { get; set; } 

    public string Title { get; set; }

    public int Stock {  get; set; }

    public decimal Price { get; set; }

    public string ImageUrl { get; set; }

}
