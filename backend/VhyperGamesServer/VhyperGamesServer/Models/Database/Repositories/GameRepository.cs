using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Entities.Enum;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;
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
            .Include(g => g.ImageGames)
            .FirstOrDefaultAsync(game => game.Title.ToLower() == title);
    }

    public async Task<CatalogDto> FilterAndSortGamesAsync(GameFilterDto filter, SmartSearchService smartSearchService)
    {
        IQueryable<Game> query = _context.Games.Include(g => g.ImageGames);

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

        int genreValue = (int)filter.Genre; 
        if (genreValue == -1) 
        {}
        else if (Enum.IsDefined(typeof(Genre), genreValue))
        {
            Genre genreEnum = (Genre)genreValue;
            query = query.Where(g => g.Genre == genreEnum);
        }


        // Asumiendo que filter.SortCriteria es un entero
        int sortCriteriaValue = (int)filter.SortCriteria; // Por ejemplo, 0 para HighestPrice
        if (Enum.IsDefined(typeof(SortCriteria), sortCriteriaValue))
        {
            SortCriteria sortCriteriaEnum = (SortCriteria)sortCriteriaValue;

            switch (sortCriteriaEnum)
            {
                case SortCriteria.HighestPrice:
                    query = query.OrderByDescending(g => g.Price);
                    break;
                case SortCriteria.LowestPrice:
                    query = query.OrderBy(g => g.Price);
                    break;
                case SortCriteria.ZToA:
                    query = query.OrderByDescending(g => g.Title);
                    break;
                default:
                    query = query.OrderBy(g => g.Title);
                    break;
            }
        }
        else
        {
            query = query.OrderBy(g => g.Title); // Orden por defecto
        }

        int page = filter.Page > 0 ? filter.Page : 1;
        int resultsPerPage = filter.ResultsPerPage > 0 ? filter.ResultsPerPage : 10;

        // Calcular el total de juegos antes de la paginación
        int totalGames = await query.CountAsync();

        // Calcular el número total de páginas
        int totalPages = (int)Math.Ceiling(totalGames / (double)resultsPerPage);


        List<Game> games = await query
            .Skip((page - 1) * resultsPerPage)
            .Take(resultsPerPage)
            .ToListAsync();

        // Mapear la lista de juegos a GameCardDto
        GameCardMapper gameCardMapper = new GameCardMapper();
        List<GameCardDto> cards = gameCardMapper.ListToDto(games).ToList();

        CatalogDto catalogoDto = new CatalogDto
        {
            Games = cards,
            TotalPages = totalPages
        };

        return catalogoDto;
    
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

    public async Task<List<Game>> GetSaleGames()
    {
        string[] titles = { "The Witcher III" };
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