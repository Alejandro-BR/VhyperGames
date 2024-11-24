using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

public class OrderGameRepository : Repository<OrderDetail, int>
{
    private readonly MyDbContext _context;

    public OrderGameRepository(MyDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<OrderDetail>> GetOrderById(int idOrder)
    {
        return await Context.Set<OrderDetail>()
        .Where(cd => cd.OrderId == idOrder)
        .Include(cd => cd.Game)
        .Include(cd => cd.Game.ImageGames)
        .ToListAsync();
    }

    public async Task<OrderDetail> GetOrderByIds(int idOrder, int idGame)
    {
        return await Context.Set<OrderDetail>()
            .Include(cd => cd.Game)
                .ThenInclude(g => g.ImageGames)
            .FirstOrDefaultAsync(cd => cd.OrderId == idOrder && cd.GameId == idGame);
    }

}