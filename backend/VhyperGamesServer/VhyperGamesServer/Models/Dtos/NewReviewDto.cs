namespace VhyperGamesServer.Models.Dtos;

public class NewReviewDto
{
    public int Id { get; set; }

    public int GameId { get; set; }

    public int UserId { get; set; }

    public string ReviewText { get; set; }

    public DateTime ReviewDate { get; set; }
}
