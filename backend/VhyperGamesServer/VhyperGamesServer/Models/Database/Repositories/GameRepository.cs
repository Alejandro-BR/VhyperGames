using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;


namespace VhyperGamesServer.Models.Database.Repositories;

public class GameRepository : Repository<Game, int>
{
    private readonly MyDbContext _context;
    public GameRepository(MyDbContext context) : base(context)
    {
        _context = context;
    }

    private async Task<Game> GetGameByTitle(string title)
    {
        title = title.ToLower();

        return await GetQueryable()
            .FirstOrDefaultAsync(game => game.Title.ToLower() == title);
    }

    public async Task<List<Game>> FilterAndSortGamesAsync(GameFilterDto filter, SmartSearchService smartSearchService)
    {
        IQueryable<Game> query = _context.Games;

        if (!string.IsNullOrEmpty(filter.SearchText))
        {
            // Usar SmartSearchService para realizar la búsqueda inteligente ???????? MODIFICAR
            var matchedTitles = smartSearchService.Search(filter.SearchText);

            // Si hay coincidencias, aplicamos un filtro sobre el título de los juegos ???????? MODIFICAR
            if (matchedTitles != null && matchedTitles.Any())
            {
                query = query.Where(g => matchedTitles.Contains(g.Title));
            }
        }

        if (filter.DrmFree.HasValue)
        {
            query = query.Where(g => g.DrmFree == filter.DrmFree.Value);
        }

        if (!string.IsNullOrEmpty(filter.Genre))
        {
            query = query.Where(g => g.Genre == filter.Genre);
        }

        switch (filter.SortCriteria?.ToLower())
        {
            case "highest price":
                query = query.OrderByDescending(g => g.Price);
                break;
            case "lowest price":
                query = query.OrderBy(g => g.Price);
                break;
            case "a-z":
                query = query.OrderBy(g => g.Title);
                break;
            case "z-a":
                query = query.OrderByDescending(g => g.Title);
                break;
            default:
                query = query.OrderBy(g => g.Title);
                break;
        }

        return await query
            .Skip((filter.Page - 1) * filter.ResultsPerPage)
            .Take(filter.ResultsPerPage)
            .ToListAsync();
    }

    public async Task<List<Game>> GetNewGamesRelease()
    {
        const int QUANTITY = 5;

        return await GetQueryable()
            .OrderByDescending(g => g.ReleaseDate)
            .Take(QUANTITY)
            .ToListAsync();
    }

    public async Task<List<Game>> GetSaleGames()
    {
        string[] titles = { "The Witcher 3", "Overcooked", "ES V: Skyrim" };
        List<Game> games = new List<Game>();

        foreach (var title in titles)
        {
            Game game = await GetGameByTitle(title);
            games.Add(game);
        }

        return games;
    }

    public async Task<List<string>> GetAllTitles()
    {
        // Obtener todos los juegos
        ICollection<Game> games = await GetAllAsync();

        // Seleccionar solo los títulos de cada juego
        List<string> titles = games.Select(g => g.Title).ToList();

        return titles;
    }
}
