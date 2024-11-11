using Microsoft.AspNetCore.Mvc;
using TorchSharp.Utils;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DetailsViewController : ControllerBase
{
    private readonly DetailsViewService _detailsViewService;

    public DetailsViewController(DetailsViewService detailsViewService)
    {
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
    public async Task<ActionResult<ReviewDto>> NewReview([FromBody] NewReviewDto newReviewDto)
    {
        try
        {
            var reviewDto = await _detailsViewService.NewReview(newReviewDto);

            if (reviewDto == null)
            {
                return BadRequest(new { message = "Unable to create review." });
            }

            return Ok(reviewDto);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
        }
    }

}
