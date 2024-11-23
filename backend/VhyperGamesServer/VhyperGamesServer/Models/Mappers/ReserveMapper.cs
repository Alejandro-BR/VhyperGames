using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Models.Mappers;

public class ReserveMapper
{
    public GameOrderDto ToGameOrderDto(ReserveDetail reserveDetail)
    {
        return new GameOrderDto
        {
            GameId = reserveDetail.GameId,
            Quantity = reserveDetail.Quantity,
            Price = reserveDetail.Game.Price * reserveDetail.Quantity,
            ImageGame = reserveDetail.Game.ImageGames[0],
        };
    }

    public GameOrderDto ToOrderDto(OrderDetail orderDetail)
    {
        return new GameOrderDto
        {
            GameId = orderDetail.GameId,
            Quantity = orderDetail.Quantity,
            Price = orderDetail.Game.Price * orderDetail.Quantity,
            ImageGame = orderDetail.Game.ImageGames[0],
        };
    }

    public List<GameOrderDto> ToListGameOrderDto(List<ReserveDetail> reserveDetails)
    {
        List<GameOrderDto> gameOrderDtos = new List<GameOrderDto>();

        foreach (ReserveDetail ReserveDetail in reserveDetails)
        {
            gameOrderDtos.Add(ToGameOrderDto(ReserveDetail));
        }

        return gameOrderDtos;
    }

    public List<GameOrderDto> TolistOrderDto(List<OrderDetail> orderDetails)
    {
        List<GameOrderDto> orderDtos = new List<GameOrderDto>();

        foreach (OrderDetail OrderDetail in orderDetails)
        {
           orderDtos.Add(ToOrderDto(OrderDetail));
        }
        return orderDtos;
    }
}
