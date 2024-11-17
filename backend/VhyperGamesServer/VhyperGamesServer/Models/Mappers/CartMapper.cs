﻿using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;
using System.Linq;

namespace VhyperGamesServer.Models.Mappers;

public class CartMapper
{
    public CartGameDto ToCartGameDto(CartDetail cartDetail)
    {
        //var imageUrl = cartDetail.Game.ImageGames?.FirstOrDefault()?.ImageUrl ?? "default_image_url.jpg"; 

        return new CartGameDto
        {
            Id = cartDetail.Id,
            IdGame = cartDetail.GameId,
            Quantity = cartDetail.Quantity,
            Title = cartDetail.Game?.Title ?? "Título no disponible",
            Price = cartDetail.Game?.Price ?? 0,
            TotalPrice = cartDetail.Quantity * (cartDetail.Game?.Price ?? 0),
            Stock = cartDetail.Game?.Stock ?? 0,
            ImageGames = cartDetail.Game?.ImageGames?.FirstOrDefault()
        };
    }

    public IEnumerable<CartGameDto> ToListCartGameDto(IEnumerable<CartDetail> cartDetails)
    {
        return cartDetails.Select(detail => ToCartGameDto(detail));
    }

    public CartDto ToCartPaymentDto(Cart cart)
    {
        var games = ToListCartGameDto(cart.CartDetails).ToList(); 
        return new CartDto
        {
            UserId = cart.UserId,
            CartId = cart.Id,
            Games = games,
            TotalPrice = games.Sum(game => game.TotalPrice) 
        };
    }
}
