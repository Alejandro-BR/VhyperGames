using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;

namespace VhyperGamesServer.Services;

public class AdminGameService
{
    UnitOfWork _unitOfWork { get; set; }
    AdminMapper _adminMapper { get; set; }

    public AdminGameService(AdminMapper adminMapper, UnitOfWork unitOfWork)
    {
        _adminMapper = adminMapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<List<AdminGameDto>> GetListGame()
    {
        List<Game> games = await _unitOfWork.GameRepository.GetAllGamesAsync();
        return _adminMapper.ToListAdminGameDto(games);
    }

    public async Task PostNewGame(AdminFormGameDto adminFormGameDto) 
    {
        if (adminFormGameDto == null)
        {
            throw new ArgumentNullException("El objeto AdminFormGameDto no puede ser nulo.");
        }

        Game game = new Game()
        {
            Title = adminFormGameDto.Title,
            Price = adminFormGameDto.Price,
            Stock = adminFormGameDto.Stock,
            GameRequirementsId = adminFormGameDto.GameRequirementsId,
            Description = adminFormGameDto.Description,
            Sinopsis = adminFormGameDto.Sinopsis,
            Genre = adminFormGameDto.Genre,
            DrmFree = adminFormGameDto.DrmFree,
            ReleaseDate = adminFormGameDto.ReleaseDate,
            ImageGames = adminFormGameDto.ImageGames,
        };

        await _unitOfWork.GameRepository.InsertAsync(game);
        await _unitOfWork.SaveAsync();
    }

    public async Task<AdminFormGameDto> GetFormGame(int gameId)
    {
        Game game = await _unitOfWork.GameRepository.GetByIdAsync(gameId, false, true);

        if (game == null)
        {
            throw new KeyNotFoundException($"No se encontró un juego con el ID {gameId}.");
        }

        return _adminMapper.ToAdminFormGameDto(game);
    }

    public async Task PutGame(AdminFormGameDto adminFormGameDto)
    {
        if (adminFormGameDto == null)
        {
            throw new ArgumentNullException("El objeto AdminFormGameDto no puede ser nulo.");
        }

        Game game = await _unitOfWork.GameRepository.GetByIdAsync(adminFormGameDto.Id, false, true);

        if (game == null)
        {
            throw new KeyNotFoundException($"No se encontró un juego con el ID {adminFormGameDto.Id}.");
        }

        if (adminFormGameDto.Title != null && adminFormGameDto.Title != "" && adminFormGameDto.Title != game.Title) {
            game.Title = adminFormGameDto.Title;
        }

        if (adminFormGameDto.Price != 0 && adminFormGameDto.Price != game.Price)
        {
            game.Price = adminFormGameDto.Price;
        }

        if (adminFormGameDto.Stock != 0 && adminFormGameDto.Stock != game.Stock)
        {
            game.Stock = adminFormGameDto.Stock;
        }

        if (adminFormGameDto.GameRequirementsId != 0 && adminFormGameDto.GameRequirementsId != game.GameRequirementsId)
        {
            game.GameRequirementsId = adminFormGameDto.GameRequirementsId;
        }

        if (adminFormGameDto.Description != null && adminFormGameDto.Description != "" && adminFormGameDto.Description != game.Description)
        {
            game.Description = adminFormGameDto.Description;
        }

        if (adminFormGameDto.Sinopsis != null && adminFormGameDto.Sinopsis != "" && adminFormGameDto.Sinopsis != game.Sinopsis)
        {
            game.Sinopsis = adminFormGameDto.Sinopsis;
        }

        if (adminFormGameDto.Genre != game.Genre)
        {
            game.Genre = adminFormGameDto.Genre;
        }

        if (adminFormGameDto.DrmFree != game.DrmFree)
        {
            game.DrmFree = adminFormGameDto.DrmFree;
        }

        if (adminFormGameDto.ReleaseDate != game.ReleaseDate)
        {
            game.ReleaseDate = adminFormGameDto.ReleaseDate;
        }

        if (adminFormGameDto.ImageGames != game.ImageGames)
        {
            game.ImageGames = adminFormGameDto.ImageGames;
        }

        await _unitOfWork.SaveAsync();
    }

}