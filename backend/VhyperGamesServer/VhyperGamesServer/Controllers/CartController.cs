using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Services;
using VhyperGamesServer.Models.Dtos;

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
        public async Task<ActionResult<CartDto>> UpdateCart([FromBody] CartDto cartDto)
        {
            return await _cartService.UpdateCart(cartDto);
        }
    }
}
