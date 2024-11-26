using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

public class ReserveRepository : Repository<Reserve, int>
{
    private readonly MyDbContext _context;
    public ReserveRepository(MyDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Reserve> GetReserveById(int id)
    {
        return await Context.Set<Reserve>()
            .Include(r => r.ReserveDetails)
                .ThenInclude(rd => rd.Game)
                    .ThenInclude(g => g.ImageGames)
            .FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task<Reserve> GetReserveByUserId(int id)
    {
        return await Context.Set<Reserve>()
            .Include(r => r.ReserveDetails)
                .ThenInclude(rd => rd.Game)
                    .ThenInclude(g => g.ImageGames)
            .FirstOrDefaultAsync(r => r.UserId == id);
    }

    public async Task<Reserve> GetLastReserveByUserId(int id)
    {
        return await Context.Set<Reserve>()
            .Include(r => r.ReserveDetails)
                .ThenInclude(rd => rd.Game)
                    .ThenInclude(g => g.ImageGames)
            .Where(r => r.UserId == id)
            .OrderByDescending(r => r.Id)
            .FirstOrDefaultAsync();
    }

    public async Task<List<Reserve>> GetExpiredReserves()
    {
        return await Context.Set<Reserve>()
            .Include(r => r.ReserveDetails)
            .Where(r => r.ExpirationTime < DateTime.UtcNow)
            .ToListAsync();
    }

}