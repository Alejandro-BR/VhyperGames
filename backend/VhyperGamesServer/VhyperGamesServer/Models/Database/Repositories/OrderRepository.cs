using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

public class OrderRepository : Repository<Order, int>
{
    private readonly MyDbContext _context;
    public OrderRepository(MyDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Reserve> GetOrderById(int id)
    {
        return await Context.Set<Reserve>()
            .Include(c => c.ReserveDetails)
                .ThenInclude(cd => cd.Game)
                    .ThenInclude(g => g.ImageGames)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}