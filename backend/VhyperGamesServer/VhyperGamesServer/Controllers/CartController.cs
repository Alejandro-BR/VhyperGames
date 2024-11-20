using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Services;
using VhyperGamesServer.Models.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace VhyperGamesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPut("update")]
        [Authorize]
        public async Task<ActionResult<List<CartDto>>> UpdateCart([FromBody] List<CartDto> cartResponseDtos)
        {
            try
            {
                var userIdClaim = User.FindFirst("id");
                if (userIdClaim == null)
                {
                    return Unauthorized(new { message = "Usuario no autenticado." });
                }

                int userId = int.Parse(userIdClaim.Value);
                int cartId = userId;

                return await _cartService.UpdateCart(cartResponseDtos, cartId);
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

        [HttpGet("cartById")]
        [Authorize]
        public async Task<ActionResult<List<CartDto>>> GetCartById()
        {
            try
            {
                var userIdClaim = User.FindFirst("id");
                if (userIdClaim == null)
                {
                    return Unauthorized(new { message = "Usuario no autenticado." });
                }

                int userId = int.Parse(userIdClaim.Value);
                int cartId = userId;

                return await _cartService.GetCartById(cartId);
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
    

    [HttpGet("cartByGames")]
    public async Task<ActionResult<List<CartGameDto>>> GetCartGames([FromQuery] List<int> gameIds, [FromQuery] List<int> quantities)
    {
        if (gameIds.Count != quantities.Count)
        {
            return BadRequest("La cantidad de IDs de juegos no coincide con la cantidad de cantidades.");
        }

        var cartItems = gameIds.Select((id, index) => new CartDto
        {
            GameId = id,
            Quantity = quantities[index]
        }).ToList();

        return await _cartService.GetCartGames(cartItems);
    }
    }
}
