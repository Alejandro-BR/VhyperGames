using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Entities.Enuml;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;

namespace VhyperGamesServer.Services;

public class ReserveService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly GameOrderMapper _gameOrderMapper;

    public ReserveService(UnitOfWork unitOfWork, GameOrderMapper gameOrderMapper)
    {
        _unitOfWork = unitOfWork;
        _gameOrderMapper = gameOrderMapper;
    }

    public async Task CreateReserve(int userId, List<CartDto> cart, PayMode modeOfPay)
    {
        if (cart == null || !cart.Any())
        {
            throw new ArgumentException("El carrito no puede estar vacíos.");
        }

        List<ReserveDetail> reserveDetails = new List<ReserveDetail>();

        foreach (var cartItem in cart)
        {
            Game game = await _unitOfWork.GameRepository.GetByIdAsync(cartItem.GameId);

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

        Reserve reserve = new Reserve
        {
            UserId = userId,
            ReserveDetails = reserveDetails,
            ModeOfPay = modeOfPay
        };

        try
        {
            await _unitOfWork.ReserveRepository.InsertAsync(reserve);
            await _unitOfWork.SaveAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new Exception("Error al guardar la reserva en la base de datos.", ex);
        }
    }


    public async Task <List<GameOrderDto>> GetReserveDetails(int userId) 
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveByUserId(userId); 

        if (reserve == null)
        {
            throw new KeyNotFoundException($"El usuario con ID {userId} no tiene reserva.");
        }
        return _gameOrderMapper.ToListGameOrderDto(reserve.ReserveDetails);
    }

    public async Task ConfirmReserve(int reserveId, PayMode modeOfPay)
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveById(reserveId);

        if (reserve == null)
        {
            throw new KeyNotFoundException($"La reserva con ID {reserveId} no existe.");
        }

        int totalPrice = reserve.ReserveDetails.Sum(detail => detail.Game.Price * detail.Quantity);

        Order order = new Order
        {
            UserId = reserve.UserId,
            TotalPrice = totalPrice,
            BillingDate = DateTime.UtcNow,
            ModeOfPay = modeOfPay,
            OrderDetails = reserve.ReserveDetails.Select(detail => new OrderDetail
            {
                GameId = detail.GameId,
                Quantity = detail.Quantity,
            }).ToList()
        };

        await _unitOfWork.OrderRepository.InsertAsync(order);

        //Elimina reserva temporal
        _unitOfWork.ReserveRepository.Delete(reserve);

        await _unitOfWork.SaveAsync();
    }


    public async Task CancelReserve(int reserveId)
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveById(reserveId);

        if (reserve == null)
        {
            throw new KeyNotFoundException($"La reserva con ID {reserveId} no existe.");
        }

        foreach(var detail in reserve.ReserveDetails)
        {
            Game game = await _unitOfWork.GameRepository.GetByIdAsync(detail.GameId);

            if (game != null)
            {
                game.Stock += detail.Quantity;
                _unitOfWork.GameRepository.Update(game);
            }
        }
        _unitOfWork.ReserveRepository.Delete(reserve);

        await _unitOfWork.SaveAsync();
    }
}
