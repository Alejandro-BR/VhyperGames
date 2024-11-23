using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Models.Mappers;

public class ReserveMapper
{
    public ReserveDto ToReserveDto(ReserveDetail reserveDetail)
    {
        return new ReserveDto
        {
            GameId = reserveDetail.GameId,
            Quantity = reserveDetail.Quantity
        };
    }

    public List<ReserveDto> ToListReserveResponseDto(List<ReserveDetail> reserveDetails)
    {
        List<ReserveDto> reserveResponseDtos = new List<ReserveDto>();

        foreach (ReserveDetail reserveDetail in reserveDetails)
        {
            reserveResponseDtos.Add(ToReserveDto(reserveDetail));
        }

        return reserveResponseDtos;
    }

    public ReserveDetailDto ToReserveDetailDto(Game game)
    {
        return new ReserveDetailDto()
        {
            IdGame = game.Id,
            Title = game.Title,
            Price = game.Price,
            ImageGame = game.ImageGames.FirstOrDefault(),
        };
    }

    public List<ReserveDetailDto> ToListReserveDetailDtoDto(List<Game> games)
    {
        List<ReserveDetailDto> reserveDetailDto = new List<ReserveDetailDto>();

        foreach (Game game in games)
        {

            reserveDetailDto.Add(ToReserveDetailDto(game));
        }

        return reserveDetailDto;
    }
}
