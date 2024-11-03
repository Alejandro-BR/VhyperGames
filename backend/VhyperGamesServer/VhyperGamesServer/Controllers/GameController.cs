using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly GameService _gameService;

        public GameController(GameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GameCardDto>>> GetAllGames([FromQuery] GameFilterDto filter)
        {
            var games = await _gameService.FilterAndSortGamesAsync(filter);
            return Ok(games);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GameCardDto>> GetGameById(int id)
        {
            var game = await _gameService.GetAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return Ok(game);
        }

        [HttpGet("new-releases")]
        public async Task<ActionResult<List<GameCardDto>>> GetNewGamesRelease()
        {
            var newGames = await _gameService.GetNewGamesRelease();
            return Ok(newGames);
        }

        [HttpGet("sale")]
        public async Task<ActionResult<List<GameCardDto>>> GetSaleGames()
        {
            var saleGames = await _gameService.GetSaleGames();
            return Ok(saleGames);
        }

        //[HttpGet("titles")]
        //public async Task<ActionResult<List<string>>> GetAllTitles()
        //{
        //    var titles = await _gameService.GetAllTitles();
        //    return Ok(titles);
        //}
    }
}
