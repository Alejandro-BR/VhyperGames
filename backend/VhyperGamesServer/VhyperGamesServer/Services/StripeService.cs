using Stripe.Checkout;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;

namespace VhyperGamesServer.Services;

public class StripeService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly GameOrderMapper _gameOrderMapper;
    private string URL_CLIENT;

    public StripeService(UnitOfWork unitOfWork, GameOrderMapper gameOrderMapper) { 
        _unitOfWork = unitOfWork;
        _gameOrderMapper = gameOrderMapper;
        URL_CLIENT = Environment.GetEnvironmentVariable("CLIENT_URL");
    }

    public async Task<SessionCreateOptions> EmbededCheckout(int userId)
    {
        Reserve reserve = await _unitOfWork.ReserveRepository.GetReserveByUserId(userId);
        User user = await _unitOfWork.UserRepository.GetByIdAsync(userId);

        List<GameOrderDto> gameOrdersDtos = _gameOrderMapper.ToListGameOrderDto(reserve.ReserveDetails);
        List<SessionLineItemOptions> newLineItems = _gameOrderMapper.ToListSessionLineItemOptions(gameOrdersDtos);

        SessionCreateOptions options = new SessionCreateOptions
        {
            UiMode = "embedded",
            Mode = "payment",
            PaymentMethodTypes = ["card"],
            LineItems = newLineItems,
            CustomerEmail = user.Email,
            ReturnUrl = URL_CLIENT + "/checkout?session_id={CHECKOUT_SESSION_ID}",
        };

        return options;
    }
}
