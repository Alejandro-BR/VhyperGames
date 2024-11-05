namespace VhyperGamesServer.Models.Database.Entities;

public class Game
{
    public int Id { get; set; }
    public Guid GameCode {  get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Genre { get; set; }
    public bool DrmFree {  get; set; }
    public DateTime ReleaseDate {  get; set; }
    public double Price { get; set; }
    public int Stock {  get; set; }
    public int AvgRating { get; set; }
    public List<ImageGame> ImageGames { get; set; }

    public Game()
    {
        GameCode = Guid.NewGuid();
        DrmFree = false;
        AvgRating = 0;
        ImageGames = new List<ImageGame>();
    }
}
