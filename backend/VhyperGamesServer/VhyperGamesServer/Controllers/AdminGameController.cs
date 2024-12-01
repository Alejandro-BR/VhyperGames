using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;
using Microsoft.AspNetCore.Authorization;

namespace VhyperGamesServer.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")]
public class AdminGameController : ControllerBase
{
    private readonly AdminGameService _adminGameService;

    public AdminGameController(AdminGameService adminGameService)
    {
           _adminGameService = adminGameService;
    }

    [HttpGet("get-game")]
    public async Task<ActionResult<List<AdminGameDto>>> GetListGame()
    {
        try
        {
            return await _adminGameService.GetListGame();
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
    public async Task<IActionResult> PutGame([FromForm] AdminFormGameDto adminFormGameDto, [FromForm] List<IFormFile> images, [FromForm] List<string> alt)
    {
        if (adminFormGameDto == null)
        {
            return BadRequest("El objeto AdminFormGameDto no puede ser nulo.");
        }

        await _adminGameService.PutGame(adminFormGameDto, images, alt); 
        return Ok();
    }



}
