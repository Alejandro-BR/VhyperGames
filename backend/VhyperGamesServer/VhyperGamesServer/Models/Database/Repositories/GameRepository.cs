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

    public async Task<Game> GetGameByTitle(string title)
    {
        title = title.ToLower();

        return await GetQueryable()
            .Include(g => g.ImageGames)
            .FirstOrDefaultAsync(game => game.Title.ToLower() == title);
    }

    public async Task<IQueryable<Game>> GetIncludingImages()
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
}