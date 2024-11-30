using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TorchSharp.Utils;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DetailsViewController : ControllerBase
{
    private readonly UnitOfWork _unitOfWork;
    private readonly DetailsViewService _detailsViewService;

    public DetailsViewController(UnitOfWork unitOfWork, DetailsViewService detailsViewService)
    {
        _unitOfWork = unitOfWork;
        _detailsViewService = detailsViewService;
    }

    [HttpGet("game-data")]
    public async Task<ActionResult<GameDataDto>> GetGameData(int id)
    {
        return await _detailsViewService.GetGameData(id);
    }

    [HttpGet("game-price")]
    public async Task<ActionResult<GamePriceDto>> GetGamePrice(int id)
    {
        return await _detailsViewService.GetGamePrice(id);
    }

    [HttpGet("game-price-set")]
    public async Task< ActionResult<GamePriceDto>> SetGamePrice(int id, int quantity)
    {
        return await _detailsViewService.SetGamePrice(id, quantity);
    }

    [HttpGet("game-requirements")]
    public async Task<ActionResult<RequirementsDto>> GetRequirementsDto(int id)
    {
        return await _detailsViewService.GetRequirementsDto(id);
    }

    [HttpGet("game-reviews")]
    public async Task<ActionResult<ReviewGameDto>> GetReviewsGame(int id)
    {
        return await _detailsViewService.GetReviewsGame(id);
    }

    [HttpPost("new-review")]
    [Authorize]
    public async Task<ActionResult<ReviewDto>> NewReview([FromBody] NewReviewDto newReviewDto)
    {
        try
        {
            //Obtener en ID del usuario autenticado y asignarlo
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }

            int userId = int.Parse(userIdClaim.Value);
            newReviewDto.UserId = userId;


            //Llamar al servicio para crear la nueva reseña
            ReviewDto reviewDto = await _detailsViewService.NewReview(newReviewDto);

            if (reviewDto == null)
            {
                return BadRequest(new { message = "No se ha podido crear la review." });
            }

            return Ok(reviewDto);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error inesperado", detail = ex.Message });
        }
    }

    [HttpGet("get-user-review")]
    [Authorize]
    public async Task<ActionResult> GetReviewByUserAndGameAsync(int gameId)
    {
        // Verificar si el usuario está autenticado
        var userIdClaim = User.FindFirst("id");
        if (userIdClaim == null)
            return Unauthorized(new { message = "Usuario no autenticado." });

        if (!int.TryParse(userIdClaim.Value, out int userId))
            return BadRequest(new { message = "ID de usuario no válido." });


        bool userOwnsGame = await _unitOfWork.ReviewRepository.UserOwnsGameAsync(userId, gameId);


        if (!userOwnsGame)
        {
            return Ok(new
            {
                ownsGame = false, 
                hasReview = false, 
                review = (ReviewDto)null 
            });
        }

        ReviewDto reviewDto = await _detailsViewService.GetReviewByUserAndGameAsync(gameId, userId);

        var response = new
        {
            ownsGame = true, 
            hasReview = reviewDto != null,
            review = reviewDto 
        };

        return Ok(response);
    }

}
