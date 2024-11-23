using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;
using System.Linq;

namespace VhyperGamesServer.Models.Mappers;

public class OrderMapper
{

    public OrderDto ToOrderResponseDto(OrderDetail orderDetail, Game game)
    {
        return new OrderDto
        {
            GameId = orderDetail.GameId,
            TotalPrice = (orderDetail.Quantity * game.Price)
        };
    }

    public List<OrderDto> ToListOrderResponseDto(List<OrderDetail> orderDetails)
    {
        List<OrderDto> orderResponseDtos = new List<OrderDto>();

        foreach (OrderDetail orderDetail in orderDetails)
        {
            orderResponseDtos.Add(ToOrderResponseDto(orderDetail));
        }

        return orderResponseDtos;
    }

    public OrderDetailDto ToOrderDetailDto(CartDetail cartDetail)
    {
        return new OrderDetailDto()
        {
            GameId = cartDetail.GameId,
            Quantity = cartDetail.Quantity
        };
    }

    public List<OrderDetailDto> ToListOrderDetailDto(List<Game> games)
    {
        List<OrderDetailDto> orderDetailDto = new List<OrderDetailDto>();

        foreach (Game game in games)
        {

            orderDetailDto.Add(ToOrderDetailDto(game));
        }

        return orderDetailDto;
    }

}