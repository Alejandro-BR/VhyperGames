using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nethereum.ABI.CompilationMetadata;
using VhyperGamesServer.Controllers;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Controller;

[Route("api/[controller]")]
[ApiController]
public class UserController : BaseController
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
            int userId = GetUserId();

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
            int userId = GetUserId();

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

    [HttpPut("update-password")]
    [Authorize]
    public async Task<ActionResult> UpdatePassword([FromBody] string password)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                return BadRequest(new { error = "La contraseña no puede ser nula o vacía." });
            }

            int userId = GetUserId();

            await _userService.UpdatePassword(password, userId);
            return Ok(new { message = "Contraseña actualizada exitosamente." });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Ocurrió un error interno.", details = ex.Message });
        }
    }

}
