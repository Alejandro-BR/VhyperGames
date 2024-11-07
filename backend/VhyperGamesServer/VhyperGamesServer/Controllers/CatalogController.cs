using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly CatalogService _gameService;
        private readonly SmartSearchService _smartSearchService;

        public CatalogController(CatalogService gameService, SmartSearchService smartSearchService)
        {
            _gameService = gameService;
            _smartSearchService = smartSearchService;
        }

        [HttpGet("catalog-search")]
        public async Task<ActionResult<CatalogDto>> Filter([FromQuery] GameFilterDto filter)
        {
            CatalogDto games = await _gameService.FilterAndSortGamesAsync(filter, _smartSearchService);
            return Ok(games);
        }


        [HttpGet("new-releases")]
        public async Task<ActionResult<List<GameCardDto>>> GetNewGamesRelease()
        {
            List<GameCardDto> newGames = await _gameService.GetNewGamesRelease();
            return Ok(newGames);
        }

        [HttpGet("sales")]
        public async Task<ActionResult<List<GameCardDto>>> GetSaleGames()
        {
            List<GameCardDto> saleGames = await _gameService.GetSaleGames();
            return Ok(saleGames);
        }
    }
}
