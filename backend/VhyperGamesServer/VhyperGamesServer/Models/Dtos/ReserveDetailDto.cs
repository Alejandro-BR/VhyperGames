using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Dtos;

public class ReserveDetailDto
{
    public int IdGame { get; set; }

    public string Title { get; set; }

    public int Price { get; set; }

    public ImageGame ImageGame { get; set; }
}
