using Stripe.Checkout;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Entities.Enuml;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Models.Mappers;

public class OrderMapper
{
    public OrderDto ToOrderDto(Order order)
    {
        return new OrderDto
        {
            BillingDate = order.BillingDate,
            OrderGames = order.OrderDetails,
            ModeOfPay = order.ModeOfPay,
            TotalPrice = order.TotalPrice,
        };
    }
}

