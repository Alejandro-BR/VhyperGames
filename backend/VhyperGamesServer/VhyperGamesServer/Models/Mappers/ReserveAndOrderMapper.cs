using Stripe.Checkout;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Models.Mappers;

public class ReserveAndOrderMapper
{
    public OrderDto ToOrderDto(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            BillingDate = order.BillingDate,
            OrderGames = order.OrderDetails,
            ModeOfPay = order.ModeOfPay,
            TotalPrice = order.TotalPrice,
        };
    }

    public OrderDetailDto ToOrderDetailDto(ReserveDetail reserveDetail)
    {
        return new OrderDetailDto
        {
            GameId = reserveDetail.GameId,
            Title = reserveDetail.Game.Title,
            Quantity = reserveDetail.Quantity,
            Price = reserveDetail.Game.Price * reserveDetail.Quantity,
            ImageGame = reserveDetail.Game.ImageGames.FirstOrDefault()
        };
    }

    public OrderDetailDto ToOrderDetailDto(OrderDetail orderGame) 
    {
        return new OrderDetailDto
        {
            GameId = orderGame.GameId,
            Title = orderGame.Game.Title,
            Quantity = orderGame.Quantity,
            Price = orderGame.Game.Price * orderGame.Quantity,
            ImageGame = orderGame.Game.ImageGames.FirstOrDefault()
        };
    }

    public List<OrderDetailDto> ToListOrderDetailDto(List<ReserveDetail> reserveDetails)
    {
        List<OrderDetailDto> gameOrderDtos = new List<OrderDetailDto>();

        foreach (ReserveDetail ReserveDetail in reserveDetails)
        {
            gameOrderDtos.Add(ToOrderDetailDto(ReserveDetail));
        }

        return gameOrderDtos;
    }

    public List<OrderDetailDto> ToListOrderDetailDto(List<OrderDetail> orderGames)
    {
        List<OrderDetailDto> orderDtos = new List<OrderDetailDto>();

        foreach (OrderDetail OrderGame in orderGames)
        {
           orderDtos.Add(ToOrderDetailDto(OrderGame));
        }
        return orderDtos;
    }

    public SessionLineItemOptions ToSessionLineItemOptions(ReserveDetail reserveDetail)
    {
        SessionLineItemOptions sessionLineItemOptions = new SessionLineItemOptions()
        {
            PriceData = new SessionLineItemPriceDataOptions()
            {
                Currency = "eur",
                UnitAmount = reserveDetail.Game.Price,
                ProductData = new SessionLineItemPriceDataProductDataOptions()
                {
                    Name = reserveDetail.Game.Title,
                    Description = "Juego",
                    Images = [reserveDetail.Game.ImageGames[0].ImageUrl]
                }
            },
            Quantity = reserveDetail.Quantity,
        };

        return sessionLineItemOptions;
    }

    public List<SessionLineItemOptions> ToListSessionLineItemOptions(List<ReserveDetail> reserveDetails)
    {
        List<SessionLineItemOptions> newLineItems = new List<SessionLineItemOptions>();

        foreach (ReserveDetail reserveDetail in reserveDetails)
        {
            newLineItems.Add(ToSessionLineItemOptions(reserveDetail));
        }

        return newLineItems;
    }
}
