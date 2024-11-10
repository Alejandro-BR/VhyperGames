using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Models.Mappers;


public class GameCardMapper
{
    //Mapper para imagen Catalogo
    public GameCardDto ToDto(Game game)
    {
        return new GameCardDto
        {
            Id = game.Id,
            Title = game.Title,
            Stock = game.Stock,
            Price = game.Price,
            AvgRating = game.AvgRating,

            //Se obtiene la primera URL de la imagen.La primera debe ser la portada
            ImageUrl = game.ImageGames.FirstOrDefault()?.ImageUrl //Si no existe imagen dará Null
        };
    }
    //Convierte coleccion de objetos Game a objetos GameCardDto
    public IEnumerable<GameCardDto> ListToDto(IEnumerable<Game> games)
    {
        return games.Select(game => ToDto(game));
    }
}
