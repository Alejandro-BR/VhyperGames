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

    public async Task<List<CartResponseDto>> UpdateCart(List<CartResponseDto> cartResponseDtos, int cartId)
    {
        Cart cart = await _unitOfWork.CartRepository.GetByIdCart(cartId);

        if (cart == null)
        {
            throw new KeyNotFoundException($"No se ha encontrado este {cartId}.");
        }

        List<CartDetail> updatedCartDetails = new List<CartDetail>();

        List<CartDetail> cartDetails = await _unitOfWork.CartDetailsRepository.GetByIdCart(cartId);

        foreach (CartResponseDto gameDto in cartResponseDtos)
        {
            bool exist = false;

            foreach (CartDetail game in cartDetails)
            {
                if (game.GameId == gameDto.GameId)
                {
                    exist = true;
                    game.Quantity = gameDto.Quantity;
                }
            }

            if (!exist)
            {
                CartDetail newCartDetail = new CartDetail()
                {
                    GameId = gameDto.GameId,
                    Quantity = gameDto.Quantity,
                };

                updatedCartDetails.Add(newCartDetail);
                await _unitOfWork.CartDetailsRepository.InsertAsync(newCartDetail);
            }
        }

        cart.CartDetails = updatedCartDetails;
        _unitOfWork.CartRepository.Update(cart);

        await _unitOfWork.CartDetailsRepository.SaveAsync();
        await _unitOfWork.CartRepository.SaveAsync();

        List<CartDetail> BackcartDetails = await _unitOfWork.CartDetailsRepository.GetByIdCart(cartId);

        return _cartMapper.ToListCartResponseDto(BackcartDetails);
    }

    public async Task<List<CartResponseDto>> GetCartById(int cartId)
    {
        List<CartDetail> cartDetails = await _unitOfWork.CartDetailsRepository.GetByIdCart(cartId);

        if (cartDetails == null)
        {
            throw new KeyNotFoundException($"No se ha encontrado carrito con este id {cartId}.");
        }

        return _cartMapper.ToListCartResponseDto(cartDetails);
    }


    public async Task<List<CartGameDto>> GetCartGames(List<CartRepository> cartRepositories)
    {
        

        return null;
    }
}
