using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

public class CartDetailsRepository : Repository<CartDetail, int>
{
    private readonly MyDbContext _context;

    public CartDetailsRepository(MyDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<CartDetail> GetByIdCartDetails(int id)
    {
        return await Context.Set<CartDetail>()
            .Include(cd => cd.Game) 
            .Include(cd => cd.Game.ImageGames)
            .FirstOrDefaultAsync(cd => cd.Id == id);
    }

}
