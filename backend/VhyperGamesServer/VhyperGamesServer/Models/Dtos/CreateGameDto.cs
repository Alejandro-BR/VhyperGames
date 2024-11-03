namespace VhyperGamesServer.Models.Dtos
{
    public class CreateGameDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Genre { get; set; }
        public bool DrmFree { get; set; }
        public DateTime ReleaseDate { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}
