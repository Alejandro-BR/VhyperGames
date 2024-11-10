namespace VhyperGamesServer.Models.Dtos;

public class GamePriceDto
{
    public int Id { get; set; }

    public int Price { get; set; }

    public int AvgRating { get; set; }

    public int Stock { get; set; }

    public int Quantity { get; set; };

    public GamePriceDto(){

        Quantity = 0;
    }
}
