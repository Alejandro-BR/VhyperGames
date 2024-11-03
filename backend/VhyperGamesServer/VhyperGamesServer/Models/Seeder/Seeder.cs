﻿using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Seeder;

public class Seeder
{
    private readonly MyDbContext _context;

    public Seeder (MyDbContext context)
    {
        _context = context;
    }

    public void Seed()
    {
        Game[] games =
            [
                new Game {
                    GameCode = Guid.NewGuid (),
                    Title = "The Witcher III",
                    Description = "Embárcate en una épica aventura de fantasía oscura junto a Geralt de Rivia, un cazador de monstruos en busca de su hija adoptiva en un mundo brutal y fascinante.",
                    Genre = "RPG de Acción",
                    DrmFree = true,
                    ReleaseDate = new DateTime (2015, 05, 19),
                    Price = 18,
                    Stock = 100,
                },

                new Game {
                    GameCode = Guid.NewGuid (),
                    Title = "The Elder Scroll V: Skyrim",
                    Description = "Explora el vasto y helado territorio de Skyrim, donde podrás forjar tu propio camino y destino en una tierra repleta de dragones y magia ancestral.",
                    Genre = "RPG de Acción",
                    DrmFree = true,
                    ReleaseDate = new DateTime (2011, 11, 11),
                    Price = 30,
                    Stock = 100,
                },

                new Game {
                    GameCode = Guid.NewGuid (),
                    Title = "Resident Evil 2 (remake)",
                    Description = "Sobrevive al horror en Raccoon City mientras te enfrentas a zombis y otros seres aterradores en este clásico de terror y supervivencia.",
                    Genre = "Survival horror",
                    DrmFree = true,
                    ReleaseDate = new DateTime (2019, 01, 25),
                    Price = 19,
                    Stock = 100,
                },

                new Game {
                    GameCode = Guid.NewGuid (),
                    Title = "God of War",
                    Description = "Acompaña a Kratos y a su hijo Atreus en una peligrosa odisea por el mundo nórdico, enfrentándose a dioses y monstruos en busca de redención.",
                    Genre = "Aventura-Acción",
                    DrmFree = true,
                    ReleaseDate = new DateTime (2018, 04, 20),
                    Price = 48,
                    Stock = 100,
                },

                new Game {
                    GameCode = Guid.NewGuid (),
                    Title = "Frostpunk 2",
                    Description = "Lidera una sociedad en el borde de la extinción en un mundo helado, tomando decisiones duras para asegurar la supervivencia de tu gente.",
                    Genre = "Estrategia",
                    DrmFree = true,
                    ReleaseDate = new DateTime (2024, 09, 20),
                    Price = 40,
                    Stock = 100,
                },

                new Game {
                    GameCode = Guid.NewGuid (),
                    Title = "Terraria",
                    Description = "Construye, explora y combate en un colorido mundo 2D lleno de aventuras y posibilidades infinitas para la creatividad.",
                    Genre = "Sandbox",
                    DrmFree = true,
                    ReleaseDate = new DateTime (2011, 05, 16),
                    Price = 8.8m,
                    Stock = 100,
                },

                new Game {
                    GameCode = Guid.NewGuid (),
                    Title = "Spore",
                    Description = "Diseña y guía la evolución de una especie desde sus comienzos como una simple célula hasta la conquista del espacio.",
                    Genre = "Simulación",
                    DrmFree = true,
                    ReleaseDate = new DateTime (2008, 09, 07),
                    Price = 15,
                    Stock = 100,
                },

                new Game {
                    GameCode = Guid.NewGuid (),
                    Title = "GRIS",
                    Description = "Acompaña a Gris en un viaje emocional a través de un hermoso mundo en constante cambio, donde cada color y forma refleja su crecimiento y sanación.",
                    Genre = "Plataforma",
                    DrmFree = true,
                    ReleaseDate = new DateTime (2018, 10, 13),
                    Price = 2.65m,
                    Stock = 100,
                },

                new Game {
                    GameCode = Guid.NewGuid (),
                    Title = "Cyberpunk 2077",
                    Description = "Sumérgete en la futurista ciudad de Night City, donde tomas decisiones que pueden cambiar tu vida y la de los demás en un mundo de implantes cibernéticos y corrupción.",
                    Genre = "RPG de Acción",
                    DrmFree = true,
                    ReleaseDate = new DateTime (2020, 12, 10),
                    Price = 57,
                    Stock = 100,
                },

                new Game {
                    GameCode = Guid.NewGuid (),
                    Title = "Epic Mickey",
                    Description = "Vive una aventura mágica en el papel de Mickey Mouse mientras exploras un mundo oscuro y retorcido lleno de personajes olvidados de Disney.",
                    Genre = "Plataforma",
                    DrmFree = true,
                    ReleaseDate = new DateTime (2010, 11, 25),
                    Price = 51,
                    Stock = 100,
                }
            ];

        _context.Games.AddRange(games);
        _context.SaveChanges();
    }
}