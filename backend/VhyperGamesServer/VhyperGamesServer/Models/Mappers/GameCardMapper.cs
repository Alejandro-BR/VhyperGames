using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Models.Mappers;


public class GameCardMapper
{
    //Mapper para imagen Catalogo
    public GameCardDto ToDto(Game game, HttpRequest httpRequest = null)
    {
        return new GameCardDto
        {
            Id = game.Id,
            Title = game.Title,
            Stock = game.Stock,
            Price = game.Price,

            //Se obtiene la primera URL de la imagen.La primera debe ser la portada
            ImageUrl = game.ImageGames.FirstOrDefault()?.ImageUrl //Si no existe imagen dará Null
        };
    }
    //Convierte coleccion de objetos Game a objetos GameCardDto
    public IEnumerable<GameCardDto> ToDto(IEnumerable<Game> games, HttpRequest httpRequest = null)
    {
        return games.Select(game => ToDto(game, httpRequest));
    }
}
