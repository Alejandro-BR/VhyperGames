using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;


namespace VhyperGamesServer.Models.Database.Repositories;

public class GameRepository : Repository<Game, int>
{
    private readonly MyDbContext _context;
    public GameRepository(MyDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Game> GetGameByTitle(string title)
    {
        title = title.ToLower();

        return await GetQueryable()
            .Include(g => g.ImageGames)
            .FirstOrDefaultAsync(game => game.Title.ToLower() == title);
    }

    public IQueryable<Game> GetIncludingImages()
    {
        return _context.Games.Include(g => g.ImageGames);
    }

    public async Task<List<Game>> GetNewGamesRelease()
    {
        const int QUANTITY = 5;

        return await GetQueryable()
            .OrderByDescending(g => g.ReleaseDate)
            .Take(QUANTITY)
            .Include(g => g.ImageGames)
            .ToListAsync();
    }

    public async Task<List<string>> GetAllTitles()
    {
        ICollection<Game> games = await GetAllAsync();

        List<string> titles = games.Select(g => g.Title).ToList();

        return titles;
    }

    public async Task<Game> GetByIdAsync(int gameId, bool includeReviews = false, bool includeImages = false)
    {
        IQueryable<Game> query = Context.Set<Game>();

        if (includeReviews)
        {
            query = query.Include(g => g.Reviews);
        }

        if (includeImages)
        {
            query = query.Include(g => g.ImageGames);
        }

        return await query.FirstOrDefaultAsync(g => g.Id == gameId);
    }


    public async Task<List<Game>> GetAllGamesAsync()
    {
        IQueryable<Game> query = Context.Set<Game>().Include(g => g.ImageGames);
        return await query.ToListAsync();
    }

    public async Task<List<Game>> GetGamesByTitles(IEnumerable<string> titles)
    {
        if (titles == null || !titles.Any())
        {
            return new List<Game>();
        }

        return await Context.Games
            .Where(g => titles.Contains(g.Title))
            .Include(g => g.ImageGames)
            .ToListAsync();
    }


}