using System.Text.Json.Serialization;

namespace VhyperGamesServer.Models.Database.Entities;

public class Review
{
    public int Id { get; set; }

    public int GameId { get; set; }

    public int UserId { get; set; }

    public string ReviewText { get; set; } 

    public DateTime ReviewDate { get; set; }

    public int Rating { get; set; }

    public Game Game { get; set; }

    public User User { get; set; }
}