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
        // Obtener todos los juegos
        ICollection<Game> games = await GetAllAsync();

        // Seleccionar solo los títulos de cada juego
        List<string> titles = games.Select(g => g.Title).ToList();

        return titles;
    }

    public async Task<Game> GetByIdAsync(int gameId, bool includeReviews = false, bool includeImages = false)
    {
        IQueryable<Game> query = Context.Set<Game>();

        // Si se requiere incluir reseñas
        if (includeReviews)
        {
            query = query.Include(g => g.Reviews);
        }

        // Si se requiere incluir imágenes
        if (includeImages)
        {
            query = query.Include(g => g.ImageGames);
        }

        // Ejecuta la consulta y busca por el ID
        return await query.FirstOrDefaultAsync(g => g.Id == gameId);
    }

}