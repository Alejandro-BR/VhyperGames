namespace VhyperGamesServer.Models.Dtos;

public class GamePriceDto
{
    public int Id { get; set; }

    public int Price { get; set; }

    public double AvgRating { get; set; }

    public int Stock { get; set; }

    public int Quantity { get; set; } = 0;

}
