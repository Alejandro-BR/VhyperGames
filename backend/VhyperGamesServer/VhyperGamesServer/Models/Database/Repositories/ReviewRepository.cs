using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

public class ReviewRepository : Repository<Review, int>
{
    private readonly MyDbContext _context;

    public ReviewRepository(MyDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<Review>> GetAllReviewsOrderByDateByGameId(int idGame)
    {

        return await GetQueryable()
            .Include(r => r.User)
            .Include(r => r.Game)
            .Where(r => r.GameId == idGame)
            .OrderByDescending(r => r.ReviewDate)
            .ToListAsync();
    }

    public async Task<Review> IsReviewed(int idGame, int idUser)
    {
        if (idGame <= -1 || idUser <= -1)
        {
            return null;
        }

        return await GetQueryable()
            .FirstOrDefaultAsync(r => r.UserId == idUser && r.GameId == idGame);
    }

}