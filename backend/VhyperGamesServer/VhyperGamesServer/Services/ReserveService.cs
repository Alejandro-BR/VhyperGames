using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Services;

public class ReserveService
{
    private readonly UnitOfWork _unitOfWork;

    public ReserveService(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Reserve> CreateReserve(int userId, List<CartDto> cart)
    {
        if (cart == null || !cart.Any())
        {
            throw new ArgumentException("El carrito no puede estar vacíos.");
        }

        List<ReserveDetail> reserveDetails = new List<ReserveDetail>();

        foreach (var cartItem in cart)
        {
            var game = await _unitOfWork.GameRepository.GetByIdAsync(cartItem.GameId);

            if (game == null)
            {
                throw new InvalidOperationException($"El juego con ID {cartItem.GameId} no existe.");
            }

            if (game.Stock < cartItem.Quantity)
            {
                throw new InvalidOperationException($"No hay suficiente stock para el juego '{game.Title}'.");
            }

            // Reducir stock temporalmente
            game.Stock -= cartItem.Quantity;

            _unitOfWork.GameRepository.Update(game);

            reserveDetails.Add(new ReserveDetail
            {
                GameId = cartItem.GameId,
                Quantity = cartItem.Quantity,
            });
        }

        var reserve = new Reserve
        {
            UserId = userId,
            ReserveDetails = reserveDetails
        };

        try
        {
            await _unitOfWork.ReserveRepository.InsertAsync(reserve);
            await _unitOfWork.ReserveRepository.SaveAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new Exception("Error al guardar la reserva en la base de datos.", ex);
        }

        return reserve;
    }


    public async Task<Reserve> GetReserveDetails(int reserveId)
    {
        var reserve = await _unitOfWork.ReserveRepository.GetReserveById(reserveId);

        if (reserve == null)
        {
            throw new KeyNotFoundException($"La reserva con ID {reserveId} no existe.");
        }
        return reserve;
    }

    public async Task ConfirmReserve(int reserveId)
    {
        var reserve = await _unitOfWork.ReserveRepository.GetReserveById(reserveId);

        if (reserve == null)
        {
            throw new KeyNotFoundException($"La reserva con ID {reserveId} no existe.");
        }

        int totalPrice = reserve.ReserveDetails.Sum(detail => detail.Game.Price * detail.Quantity);

        var order = new Order
        {
            UserId = reserve.UserId,
            TotalPrice = totalPrice,
            BillingDate = DateTime.UtcNow,
            OrderGames = reserve.ReserveDetails.Select(detail => new OrderGame
            {
                GameId = detail.GameId,
                Quantity = detail.Quantity,
            }).ToList()
        };

        await _unitOfWork.OrderRepository.InsertAsync(order);

        //Elimina reserva temporal
        _unitOfWork.ReserveRepository.Delete(reserve);

        await _unitOfWork.ReserveRepository.SaveAsync();
    }


    public async Task CancelReserve(int reserveId)
    {
        var reserve = await _unitOfWork.ReserveRepository.GetReserveById(reserveId);

        if (reserve == null)
        {
            throw new KeyNotFoundException($"La reserva con ID {reserveId} no existe.");
        }

        foreach(var detail in reserve.ReserveDetails)
        {
            var game = await _unitOfWork.GameRepository.GetByIdAsync(detail.GameId);

            if (game != null)
            {
                game.Stock += detail.Quantity;
                _unitOfWork.GameRepository.Update(game);
            }
        }

        _unitOfWork.ReserveRepository.Delete(reserve);

        await _unitOfWork.ReserveRepository.SaveAsync();
    }



}
