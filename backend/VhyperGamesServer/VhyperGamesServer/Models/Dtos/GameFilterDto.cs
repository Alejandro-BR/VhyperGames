using VhyperGamesServer.Models.Database.Entities.Enum;
namespace VhyperGamesServer.Models.Dtos;

public class GameFilterDto
{
    public string SearchText { get; set; }
    public SortCriteria SortCriteria { get; set; }
    public Drm DrmFree { get; set; }
    public Genre Genre { get; set; }
    public int ResultsPerPage { get; set; }
    public int Page { get; set; }

    public GameFilterDto()
    {
        SearchText = null;
        SortCriteria = SortCriteria.AToZ;
        DrmFree = Drm.Todos;
        Genre = Genre.Todos;
        ResultsPerPage = 10;
        Page = 1;
    }
}
