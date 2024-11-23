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

    public async Task<Order> GetOrderById(int id)
    {
        return await Context.Set<Order>()
            .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Game)
                    .ThenInclude(g => g.ImageGames)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}