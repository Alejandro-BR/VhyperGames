using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Controllers;

[Route("api/[controller]")]
[ApiController]
//[Authorize(Roles = "Admin")]
public class AdminGameController : ControllerBase
{
    private readonly AdminGameService _adminGameService;

    public AdminGameController(AdminGameService adminGameService)
    {
        _adminGameService = adminGameService;
    }

    [HttpGet("get-games")]
    public async Task<ActionResult<List<AdminGameDto>>> GetListGame()
    {
        try
        {
            return Ok(await _adminGameService.GetListGame());
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Ocurrió un error inesperado.", detail = ex.Message });
        }
    }

    [HttpPut("update")]
    public async Task<IActionResult> PutGame([FromForm] AdminFormGameDto adminFormGameDto, [FromForm] List<IFormFile> images)
    {
        if (adminFormGameDto == null)
        {
            return BadRequest("El objeto AdminFormGameDto no puede ser nulo.");
        }

        await _adminGameService.PutGame(adminFormGameDto, images);
        return Ok();
    }

    [HttpPost("newGame")]
    public async Task PostNewGame([FromForm] AdminFormGameDto adminFormGameDto, [FromForm] List<IFormFile> images)
    {
        string title = await _adminGameService.PostNewGame(adminFormGameDto);
        await _adminGameService.PostNewImages(images, title);
    }

    [HttpGet("search")]
    public async Task<ActionResult<List<AdminGameDto>>> GetGameBySearch(string search)
    {
        return Ok(await _adminGameService.GetGameBySearch(search));
    }

    [HttpGet("get-form")]
    public async Task<ActionResult<AdminFormGameDto>> GetFormGame(int gameId)
    {
        return Ok(await _adminGameService.GetFormGame(gameId));
    }

}
