using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Seeder;

public class GameRequirementsSeeder
{
    private readonly MyDbContext _context;

    public GameRequirementsSeeder(MyDbContext context)
    {
        _context = context;
    }

    public void Seed()
    {
        if (!_context.GameRequirements.Any())
        {
            var requirements = new GameRequirements[]
            {
                new GameRequirements {
                    Id = 1,
                    OS = "Windows 10",
                    MinOS = "Windows 7",
                    CPU = "Intel Core i3-2100",
                    MinCPU = "Intel Core 2 Duo E8400",
                    RAM = "4 GB",
                    MinRAM = "2 GB",
                    GPU = "NVIDIA GeForce GTX 650",
                    MinGPU = "Intel HD Graphics 3000",
                    DirectX = 11,
                    MinDirectX = 9,
                    Storage = "15 GB"
                },
                new GameRequirements {
                    Id = 2,
                    OS = "Windows 10",
                    MinOS = "Windows 10",
                    CPU = "Intel Core i5-8400",
                    MinCPU = "Intel Core i3-6100",
                    RAM = "16 GB",
                    MinRAM = "8 GB",
                    GPU = "NVIDIA GeForce GTX 1060",
                    MinGPU = "NVIDIA GeForce GTX 750 Ti",
                    DirectX = 12,
                    MinDirectX = 11,
                    Storage = "40 GB"
                },
                new GameRequirements {
                    Id = 3,
                    OS = "Windows 11",
                    MinOS = "Windows 10",
                    CPU = "Intel Core i7-9700K",
                    MinCPU = "Intel Core i5-8600K",
                    RAM = "32 GB",
                    MinRAM = "16 GB",
                    GPU = "NVIDIA GeForce RTX 2070",
                    MinGPU = "NVIDIA GeForce GTX 1060",
                    DirectX = 12,
                    MinDirectX = 11,
                    Storage = "100 GB"
                }
            };

            _context.GameRequirements.AddRange(requirements);
            _context.SaveChanges();
        }
    }
}
