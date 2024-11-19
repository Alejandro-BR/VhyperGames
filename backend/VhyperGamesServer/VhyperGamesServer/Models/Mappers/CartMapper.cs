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
}
