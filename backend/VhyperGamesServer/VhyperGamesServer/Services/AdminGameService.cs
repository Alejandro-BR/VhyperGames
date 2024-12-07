using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;

namespace VhyperGamesServer.Services;

public class AdminGameService
{
    UnitOfWork _unitOfWork { get; set; }
    AdminMapper _adminMapper { get; set; }

    private readonly ImageService _imageService;

    private SmartSearchService smartSearchService;

    public AdminGameService(AdminMapper adminMapper, UnitOfWork unitOfWork, ImageService imageService)    
    {
        _adminMapper = adminMapper;
        _unitOfWork = unitOfWork;
        _imageService = imageService;
        smartSearchService = new SmartSearchService();
    }

    public async Task<List<AdminGameDto>> GetListGame()
    {
        List<Game> games = await _unitOfWork.GameRepository.GetAllGamesAsync();
        return _adminMapper.ToListAdminGameDto(games);
    }

    public async Task PostNewImages(List<IFormFile> images, string title)
    {
        ArgumentNullException.ThrowIfNull(images);
        ArgumentNullException.ThrowIfNull(title);

        Game game = await _unitOfWork.GameRepository.GetGameByTitle(title);

        for (int i = 0; i < images.Count; i++)
        {

            string altText = images[i].Name + "_" + i;

            ImageRequestDto imageRequestDto = new ImageRequestDto()
            {
                File = images[i],
                AltText = altText
            };

           await _imageService.InsertAsync(imageRequestDto, game.Id);
        }
    }

    public async Task<string> PostNewGame(AdminFormGameDto adminFormGameDto)
    {
        if (adminFormGameDto == null)
        {
            throw new ArgumentNullException("Los parametros no pueden ser nulos.");
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
        };

        await _unitOfWork.GameRepository.InsertAsync(game);
        await _unitOfWork.SaveAsync();

        return game.Title;
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

    public async Task PutGame(AdminFormGameDto adminFormGameDto, List<IFormFile> images)
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

        UpdateGameData(game, adminFormGameDto);

        if (images != null && adminFormGameDto.ImagesId != null)
        {
            for (int i = 0; i < adminFormGameDto.ImagesId.Count; i++)
            {
                IFormFile file = images[i];

                string text = file.Name + i;


                int id = adminFormGameDto.ImagesId[i];

                await _imageService.UpdateFormFileAsync(file, text, id);
            }
        }

        await _unitOfWork.SaveAsync();
    }

    public async Task<List<AdminGameDto>> GetGameBySearch(string search)
    {
        List<Game> games = new List<Game>();

        if (string.IsNullOrWhiteSpace(search))
        {
            throw new ArgumentException("La búsqueda no puede estar vacía.");
        }

        Game game = await _unitOfWork.GameRepository.GetGameByTitle(search);

        if (game != null && game.Title == search)
        {
            games.Add(game);

        } else
        {
            List<string> gameTitles = await _unitOfWork.GameRepository.GetAllTitles();
            IEnumerable<string> matchedTitles = smartSearchService.Search(search, gameTitles);

            if (matchedTitles != null && matchedTitles.Any())
            {
                games = await _unitOfWork.GameRepository.GetGamesByTitles(matchedTitles);
            }

        }

        List<AdminGameDto> adminGames = _adminMapper.ToListAdminGameDto(games);

        return adminGames;
    }

    private static void UpdateGameData(Game game, AdminFormGameDto adminFormGameDto)
    {
        if (adminFormGameDto.Title != null && adminFormGameDto.Title != "" && adminFormGameDto.Title != game.Title)
        {
            game.Title = adminFormGameDto.Title;
        }

        if (adminFormGameDto.Price != 0 && adminFormGameDto.Price != game.Price && adminFormGameDto.Price > 0)
        {
            game.Price = adminFormGameDto.Price;
        }

        if (adminFormGameDto.Stock != game.Stock && adminFormGameDto.Stock >= 0)
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
    }


}
