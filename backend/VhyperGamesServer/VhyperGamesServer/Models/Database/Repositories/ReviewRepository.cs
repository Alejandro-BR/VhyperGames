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

    public async Task<List<int>> GetRatingsByGameIdAsync(int gameId)
    {
        return await Context.Reviews
            .Where(r => r.GameId == gameId)
            .Select(r => r.Rating)
            .ToListAsync();
    }

    public async Task<Review?> GetReviewByUserAndGameAsync(int gameId, int userId)
    {
        return await _context.Reviews
            .Include(r => r.User)
            .Where(r => r.GameId == gameId && r.UserId == userId)
            .FirstOrDefaultAsync();
    }

    public async Task<bool> UserOwnsGameAsync(int userId, int gameId)
    {
        if (userId <= -1 || gameId <= -1)
        {
            return false;
        }

        return await _context.Order
            .Where(o => o.UserId == userId) 
            .SelectMany(o => o.OrderDetails) 
            .AnyAsync(od => od.GameId == gameId); 
    }
}