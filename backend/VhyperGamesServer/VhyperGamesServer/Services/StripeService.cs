using Stripe;
using Stripe.Checkout;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;

namespace VhyperGamesServer.Services;

public class StripeService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly ReserveAndOrderMapper _gameOrderMapper;
    private string URL_CLIENT;

    public StripeService(UnitOfWork unitOfWork, ReserveAndOrderMapper gameOrderMapper) { 
        _unitOfWork = unitOfWork;
        _gameOrderMapper = gameOrderMapper;
        URL_CLIENT = Environment.GetEnvironmentVariable("CLIENT_URL");
    }

    public async Task<SessionCreateOptions> EmbededCheckout(int userId, int reserveId)
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveById(userId);
        User user = await _unitOfWork.UserRepository.GetByIdAsync(userId);

        if (reserve == null) {
            throw new KeyNotFoundException($"No hay reserva con este ID {userId} de usuario.");
        }

        if (user == null) {
            throw new KeyNotFoundException($"No hay usuario con este ID {userId}");
        }

        List<SessionLineItemOptions> newLineItems = _gameOrderMapper.ToListSessionLineItemOptions(reserve.ReserveDetails);

        SessionCreateOptions options = new SessionCreateOptions
        {
            UiMode = "embedded",
            Mode = "payment",
            PaymentMethodTypes = ["card"],
            LineItems = newLineItems,
            CustomerEmail = user.Email,
            RedirectOnCompletion = "never"
        };

        return options;
    }

    public async Task SetSessionIdReserve(string sessionId, int userId)
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveByUserId(userId);

        if (reserve != null) { 
            reserve.SessionId = sessionId;
            await _unitOfWork.SaveAsync();
        }
    }

    public async Task<Session> GetSessionAsync(string sessionId)
    {
        try
        {
            SessionService sessionService = new SessionService();
            return await sessionService.GetAsync(sessionId);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Error al obtener la sesión de Stripe con ID {sessionId}.", ex);
        }
    }

    public async Task<bool> IsPaymentCompleted(string sessionId)
    {
        Session session = await GetSessionAsync(sessionId);
        return session.PaymentStatus == "paid";
    }
}
