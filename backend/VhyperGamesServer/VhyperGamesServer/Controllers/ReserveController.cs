using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Entities.Enuml;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;


namespace VhyperGamesServer.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReserveController : ControllerBase
{
    private readonly ReserveService _reserveService;
    private readonly StripeService _stripeService;
    
    public ReserveController(ReserveService reserveService, StripeService stripeService)
    {
        _reserveService = reserveService;
        _stripeService = stripeService;
    }


    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> CreateReserve([FromBody] List<CartDto> cart, [FromQuery] PayMode modeOfPay)
    {
        try
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }

            
            int userId = int.Parse(userIdClaim.Value);

            await _reserveService.CreateReserve(userId, cart, modeOfPay);
            return Ok(new { message = "Reserva creada exitosamente." });
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


    [HttpGet("details")]
    [Authorize]
    public async Task<IActionResult> GetReserveDetails()
    {
        try
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }


            int userId = int.Parse(userIdClaim.Value);

            var reserveDetails = await _reserveService.GetReserveDetails(userId);
            return Ok(reserveDetails);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error inesperado", detail = ex.Message });
        }
    }

    [HttpPost("confirm")]
    [Authorize]
    public async Task<IActionResult> ConfirmReserve([FromQuery] int reserveId, [FromQuery] PayMode modeOfPay, [FromQuery] string sessionId)
    {
        try
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }

            int userId = int.Parse(userIdClaim.Value);

            await _reserveService.ConfirmReserve(reserveId, modeOfPay, sessionId);
            return Ok(new { message = "Reserva confirmada exitosamente." });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error inesperado", detail = ex.Message });
        }
    }


    [HttpDelete("cancel")]
    [Authorize]
    public async Task<IActionResult> CancelReserve()
    {
        try
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }

            int userId = int.Parse(userIdClaim.Value);

            await _reserveService.CancelReserve(userId);
            return Ok(new { message = "Reserva cancelada exitosamente." });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error inesperado", detail = ex.Message });
        }
    }



    [HttpGet("embedded-checkout")]
    [Authorize]
    public async Task<IActionResult> EmbeddedCheckout()
    {
        try
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }

            int userId = int.Parse(userIdClaim.Value);

            SessionCreateOptions options = await _stripeService.EmbededCheckout(userId);

            SessionService sessionService = new SessionService();
            Session session = await sessionService.CreateAsync(options);

            await _stripeService.SetSessionIdReserve(session.Id, userId);

            return Ok(new { clientSecret = session.ClientSecret });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error al generar la sesión de pago.", detail = ex.Message });
        }
    }
}

