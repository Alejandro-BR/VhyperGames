using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Mappers;

namespace VhyperGamesServer.Services
{
    public class CatalogService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly GameCardMapper _gameCardMapper;
        private readonly SmartSearchService _smartSearchService;

        public CatalogService(UnitOfWork unitOfWork, GameCardMapper gameCardMapper, SmartSearchService smartSearchService)
        {
            _unitOfWork = unitOfWork;
            _gameCardMapper = gameCardMapper;
            _smartSearchService = smartSearchService;
        }

        public async Task<List<GameCardDto>> FilterAndSortGamesAsync(GameFilterDto filter)
        {
            // Obtiene la lista de juegos filtrados y ordenados
            List<Game> games = await _unitOfWork.GameRepository.FilterAndSortGamesAsync(filter, _smartSearchService);

            return _gameCardMapper.ListToDto(games).ToList();
        }

        public async Task<List<GameCardDto>> GetNewGamesRelease()
        {

            List<Game> games = await _unitOfWork.GameRepository.GetNewGamesRelease();

            return _gameCardMapper.ListToDto(games).ToList();
        }


        public async Task<List<GameCardDto>> GetSaleGames()
        {

            List<Game> games = await _unitOfWork.GameRepository.GetSaleGames();

            return _gameCardMapper.ListToDto(games).ToList();
        }

        public async Task<List<string>> FilterAndSortGamesAsync()
        {
            return await _unitOfWork.GameRepository.GetAllTitles();
        }
    }
}
