using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Models.Mappers;

public class CartMapper
{

    public CartGameDto ToCartGameDto(CartDetail cartDetail)
    {
        return new CartGameDto
        {
            Id = cartDetail.Id,
            IdGame = cartDetail.GameId,
            Quantity = cartDetail.Quantity,
            
            Title = cartDetail.Game.Title,
            Price = cartDetail.Game.Price,
            Stock = cartDetail.Game.Stock,

            ImageGames = cartDetail.Game.ImageGames?.FirstOrDefault()
        };
    }

    public IEnumerable<CartGameDto> ToListCartGameDto(IEnumerable<CartDetail> cartDetail) {
        return cartDetail.Select(cartDetail => ToCartGameDto(cartDetail));
    }

    public CartDto ToCartPaymentDto(Cart cart)
    {
        return new CartDto
        {
            UserId = cart.UserId,

            CartId = cart.Id,

            Games = (List<CartGameDto>)ToListCartGameDto(cart.CartDetails)
        };
    }

}
