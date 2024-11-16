using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

public class CartDetailsRepository : Repository<CartDetail, int>
{
    private readonly MyDbContext _context;
    public CartDetailsRepository(MyDbContext context) : base(context)
    {
        _context = context;
    }
}
