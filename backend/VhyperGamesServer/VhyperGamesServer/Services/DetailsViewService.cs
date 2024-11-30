using Microsoft.AspNetCore.SignalR;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.IA;
using VhyperGamesServer.Models.Mappers;

namespace VhyperGamesServer.Services;

public class DetailsViewService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly DetailsViewMapper _viewDetailsMapper;
    private readonly IAService _iaService;

    public DetailsViewService(UnitOfWork unitOfWork, DetailsViewMapper viewDetailsMapper, IAService iAService)
    {
        _unitOfWork = unitOfWork;
        _viewDetailsMapper = viewDetailsMapper;
        _iaService = iAService;
    }

    public async Task<GameDataDto> GetGameData(int id)
    {
        Game game = await _unitOfWork.GameRepository.GetByIdAsync(id, includeImages: true);

        if (game == null) { return null; }

        GameDataDto data = _viewDetailsMapper.GameDataToDto(game);

        return data;
    }

    public async Task<GamePriceDto> GetGamePrice(int id)
    {
        Game game = await _unitOfWork.GameRepository.GetByIdAsync(id);

        if (game == null) { return null; }

        GamePriceDto data = _viewDetailsMapper.GamePriceToDto(game);

        return data;
        
    }

    public async Task<GamePriceDto> SetGamePrice(int id, int quantity)
    {
        Game game = await _unitOfWork.GameRepository.GetByIdAsync(id);

        if (game == null) { return null; }

        int AvgRating = CalculateRating(game.Reviews);

        GamePriceDto data = _viewDetailsMapper.GamePriceToDto(game);
        data.AvgRating = AvgRating;

        data.Quantity = quantity;

        // Llamara al carrito para guardar la cantidad
        // Esto hay que mirarlo.

        return data;

    }

    public async Task<RequirementsDto> GetRequirementsDto(int id)
    {
        GameRequirements requirement = await _unitOfWork.RequerimentRepository.GetRequerimentByIdGame(id);

        if (requirement == null) { return null; }

        RequirementsDto requerimentsDto = _viewDetailsMapper.RequirementsToDto(requirement);

        return requerimentsDto;
    }
    
    public async Task<ReviewGameDto> GetReviewsGame(int id)
    {
        List<Review> review = await _unitOfWork.ReviewRepository.GetAllReviewsOrderByDateByGameId(id);

        if(review == null) { return null; }

        IEnumerable<ReviewDto> reviewDto = _viewDetailsMapper.ListReviewToDto(review);

        ReviewGameDto reviewGameDto = new ReviewGameDto();

        reviewGameDto.Reviews = reviewDto.ToList();

        return reviewGameDto;
    }

    public async Task<ReviewDto> NewReview(NewReviewDto newReviewDto)
    {
        bool userOwnsGame = await _unitOfWork.ReviewRepository.UserOwnsGameAsync(newReviewDto.UserId, newReviewDto.GameId);
        if (!userOwnsGame)
        {
            throw new InvalidOperationException("El usuario no tiene el juego y no puede dejar una nueva reseña.");
        }

        User user = await _unitOfWork.UserRepository.GetByIdAsync(newReviewDto.UserId);
        Game game = await _unitOfWork.GameRepository.GetByIdAsync(newReviewDto.GameId);

        var existingReview = await _unitOfWork.ReviewRepository.IsReviewed(newReviewDto.GameId, newReviewDto.UserId);
        if (existingReview != null)
        {
            return _viewDetailsMapper.ReviewToDto(existingReview);
        }

        ModelOutput modelOutput = _iaService.Predict(newReviewDto.ReviewText);

        var newReview = new Review
        {
            ReviewDate = DateTime.Now,
            UserId = newReviewDto.UserId,
            GameId = newReviewDto.GameId,
            ReviewText = modelOutput.Text,
            Rating = (int)modelOutput.PredictedLabel,
            User = user,
            Game = game
        };

        var savedReview = await _unitOfWork.ReviewRepository.InsertAsync(newReview);

        bool respuesta = await _unitOfWork.SaveAsync();

        //Recalcular el rating medio cuando se añade una review nueva
        await UpdateGameAverageRating(game.Id);

        return _viewDetailsMapper.ReviewToDto(savedReview);
    }

    public async Task UpdateGameAverageRating(int gameId)
    {
        List<Review> reviews = await _unitOfWork.ReviewRepository.GetAllReviewsOrderByDateByGameId(gameId);

        int newAvgRating = CalculateRating(reviews);

        var game = await _unitOfWork.GameRepository.GetByIdAsync(gameId);
        if (game != null)
        {
            game.AvgRating = newAvgRating;
            _unitOfWork.GameRepository.Update(game);
            await _unitOfWork.SaveAsync();
        }
    }

    private int CalculateRating(List<Review> reviews)
    {
        if (reviews == null || reviews.Count == 0)
        {
            return -1; 
        }

        int positiveCount = reviews.Sum(r => r.Rating);

        return positiveCount;
    }

    public async Task<ReviewDto?> GetReviewByUserAndGameAsync(int gameId, int userId)
    {
        var review = await _unitOfWork.ReviewRepository.GetReviewByUserAndGameAsync(gameId, userId);

        if (review == null)
            return null;

        return _viewDetailsMapper.ReviewToDto(review);
    }

}
