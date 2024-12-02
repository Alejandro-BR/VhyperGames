using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nethereum.ABI.CompilationMetadata;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Controller;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserService _userService;
    private readonly UnitOfWork _unitOfWork;

    public UserController(UserService userService, UnitOfWork unitOfWork)
    {
        _userService = userService;
        _unitOfWork = unitOfWork;
    }

    [HttpGet("get-user")]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetUser()
        {
        try
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }

            int userId = int.Parse(userIdClaim.Value);

            return await _userService.GetUserDtoById(userId);

        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error al generar la sesión de pago.", detail = ex.Message });
        }
    }

    [HttpPut("update-user")]
    [Authorize]
    public async Task<IActionResult> UpdateUser([FromBody] UserDto userDto)
    {
        try
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }

            int userId = int.Parse(userIdClaim.Value);

            await _userService.UpdateUserBD(userId, userDto);

            return Ok(new { message = "Usuario actualizado exitosamente." });

        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error al actualizar el usuario.", detail = ex.Message });
        }
    }
}
