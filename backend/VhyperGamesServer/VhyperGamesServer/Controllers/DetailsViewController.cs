using Microsoft.AspNetCore.Mvc;
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
}
