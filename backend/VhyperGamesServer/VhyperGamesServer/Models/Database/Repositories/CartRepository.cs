using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

public class CartRepository : Repository<Cart, int>
{
    private readonly MyDbContext _context;
    public CartRepository(MyDbContext context) : base(context)
    {
        _context = context;
    }
}
