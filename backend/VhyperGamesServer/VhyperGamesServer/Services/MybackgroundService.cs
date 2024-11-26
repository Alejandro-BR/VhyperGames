using VhyperGamesServer.Models.Database.Repositories;

public class MybackgroundService : BackgroundService
{
    private readonly UnitOfWork _unitOfWork;

    public MybackgroundService(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await ProcessExpiredReserves(stoppingToken);
            await Task.Delay(30000, stoppingToken); // 30 segundos
        }
    }

    private async Task ProcessExpiredReserves(CancellationToken stoppingToken)
    {
        try
        {
            var expiredReserves = await _unitOfWork.ReserveRepository.GetExpiredReserves();

            foreach (var reserve in expiredReserves)
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
            }

            await _unitOfWork.SaveAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al procesar reservas expiradas: {ex.Message}");
        }
    }

}
