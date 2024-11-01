namespace VhyperGamesServer.Models.Dtos;

public class GameFilterDto
{
    public string SearchText { get; set; }
    public string SortCriteria { get; set; }
    public bool? DrmFree { get; set; }
    public string Genre { get; set; }
    public int ResultsPerPage { get; set; }
    public int Page { get; set; }

    public GameFilterDto()
    {
        SearchText = null;
        SortCriteria = null;
        DrmFree = null;
        Genre = null;
        ResultsPerPage = 10;
        Page = 1;
    }
}
