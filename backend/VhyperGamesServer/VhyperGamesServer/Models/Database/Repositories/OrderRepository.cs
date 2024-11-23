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
            .Include(o => o.User)
            .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Game)
                    .ThenInclude(g => g.ImageGames)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task<List<Order>> GetOrdersByUserId(int userId)
    {
        return await Context.Set<Order>()
            .Include(o => o.User)  
            .Include(o => o.OrderDetails)  
                .ThenInclude(od => od.Game) 
                    .ThenInclude(g => g.ImageGames)  
            .Where(o => o.UserId == userId)  
            .ToListAsync(); 
    }

    public async Task<Order> GetRecentOrderByUserId(int userId)
    {
        return await Context.Set<Order>()
            .Include(o => o.User) 
            .Include(o => o.OrderDetails) 
                .ThenInclude(od => od.Game) 
                    .ThenInclude(g => g.ImageGames) 
            .Where(o => o.UserId == userId)  
            .OrderByDescending(o => o.BillingDate) 
            .FirstOrDefaultAsync(); 
    }




}