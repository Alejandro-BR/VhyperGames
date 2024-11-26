using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using System.Collections.Generic;
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
    public async Task<ActionResult<int>> CreateReserve([FromBody] List<CartDto> cart, [FromQuery] PayMode modeOfPay)
    {
        try
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }

            
            int userId = int.Parse(userIdClaim.Value);

            int reserveId = await _reserveService.CreateReserve(userId, cart, modeOfPay);
            return Ok(reserveId);
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
    public async Task<ActionResult<List<OrderDetailDto>>> GetReserveDetails([FromQuery] int reserveId)
    {
        try
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }


            int userId = int.Parse(userIdClaim.Value);

            List<OrderDetailDto> orderDetailDto = await _reserveService.GetReserveDetails(reserveId);
            return Ok(orderDetailDto);
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
    public async Task<IActionResult> ConfirmReserve([FromQuery] int reserveId)
    {
        try
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }

            int userId = int.Parse(userIdClaim.Value);

            await _reserveService.ConfirmReserve(reserveId);
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



    [HttpPost("embedded-checkout")]
    [Authorize]
    public async Task<IActionResult> EmbeddedCheckout([FromQuery] int reserveId)
    {
        try
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }

            int userId = int.Parse(userIdClaim.Value);

            SessionCreateOptions options = await _stripeService.EmbededCheckout(userId, reserveId);

            SessionService sessionService = new SessionService();
            Session session = await sessionService.CreateAsync(options);

            await _stripeService.SetSessionIdReserve(session.Id, reserveId);

            return Ok(new { clientSecret = session.ClientSecret });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error al generar la sesión de pago.", detail = ex.Message });
        }
    }
}

