using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;
using System.Linq;

namespace VhyperGamesServer.Models.Mappers;

public class CartMapper
{

    public CartDto ToCartResponseDto(CartDetail cartDetail)
    {
        return new CartDto
        {
            GameId = cartDetail.GameId,
            Quantity = cartDetail.Quantity
        };
    }

    public List<CartDto> ToListCartResponseDto(List<CartDetail> cartDetails)
    {
        List<CartDto> cartResponseDtos = new List<CartDto>();

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
            Stock = game.Stock,
            
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
