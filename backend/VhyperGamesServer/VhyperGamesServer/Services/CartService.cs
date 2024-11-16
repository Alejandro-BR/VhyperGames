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

    public async Task<CartPaymentDto> UpdateCart(CartPaymentDto cartDto)
    {
        Cart cart = await _unitOfWork.CartRepository.GetByIdAsync(cartDto.CartId);

        if (cart == null) return null;

        return null;
    }
}
