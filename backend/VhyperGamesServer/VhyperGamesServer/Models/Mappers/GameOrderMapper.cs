using Stripe.Checkout;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Models.Mappers;

public class GameOrderMapper
{
    public GameOrderDto ToGameOrderDto(ReserveDetail reserveDetail)
    {
        return new GameOrderDto
        {
            GameId = reserveDetail.GameId,
            Title = reserveDetail.Game.Title,
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
            Title = orderDetail.Game.Title,
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

    public SessionLineItemOptions ToSessionLineItemOptions(GameOrderDto gameOrderDto)
    {
        SessionLineItemOptions sessionLineItemOptions = new SessionLineItemOptions()
        {
            PriceData = new SessionLineItemPriceDataOptions()
            {
                Currency = "eur",
                UnitAmount = gameOrderDto.Price,
                ProductData = new SessionLineItemPriceDataProductDataOptions()
                {
                    Name = gameOrderDto.Title,
                    Description = "Juego",
                    Images = [gameOrderDto.ImageGame.ImageUrl]
                }
            },
            Quantity = gameOrderDto.Quantity,
        };

        return sessionLineItemOptions;
    }

    public List<SessionLineItemOptions> ToListSessionLineItemOptions(List<GameOrderDto> gameOrderDtos)
    {
        List<SessionLineItemOptions> newLineItems = new List<SessionLineItemOptions>();

        foreach (GameOrderDto gameOrderDto in gameOrderDtos)
        {
            newLineItems.Add(ToSessionLineItemOptions(gameOrderDto));
        }

        return newLineItems;
    }
}
