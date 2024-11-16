using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;
namespace VhyperGamesServer.Services;

public class CartService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly CartMapper _cartMapper;

    public CartService(UnitOfWork unitOfWork, CartMapper cartMapper)
    {
        _unitOfWork = unitOfWork;
        _cartMapper = cartMapper;
    }

    public async Task<CartDto> UpdateCart(CartDto cartDto)
    {
        // Obtener el carrito desde la base de datos
        Cart cart = await _unitOfWork.CartRepository.GetByIdCart(cartDto.CartId);

        if (cart == null)
            throw new KeyNotFoundException($"Cart with ID {cartDto.CartId} not found."); // Lanza excepción si no se encuentra el carrito

        // Actualizar datos del carrito con los datos del DTO
        foreach (var cartGameDto in cartDto.Games) // Corregido a 'Games'
        {
            var existingDetail = cart.CartDetails.FirstOrDefault(d => d.GameId == cartGameDto.IdGame);

            if (existingDetail != null)
            {
                // Si ya existe, actualiza la cantidad y precio total
                existingDetail.Quantity = cartGameDto.Quantity;
                // Asegúrate de que el precio unitario sea correctamente asignado si corresponde
                existingDetail.Price = cartGameDto.Price; // Si el precio se viene en el DTO
            }
            else
            {
                // Si no existe, añade un nuevo detalle al carrito
                cart.CartDetails.Add(new CartDetail
                {
                    GameId = cartGameDto.IdGame,
                    Quantity = cartGameDto.Quantity,
                    Price = cartGameDto.Price // Se asigna el precio unitario del DTO
                });
            }
        }

        // Guardar los cambios en la base de datos
        await _unitOfWork.SaveAsync();

        // Mapear el carrito actualizado a un nuevo CartDto
        var updatedCartDto = new CartDto
        {
            CartId = cart.Id,  // Usar el nombre correcto de la propiedad 'Id'
            UserId = cart.UserId,  // Asegurarse de incluir el UserId
            Games = cart.CartDetails.Select(detail => new CartGameDto
            {
                IdGame = detail.GameId,
                Quantity = detail.Quantity,
                Price = detail.Price,  // Se asegura de que se utilice el precio correcto
                TotalPrice = detail.Price * detail.Quantity,  // El total se calcula usando el precio unitario
                Title = detail.Game.Title,
                ImageGames = detail.Game.ImageGames?.FirstOrDefault(),
                Stock = detail.Game.Stock
            }).ToList(),
        };

        // Recalcular el total después de las modificaciones
        updatedCartDto.TotalPrice = updatedCartDto.GetSumTotal();

        return updatedCartDto;
    }

    public async Task<CartDto> GetCartById(int cartId)
    {
        // Obtener el carrito desde la base de datos usando el repositorio
        var cart = await _unitOfWork.CartRepository.GetByIdCart(cartId);

        if (cart == null)
        {
            return null; // Si no se encuentra el carrito, puedes devolver null o lanzar una excepción
        }

        // Mapear el carrito a un CartDto
        var cartDto = new CartDto
        {
            CartId = cart.Id,
            UserId = cart.UserId,
            Games = cart.CartDetails.Select(detail => new CartGameDto
            {
                IdGame = detail.GameId,
                Quantity = detail.Quantity,
                Price = detail.Game.Price,
                TotalPrice = detail.Game.Price * detail.Quantity,
                Title = detail.Game.Title,
                ImageGames = detail.Game.ImageGames?.FirstOrDefault(),
                Stock = detail.Game.Stock
            }).ToList()
        };

        return cartDto;
    }
}
