using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

public class RequerimentRepository : Repository<GameRequirements, int>
{
    private readonly MyDbContext _context;

    public RequerimentRepository (MyDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<GameRequirements> GetRequerimentByIdGame(int idGame)
    {
        return await GetQueryable()
            .Include(r => r.Games)
            .Where(r => r.Games.Any(g => g.Id == idGame))
            .FirstOrDefaultAsync();
    }

    public async Task<GameRequirements> GetRequerimentAllById(int id)
    {
        return await GetQueryable()
            .Where(r => r.Id == id)
            .FirstOrDefaultAsync();
    }
}
