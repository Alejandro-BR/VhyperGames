using VhyperGamesServer.Models.Database.Entities.Enum;

namespace VhyperGamesServer.Models.Database.Entities;

public class GameRequirements
{
    public int Id { get; set; }
    public string OS { get; set; }
    public string minOS { get; set; }
    public string CPU { get; set; }
    public string minCPU { get; set; }
    public string RAM { get; set; }
    public string minRAM { get; set; }
    public string GPU { get; set; }
    public string minGPU { get; set; }
    public int DirectX { get; set; }
    public int minDirectX { get; set; }
    public string Storage { get; set; }
}