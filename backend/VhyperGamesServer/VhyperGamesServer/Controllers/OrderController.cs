using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("most-recent-order")]
        [Authorize]
        public async Task<IActionResult> GetRecentOrderByUserId()
        {
            try
            {
                // Extraer el userId de los claims del usuario autenticado
                var userIdClaim = User.FindFirst("id");
                if (userIdClaim == null)
                {
                    return Unauthorized(new { message = "Usuario no autenticado." });
                }

                int userId = int.Parse(userIdClaim.Value);

                // Llamar al servicio para obtener la orden más reciente
                var order = await _orderService.GetRecentOrderByUserIdAsync(userId);

                return Ok(order);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error inesperado.", detail = ex.Message });
            }
        }
    }
}

