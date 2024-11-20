using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;
using System.Linq;

namespace VhyperGamesServer.Models.Mappers;

public class CartMapper
{

    public CartResponseDto ToCartResponseDto(CartDetail cartDetail)
    {
        return new CartResponseDto
        {
            GameId = cartDetail.GameId,
            Quantity = cartDetail.Quantity
        };
    }

    public List<CartResponseDto> ToListCartResponseDto(List<CartDetail> cartDetails)
    {
        List<CartResponseDto> cartResponseDtos = new List<CartResponseDto>();

        foreach (CartDetail cartDetail in cartDetails) {
            cartResponseDtos.Add(ToCartResponseDto(cartDetail));
        }

        return cartResponseDtos;
    }

    public CartGameDto ToCartGameDto(Game game)
    {
        return new CartGameDto()
        {
            IdGame = game.Id,
            Title = game.Title,
            Price = game.Price,
            ImageGame = game.ImageGames.FirstOrDefault(),
            Stock = game.Stock
        };
    }

    public List<CartGameDto> ToListCartGameDto(List<Game> games)
    {
        List<CartGameDto> cartGameDtos = new List<CartGameDto>();

        foreach (Game game in games)
        {
            cartGameDtos.Add(ToCartGameDto(game));
        }

        return cartGameDtos;
    }
}
