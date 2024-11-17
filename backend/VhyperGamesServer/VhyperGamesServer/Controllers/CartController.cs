using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Services;
using VhyperGamesServer.Models.Dtos;
using System.Threading.Tasks;

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

        // GET: api/cart/
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCartById(int id)
        {
            try
            {
                // Obtener carrito por ID
                var cartDto = await _cartService.GetCartById(id);
                if (cartDto == null)
                {
                    return NotFound($"Cart with ID {id} not found.");
                }

                return Ok(cartDto);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error occurred while fetching cart: {ex.Message}");
            }
        }

        // PUT: api/cart/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCart(int id, [FromBody] CartDto cartDto)
        {
            if (id != cartDto.CartId)
            {
                return BadRequest("Cart ID in the URL does not match Cart ID in the body.");
            }

            try
            {
                // Actualizar carrito
                var updatedCartDto = await _cartService.UpdateCart(cartDto);
                return Ok(updatedCartDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message); // Si no se encuentra el carrito
            }
            catch (Exception ex)
            {
                return BadRequest($"Error occurred while updating cart: {ex.Message}");
            }
        }



        //// Codigo de Alejandro

        [HttpPut("update")]
        public async Task<ActionResult<CartDto>> PutUpdateCart([FromBody] CartDto cartDto)
        {
            return await _cartService.PutUpdateCart(cartDto);
        }
    }
}
