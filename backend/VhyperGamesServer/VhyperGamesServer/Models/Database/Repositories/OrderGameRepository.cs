using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

public class OrderGameRepository : Repository<OrderGame, int>
{
    private readonly MyDbContext _context;

    public OrderGameRepository(MyDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<OrderGame>> GetOrderById(int idOrder)
    {
        return await Context.Set<OrderGame>()
        .Where(cd => cd.OrderId == idOrder)
        .Include(cd => cd.Game)
        .Include(cd => cd.Game.ImageGames)
        .ToListAsync();
    }

    public async Task<OrderGame> GetOrderByIds(int idOrder, int idGame)
    {
        return await Context.Set<OrderGame>()
            .Include(cd => cd.Game)
                .ThenInclude(g => g.ImageGames)
            .FirstOrDefaultAsync(cd => cd.OrderId == idOrder && cd.GameId == idGame);
    }

}