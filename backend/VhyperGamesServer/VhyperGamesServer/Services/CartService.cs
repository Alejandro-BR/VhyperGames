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

    public async Task<List<CartDto>> UpdateCart(List<CartDto> cartResponseDtos, int cartId)
    {
        Cart cart = await _unitOfWork.CartRepository.GetByIdCart(cartId);

        if (cart == null)
        {
            throw new KeyNotFoundException($"No se ha encontrado este {cartId}.");
        }

        List<CartDetail> updatedCartDetails = new List<CartDetail>();

        foreach (CartDto gameDto in cartResponseDtos)
        {
            bool exist = false;

            CartDetail cartDetail = await _unitOfWork.CartDetailsRepository.GetCartByIds(cartId, gameDto.GameId);

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

    public async Task<List<CartDto>> GetCartById(int cartId)
    {
        List<CartDetail> cartDetails = await _unitOfWork.CartDetailsRepository.GetByIdCart(cartId);

        if (cartDetails == null)
        {
            throw new KeyNotFoundException($"No se ha encontrado carrito con este id {cartId}.");
        }

        return _cartMapper.ToListCartResponseDto(cartDetails);
    }


    public async Task<List<CartGameDto>> GetCartGames(List<CartDto> cartDtos)
    {
        List<Game> games = new List<Game>();

        foreach (CartDto cartDto in cartDtos)
        {
            games.Add(await _unitOfWork.GameRepository.GetByIdAsync(cartDto.GameId, false, true));
        }

        return _cartMapper.ToListCartGameDto(games, cartDtos);
    }

    public async Task<List<CartDto>> MergeCart(List<CartDto> cartDtos, int cartId)
    {
        Cart cart = await _unitOfWork.CartRepository.GetByIdCart(cartId);

        if (cart == null)
        {
            throw new KeyNotFoundException($"No se ha encontrado este {cartId}.");
        }

        List<CartDetail> updatedCartDetails = new List<CartDetail>();

        List<CartDetail> backCartDetails = await _unitOfWork.CartDetailsRepository.GetByIdCart(cartId);


        foreach (CartDetail cartDetail in backCartDetails)
        {
            CartDto newCartDto = cartDtos.FirstOrDefault(c => c.GameId == cartDetail.GameId);

            if (newCartDto != null)
            {
                cartDetail.Quantity += newCartDto.Quantity;
            }

            updatedCartDetails.Add(cartDetail);
        }

        foreach (CartDto cartDto in cartDtos)
        {
            CartDetail cartDetail = updatedCartDetails.FirstOrDefault(c => c.GameId == cartDto.GameId);

            if (cartDetail == null) {
                cartDetail = new CartDetail()
                {
                    GameId = cartDto.GameId,
                    Quantity = cartDto.Quantity,
                };

                updatedCartDetails.Add(cartDetail);

            }
        }

        cart.CartDetails = updatedCartDetails;
        _unitOfWork.CartRepository.Update(cart);

        await _unitOfWork.CartDetailsRepository.SaveAsync();
        await _unitOfWork.CartRepository.SaveAsync();

        List<CartDetail> BackcartDetails = await _unitOfWork.CartDetailsRepository.GetByIdCart(cartId);

        return _cartMapper.ToListCartResponseDto(BackcartDetails);
    }
}
