namespace VhyperGamesServer.Models.Dtos
{
    public class RequirementsDto
    {
        public int Id { get; set; }
        public string OS { get; set; }
        public string MinOS { get; set; }
        public string CPU { get; set; }
        public string MinCPU { get; set; }
        public string RAM { get; set; }
        public string MinRAM { get; set; }
        public string GPU { get; set; }
        public string MinGPU { get; set; }
        public int DirectX { get; set; }
        public int MinDirectX { get; set; }
        public string Storage { get; set; }
    }
}
