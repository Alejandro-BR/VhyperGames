using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

public class ImageGameRepository : Repository<ImageGame, int>
{
    public ImageGameRepository(MyDbContext context) : base(context)
    {
    }
}