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

    public CartGameDto ToCartGameDto(Game game, int quantity)
    {
        return new CartGameDto()
        {
            IdGame = game.Id,
            Title = game.Title,
            Price = game.Price,
            ImageGame = game.ImageGames.FirstOrDefault(),
            Stock = game.Stock,
            Quantity = quantity
            
        };
    }

    public List<CartGameDto> ToListCartGameDto(List<Game> games, List<CartDto> cartDtos)
    {
        List<CartGameDto> cartGameDtos = new List<CartGameDto>();

        foreach (Game game in games)
        {
            var cartDto = cartDtos.FirstOrDefault(c => c.GameId == game.Id);
            int quantity = 0;

            if (cartDto != null) {
                quantity = cartDto.Quantity;
            }

            cartGameDtos.Add(ToCartGameDto(game, quantity));
        }

        return cartGameDtos;
    }

}
