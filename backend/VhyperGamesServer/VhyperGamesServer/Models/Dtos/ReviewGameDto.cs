namespace VhyperGamesServer.Models.Dtos;

public class ReviewGameDto
{
    public List<ReviewDto> Reviews { get; set; }
    public int TotalReviews
    {
        get { return Reviews.Count; }
    }


    public ReviewGameDto() { 
        Reviews = new List<ReviewDto>();
    }
}
