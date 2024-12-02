using VhyperGamesServer.Models.Database.Entities.Enum;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Dtos;

public class AdminFormGameDto
{
    public int Id { get; set; }
    public int GameRequirementsId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Sinopsis { get; set; }
    public Genre Genre { get; set; }
    public Drm DrmFree { get; set; }
    public DateTime ReleaseDate { get; set; }
    public int Price { get; set; }
    public int Stock { get; set; }
    public List<int> ImagesId { get; set; }
}
