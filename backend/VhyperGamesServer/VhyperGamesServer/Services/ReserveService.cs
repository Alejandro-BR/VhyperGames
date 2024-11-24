using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Entities.Enuml;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;

using Stripe.Checkout;


namespace VhyperGamesServer.Services;

public class ReserveService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly ReserveAndOrderMapper _gameOrderMapper;
    private readonly OrderService _orderService;
    private readonly StripeService _stripeService;

    public ReserveService(UnitOfWork unitOfWork, OrderService orderService, ReserveAndOrderMapper gameOrderMapper, StripeService stripeService)
    {
        _unitOfWork = unitOfWork;
        _gameOrderMapper = gameOrderMapper;
        _orderService = orderService;
        _stripeService = stripeService;
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


    public async Task <List<OrderDetailDto>> GetReserveDetails(int userId) 
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveByUserId(userId); 

        if (reserve == null)
        {
            throw new KeyNotFoundException($"El usuario con ID {userId} no tiene reserva.");
        }
        return _gameOrderMapper.ToListOrderDetailDto(reserve.ReserveDetails);
    }

    public async Task ConfirmReserve(int reserveId, PayMode modeOfPay, string sessionId)
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveByUserId(userId);

        if (reserve == null)
        {
            throw new KeyNotFoundException($"La reserva con ID {userId} no existe.");
        }

        if (!await _stripeService.IsPaymentCompleted(sessionId))
        {
            throw new InvalidOperationException("El pago no ha sido completado. No se puede confirmar la reserva.");
        }

        await _orderService.CreateOrderFromReserve(reserve, modeOfPay);

        _unitOfWork.ReserveRepository.Delete(reserve);

        await _unitOfWork.SaveAsync();
    }

    public async Task CancelReserve(int reserveId)
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveByUserId(userId);

        if (reserve == null)
        {
            throw new KeyNotFoundException($"El usuario con ID {userId} no tiene una reserva.");
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
