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
    private readonly ReserveAndOrderMapper _gameOrderMapper;
    private readonly OrderService _orderService;
    private readonly StripeService _stripeService;
    private readonly CartService _cartService;

    public ReserveService(UnitOfWork unitOfWork, OrderService orderService, ReserveAndOrderMapper gameOrderMapper, StripeService stripeService, CartService cartService)
    {
        _unitOfWork = unitOfWork;
        _gameOrderMapper = gameOrderMapper;
        _orderService = orderService;
        _stripeService = stripeService;
        _cartService = cartService;
    }

    public async Task<int> CreateReserve(int userId, List<CartDto> cart, PayMode modeOfPay)
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

            if (cartItem.Quantity <= 0)
            {
                throw new InvalidOperationException($"La cantidad para el juego '{game.Title}' debe ser mayor a 0.");
            }

            if (game.Stock < cartItem.Quantity)
            {
                throw new InvalidOperationException($"No hay suficiente stock para el juego '{game.Title}'.");
            }
            Console.WriteLine($"Stock antes: {game.Stock}");

            // Reducir stock temporalmente
            game.Stock -= cartItem.Quantity;

            Console.WriteLine($"Stock después: {game.Stock}");

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
            ModeOfPay = modeOfPay,
            ExpirationTime = DateTime.UtcNow.AddMinutes(3) // Minutos Expiracion 
        };

        try
        {
            await _unitOfWork.ReserveRepository.InsertAsync(reserve);
            await _unitOfWork.SaveAsync();
            return reserve.Id;
        }
        catch (DbUpdateException ex)
        {
            throw new Exception("Error al guardar la reserva en la base de datos.", ex);
        }
    }


    public async Task <List<OrderDetailDto>> GetReserveDetails(int reserveId) 
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveById(reserveId); 

        if (reserve == null)
        {
            throw new KeyNotFoundException($"La reserva con ID {reserveId} no tiene reserva.");
        }
        return _gameOrderMapper.ToListOrderDetailDto(reserve.ReserveDetails);
    }

    public async Task<int> ConfirmReserve(int reserveId)
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveById(reserveId);

        if (reserve == null)
        {
            throw new KeyNotFoundException("La reserva ya no existe. Puede haber expirado o haber sido eliminada.");
        }

        if (DateTime.UtcNow > reserve.ExpirationTime)
        {
            foreach (var detail in reserve.ReserveDetails)
            {
                var game = await _unitOfWork.GameRepository.GetByIdAsync(detail.GameId);
                if (game != null)
                {
                    game.Stock += detail.Quantity;
                    _unitOfWork.GameRepository.Update(game);
                }
            }

            _unitOfWork.ReserveRepository.Delete(reserve);
            await _unitOfWork.SaveAsync();

            throw new InvalidOperationException("La reserva ha caducado y se ha eliminado automáticamente.");
        }

        // Orden creada
        int orderId = await _orderService.CreateOrderFromReserve(reserve, reserve.ModeOfPay);

        // Metodo borra reserva
        _unitOfWork.ReserveRepository.Delete(reserve);

        // Metodo borra carrito
        await _cartService.DeleteCartPayment(reserve.UserId, reserve.ReserveDetails.Select(d => new CartDto
        {
            GameId = d.GameId,
            Quantity = d.Quantity
        }).ToList());

        await _unitOfWork.SaveAsync();

        return orderId;
    }





    public async Task CancelReserve(int reserveId)
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveById(reserveId);

        if (reserve == null)
        {
            throw new KeyNotFoundException($"La reserva con ID {reserveId} no existe.");
        }

        foreach (var detail in reserve.ReserveDetails)
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
