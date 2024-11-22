namespace VhyperGamesServer.Models.Database.Entities;

public class ReserveDetail
{
    public int Id { get; set; }
    public int ReserveId { get; set; }
    public int GameId { get; set; }
    public int Quantity { get; set; }

    public Reserve Reserve { get; set; }

    public Game Game { get; set; }
}