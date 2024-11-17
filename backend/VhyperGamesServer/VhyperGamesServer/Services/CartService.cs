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
        Cart cart = await _unitOfWork.CartRepository.GetByIdCart(cartDto.CartId);

        if (cart == null)
        {
            throw new KeyNotFoundException($"No se ha encontrado este {cartDto.CartId}.");
        }

        List<CartDetail> updatedCartDetails = new List<CartDetail>();

        foreach (CartGameDto game in cartDto.Games)
        {
            CartDetail cartDetail = await _unitOfWork.CartDetailsRepository.GetByIdCartDetails(game.Id);

            if (cartDetail != null && cartDetail.CartId != cartDto.CartId)
            {
                cartDetail = null;
            }

            if (cartDetail == null)
            {
                cartDetail = new CartDetail
                {
                    GameId = game.IdGame,
                    Quantity = game.Quantity,
                    CartId = cartDto.CartId,
                    Price = game.Price,
                };

                await _unitOfWork.CartDetailsRepository.InsertAsync(cartDetail);
            }
            else
            {
                cartDetail.Quantity = game.Quantity;
                cartDetail.Price = game.Price;

                _unitOfWork.CartDetailsRepository.Update(cartDetail);
            }

            updatedCartDetails.Add(cartDetail);
        }

        cart.CartDetails = updatedCartDetails;
        _unitOfWork.CartRepository.Update(cart);

        await _unitOfWork.CartDetailsRepository.SaveAsync();
        await _unitOfWork.CartRepository.SaveAsync();

        CartDto updatedCartDto = _cartMapper.ToCartPaymentDto(cart);
        updatedCartDto.TotalPrice = updatedCartDto.GetSumTotal();

        return updatedCartDto;
    }

}
