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
            .Include(c => c.ReserveDetails)
                .ThenInclude(cd => cd.Game)
                    .ThenInclude(g => g.ImageGames)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}