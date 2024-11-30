using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

public class ImageGameRepository : Repository<ImageGame, int>
{
    private readonly MyDbContext _context;

    public ImageGameRepository(MyDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<ImageGame>> GetAllImagesGamesAsync()
    {
        return await _context.ImagesGame.Include(ig => ig.Game).ToListAsync(); 
    }
}