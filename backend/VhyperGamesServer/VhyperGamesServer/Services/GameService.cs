using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Database.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VhyperGamesServer.Services
{
    public class GameService
    {
        private readonly GameRepository _gameRepository;

        public GameService(GameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }

        public async Task<List<GameCardDto>> FilterAndSortGamesAsync(GameFilterDto filter)
        {
            // Obtiene la lista de juegos filtrados y ordenados
            var games = await _gameRepository.FilterAndSortGamesAsync(filter);

            // Mapea los juegos a GameCardDto
            var gameCardDtos = games.Select(game => new GameCardDto
            {
                Id = game.Id,
                Title = game.Title,
                Stock = game.Stock,
                Price = game.Price,
                // ImageUrl = game.ImageUrl
            }).ToList();

            return gameCardDtos;
        }

        public async Task<List<GameCardDto>> GetNewGamesRelease()
        {
            // const int QUANTITY = 5;

            var games = await _gameRepository.GetNewGamesRelease();

            // Mapea los nuevos juegos a GameCardDto
            var gameCardDtos = games.Select(game => new GameCardDto
            {
                Id = game.Id,
                Title = game.Title,
                Stock = game.Stock,
                Price = game.Price,
                // ImageUrl = game.ImageUrl
            }).ToList();

            return gameCardDtos;
        }

        public async Task<List<GameCardDto>> GetSaleGames()
        {
            var games = await _gameRepository.GetSaleGames();

            // Mapea los juegos en oferta a GameCardDto
            var gameCardDtos = games.Select(game => new GameCardDto
            {
                Id = game.Id,
                Title = game.Title,
                Stock = game.Stock,
                Price = game.Price,
                // ImageUrl = game.ImageUrl
            }).ToList();

            return gameCardDtos;
        }

        public async Task<List<string>> GetAllTitles()
        {
            return await _gameRepository.GetAllTitles();
        }

        internal async Task<Game> GetAsync(int id)
        {
            // Aquí llamas al método del repositorio que obtiene el juego por ID
            var game = await _gameRepository.GetByIdAsync(id);

            // Si el juego no se encuentra, puedes manejarlo como desees
            if (game == null)
            {
                throw new KeyNotFoundException("El juego no se encontró.");
            }

            return game;
        }

        public async Task<GameCardDto> CreateGameAsync(CreateGameDto newGameDto)
        {
            var game = new Game
            {
                Title = newGameDto.Title,
                Description = newGameDto.Description,
                Genre = newGameDto.Genre,
                DrmFree = newGameDto.DrmFree,
                ReleaseDate = newGameDto.ReleaseDate,
                Price = newGameDto.Price,
                Stock = newGameDto.Stock
            };

            await _gameRepository.InsertAsync(game);
            await _gameRepository.SaveAsync(); // Esto ahora funcionará correctamente

            return new GameCardDto
            {
                Id = game.Id,
                Title = game.Title,
                Price = game.Price,
                Stock = game.Stock,
                ImageUrl = game.ImageGames?.FirstOrDefault()?.ImageUrl // Asumiendo que tendrás imágenes en el futuro
            };
        }



    }
}
