
using VhyperGamesServer.Models.Database.Repositories;

public class MybackgroundService : BackgroundService
{
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public MybackgroundService(IServiceScopeFactory serviceScopeFactory)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {

        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                UnitOfWork unitOfWork = scope.ServiceProvider.GetRequiredService<UnitOfWork>();

                try
                {
                    await ProcessExpiredReserves(unitOfWork, stoppingToken);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error en el escaneo: {ex.Message}");
                }
            }

            await Task.Delay(30000, stoppingToken); //Escaneo cada 30 seg
        }
    }

    private async Task ProcessExpiredReserves(UnitOfWork unitOfWork, CancellationToken stoppingToken)
    {
        var expiredReserves = await unitOfWork.ReserveRepository.GetExpiredReserves();

        foreach (var reserve in expiredReserves)
        {
            foreach (var detail in reserve.ReserveDetails)
            {
                var game = await unitOfWork.GameRepository.GetByIdAsync(detail.GameId);
                if (game != null)
                {
                    game.Stock += detail.Quantity;
                    unitOfWork.GameRepository.Update(game);
                }
            }
            unitOfWork.ReserveRepository.Delete(reserve);
        }
        await unitOfWork.SaveAsync();
    }
}
