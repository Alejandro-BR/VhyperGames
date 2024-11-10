using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Models.Mappers;

public class DetailsViewMapper
{

    public GameDataDto GameDataToDto(Game game)
    {
        return new GameDataDto
        {
            Id = game.Id,
            Title = game.Title,
            Description = game.Description,
            Sinopsis = game.Sinopsis,

            ImageGames = game.ImageGames.Skip(1).ToList()
        };
    }


    public GamePriceDto GamePriceToDto(Game game)
    {
        return new GamePriceDto
        {
            Id = game.Id,
            Price = game.Price,
            AvgRating = game.AvgRating,
            Stock = game.Stock,

        };
    }


    public RequirementsDto RequirementsToDto(GameRequirements gameRequirements)
    {
        return new RequirementsDto
        {
            Id = gameRequirements.Id,
            OS = gameRequirements.OS,
            MinOS = gameRequirements.MinOS,
            CPU = gameRequirements.CPU,
            MinCPU  = gameRequirements.MinCPU,
            RAM = gameRequirements.RAM,
            MinRAM = gameRequirements.MinRAM,
            GPU = gameRequirements.GPU,
            MinGPU = gameRequirements.MinGPU,
            DirectX = gameRequirements.DirectX,
            MinDirectX = gameRequirements.MinDirectX,
            Storage = gameRequirements.Storage
        };
    }


    public ReviewDto ReviewToDto(Review review) {

        return new ReviewDto
        {
            Id = review.Id,
            GameId = review.GameId,
            UserId = review.UserId,
            ReviewText = review.ReviewText,
            ReviewDate = review.ReviewDate,
            Rating = review.Rating,
            UserName = review.User.Name
        };
     }

    public IEnumerable<ReviewDto> ListReviewToDto(IEnumerable<Review> reviews)
    {
        return reviews.Select(review => ReviewToDto(review));
    }

    public NewReviewDto NewReviewToDto(Review review)
    {
        return new NewReviewDto
        {
            Id = review.Id,
            GameId = review.GameId,
            UserId = review.UserId,
            ReviewText = review.ReviewText,
            ReviewDate = review.ReviewDate
        };
    }  
}
