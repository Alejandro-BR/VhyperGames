using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;
namespace VhyperGamesServer.Services;

public class CartService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly CartMapper _cartMapper;

    public CartService (UnitOfWork unitOfWork, CartMapper cartMapper)
    {
        _unitOfWork = unitOfWork;
        _cartMapper = cartMapper;
    }

    public async Task<CartDto> UpdateCart(CartDto cartDto)
    {
        Cart cart = await _unitOfWork.CartRepository.GetByIdCart(cartDto.CartId);

        if (cart == null) return null; // Devuelve una excepcion esto no vale

        // Actualizar datos del cart con los nuevos datos que te trae el dto
        // Solo usamos la lista que tiene CartDto de CartGameDto, lo llamamos y lo recorremos entero y actualizamos o metemos en la lista CartDetail de Cart lo que necesitamos
        
        // Actualizas la base de datos 

        // Mapeas el cart a un nuevo cartDto
        return null; // Devuelves el nuevo CartDto
    }
}
