using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Entities.Enum;

namespace VhyperGamesServer.Models.Seeder;

public class GameSeeder
{
    private readonly MyDbContext _context;

    public GameSeeder(MyDbContext context)
    {
        _context = context;
    }

    public void Seed()
    {
        Game[] games =
            [
                new Game {
                    Title = "The Witcher III",
                    Description = "Embárcate en una épica aventura de fantasía oscura junto a Geralt de Rivia, un cazador de monstruos en busca de su hija adoptiva en un mundo brutal y fascinante.",
                    Genre = Genre.RPGDeAccion,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2015, 05, 19),
                    Price = 1800,
                    Stock = 100,
                    GameRequirementsId = 2,
                    Sinopsis = "Uno de los RPGs más aclamados de todos los tiempos, ahora listo para una nueva generación.\n\n" +
                    "Eres Geralt de Rivia, cazador de monstruos. En un continente devastado por la guerra e infestado de criaturas, " +
                    "tu misión es encontrar a Ciri, la niña de la profecía, un arma viviente que puede alterar el mundo tal y como lo conocemos.\n\n" +
                    "La Complete Edition incluye el juego base, que ofrece una descomunal aventura en un mundo abierto de más de 100 horas de duración, " +
                    "además de sus dos enormes expansiones de historia: Hearts of Stone y Blood and Wine, ¡con más de 50 horas adicionales de juego!\n\n" +
                    "También incluye nuevo contenido publicado para el juego, junto a nuevos añadidos: objetos inspirados en la serie de Netflix The Witcher como el modo foto, " +
                    "espadas, armaduras y atuendos alternativos, ¡y muchas cosas más!",
                    AvgRating = null,
                    ImageGames = new List<ImageGame>
                    {

                        new ImageGame
                        {
                            ImageUrl = "images/TheWitcher3/thewitcher3.png",
                            AltText = "Banner de The Witcher III"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/TheWitcher3/1.png",
                            AltText = "Imagen 1 de The Witcher III"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/TheWitcher3/2.jpg",
                            AltText = "Imagen 2 de The Witcher III"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/TheWitcher3/3.jpg",
                            AltText = "Imagen 3 de The Witcher III"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/TheWitcher3/4.jpg",
                            AltText = "Imagen 4 de The Witcher III"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/TheWitcher3/5.jpg",
                            AltText = "Imagen 5 de The Witcher III"
                        }

                    }

                },

                new Game {
                    Title = "The Elder Scroll V: Skyrim",
                    Description = "Explora el vasto y helado territorio de Skyrim, donde podrás forjar tu propio camino y destino en una tierra repleta de dragones y magia ancestral.",
                    Genre = Genre.RPGDeAccion,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2011, 11, 11),
                    Price = 3000,
                    Stock = 100,
                    GameRequirementsId = 1,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/Skyrim/skyrim.png",
                            AltText = "Imagen 1 de Skyrim"
                        }
                    }

                },

                new Game {
                    Title = "Resident Evil 2 (remake)",
                    Description = "Sobrevive al horror en Raccoon City mientras te enfrentas a zombis y otros seres aterradores en este clásico de terror y supervivencia.",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2019, 01, 25),
                    Price = 1900,
                    Stock = 100,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/ResidentEvil2/residentevil2.png",
                            AltText = "Imagen 1 de Resident Evil 2"
                        }
                    }
                },

                new Game {
                    Title = "God of War",
                    Description = "Acompaña a Kratos y a su hijo Atreus en una peligrosa odisea por el mundo nórdico, enfrentándose a dioses y monstruos en busca de redención.",
                    Genre = Genre.AventuraAccion,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2018, 04, 20),
                    Price = 4800,
                    Stock = 100,
                    GameRequirementsId = 3,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/GodOfWar/godofwar.png",
                            AltText = "Imagen 1 de God of War"
                        }
                    }
                },

                new Game {
                    Title = "Frostpunk 2",
                    Description = "Lidera una sociedad en el borde de la extinción en un mundo helado, tomando decisiones duras para asegurar la supervivencia de tu gente.",
                    Genre = Genre.Estrategia,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2024, 09, 20),
                    Price = 4000,
                    Stock = 100,
                    GameRequirementsId = 3,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/Frostpunk2/frostpunk2.png",
                            AltText = "Imagen 1 de Frostpunk2"
                        }
                    }
                },

                new Game {
                    Title = "Terraria",
                    Description = "Construye, explora y combate en un colorido mundo 2D lleno de aventuras y posibilidades infinitas para la creatividad.",
                    Genre = Genre.Sandbox,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2011, 05, 16),
                    Price = 880,
                    Stock = 0,
                    GameRequirementsId = 1,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/Terraria/terraria.png",
                            AltText = "Imagen 1 de Terraria"
                        }
                    }
                },

                new Game {
                    Title = "Spore",
                    Description = "Diseña y guía la evolución de una especie desde sus comienzos como una simple célula hasta la conquista del espacio.",
                    Genre = Genre.Simulacion,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2008, 09, 07),
                    Price = 150,
                    Stock = 100,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/Spore/spore.png",
                            AltText = "Imagen 1 de Spore"
                        }
                    }
                },

                new Game {
                    Title = "GRIS",
                    Description = "Acompaña a Gris en un viaje emocional a través de un hermoso mundo en constante cambio, donde cada color y forma refleja su crecimiento y sanación.",
                    Genre = Genre.Plataforma,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2018, 10, 13),
                    Price = 265,
                    Stock = 100,
                    GameRequirementsId = 1,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/GRIS/gris.png",
                            AltText = "Imagen 1 de GRIS"
                        }
                    }
                },

                new Game {
                    Title = "Cyberpunk 2077",
                    Description = "Sumérgete en la futurista ciudad de Night City, donde tomas decisiones que pueden cambiar tu vida y la de los demás en un mundo de implantes cibernéticos y corrupción.",
                    Genre = Genre.RPGDeAccion,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2020, 12, 10),
                    Price = 5700,
                    Stock = 100,
                    GameRequirementsId = 3,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/Cyberpunk/cyberpunk.png",
                            AltText = "Imagen 1 de Cyberpunk"
                        }
                    }
                },

                new Game {
                    Title = "Epic Mickey",
                    Description = "Vive una aventura mágica en el papel de Mickey Mouse mientras exploras un mundo oscuro y retorcido lleno de personajes olvidados de Disney.",
                    Genre = Genre.Plataforma,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2010, 11, 25),
                    Price = 5100,
                    Stock = 100,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/EpicMickey/epicmickey.png",
                            AltText = "Imagen 1 de Epic Mickey"
                        }
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's",
                    Description = "¡Bienvenido a su nuevo trabajo de verano en Freddy Fazbear's Pizza, donde los niños y los padres vienen para el entretenimiento y la comida hasta donde alcanza la vista! ",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2014, 8, 8),
                    Price = 399,
                    Stock = 100,
                    GameRequirementsId = 1,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys/Freddy1.png",
                            AltText = "Imagen 1 de fnaf1"
                        }
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's 2",
                    Description = "¡Bienvenido de nuevo a la nueva y mejorada pizza de Freddy Fazbear!",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2014, 11, 10),
                    Price = 799,
                    Stock = 100,
                    GameRequirementsId = 1,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys2/Freddy2.png",
                            AltText = "Imagen 1 de fnaf2"
                        }
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's 3",
                    Description = "Treinta años después de que Freddy Fazbear's Pizza cerrara sus puertas, los eventos que tuvieron lugar allí se han convertido en nada más que un rumor y un recuerdo de la infancia, pero los propietarios de \"Fazbear's Fright: The Horror Attraction\"",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2015, 3, 2),
                    Price = 799,
                    Stock = 100,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys3/Freddy3.png",
                            AltText = "Imagen 1 de fnaf3"
                        }
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's 4",
                    Description = "Esta vez, el terror te ha seguido a casa.",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2015, 7, 23),
                    Price = 799,
                    Stock = 10,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys4/Freddy4.png",
                            AltText = "Imagen 1 de fnaf4"
                        }
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's: Sister Location",
                    Description = "¡Bienvenido a Circus Baby's Pizza World, donde la diversión familiar y la interactividad van más allá de todo lo que has visto en esas *otras* pizzerías!",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2016, 10, 7),
                    Price = 799,
                    Stock = 10,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys5/Freddy5.png",
                            AltText = "Imagen 1 de fnaf5"
                        }
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's: World",
                    Description = "¡Con todo el elenco de la serie Five Nights at Freddy's, este RPG de fantasía permitirá a los jugadores controlar sus animatrónicos favoritos en una aventura animada épica!",
                    Genre = Genre.RPGDeAccion,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2016, 1, 21),
                    Price = 1,
                    Stock = 999999,
                    GameRequirementsId = 1,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysWorld/FreddyWorld.png",
                            AltText = "Imagen 1 de fnaf World"
                        }
                    }
                },

                 new Game {
                    Title = "Freddy Fazbear's Pizzeria Simulator",
                    Description = "¡Presentando un divertido Five Nights en la aventura de Freddy con un toque más ligero para las vacaciones, Freddy Fazbear's Pizzeria Simulator te pone a cargo de desarrollar tu propio restaurante!",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2017, 12, 4),
                    Price = 1,
                    Stock = 999999,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys6/Freddy6.png",
                            AltText = "Imagen 1 de fnaf 6"
                        }
                    }
                },

                new Game {
                    Title = "Ultimate Custom Night",
                    Description = "¡Bienvenido al último mashup de FNAF, donde una vez más quedarás atrapado solo en una oficina defendiéndote de los animatrónicos asesinos!",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2018, 6, 27),
                    Price = 1,
                    Stock = 999999,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys7/Freddy7.png",
                            AltText = "Imagen 1 de fnaf ucn"
                        }
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's: Help Wanted",
                    Description = "FIVE NIGHTS AT FREDDY'S: HELP WANTED es una colección de minijuegos clásicos y originales ambientados en el universo Five Nights.",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.Drm,
                    ReleaseDate = new DateTime (2019, 5, 28),
                    Price = 2499,
                    Stock = 99,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted/FreddyHelpWanted.png",
                            AltText = "Imagen 1 de fnaf Help Wanted"
                        }
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's: Security Breach",
                    Description = "EL SIGUIENTE CAPÍTULO DEL HORROR",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.Drm,
                    ReleaseDate = new DateTime (2022, 11, 22),
                    Price = 3399,
                    Stock = 10,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysSecurityBreach/FreddySecurityBreach.png",
                            AltText = "Imagen 1 de fnaf security breach"
                        }
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's: Help Wanted 2",
                    Description = "¡Descubre si tienes lo que hace falta para ser una Superstar de Fazbear!",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.Drm,
                    ReleaseDate = new DateTime (2023, 12, 14),
                    Price = 3899,
                    Stock = 16,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted2/FreddyHelpWanted2.png",
                            AltText = "Imagen 1 de fnaf help wanted 2"
                        }
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's: Into the Pit",
                    Description = "Sobrevive cinco noches de terror en este escalofriante juego de aventuras.",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.Drm,
                    ReleaseDate = new DateTime (2024, 8, 7),
                    Price = 1950,
                    Stock = 100,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysIntoThePit/FreddyIntoThePit.png",
                            AltText = "Imagen 1 de fnaf Into the pit"
                        }
                    }
                },

                new Game {
                    Title = "Resident Evil: Biohazard",
                    Description = "Enfrenta horrores y misterios en la mansión de los Baker en este clásico survival horror.",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime(2023, 3, 15),
                    Price = 2990,
                    Stock = 150,
                    GameRequirementsId = 3,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/ResidentEvilBiohazard/Biohazard.png",
                            AltText = "Imagen 1 de Resident Evil Biohazard"
                        }
                    }
                },

                new Game {
                    Title = "Hades",
                    Description = "Escapa del inframundo en este galardonado roguelike cargado de acción y mitología griega.",
                    Genre = Genre.AventuraAccion,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime(2020, 9, 17),
                    Price = 1790,
                    Stock = 200,
                    GameRequirementsId = 1,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/Hades/Hades.png",
                            AltText = "Imagen 1 de Hades"
                        }
                    }
                },

                new Game {
                    Title = "Celeste",
                    Description = "Una aventura de plataformas que te desafía a superar obstáculos mientras ayudas a Madeline a escalar la montaña.",
                    Genre = Genre.Plataforma,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime(2018, 1, 25),
                    Price = 1590,
                    Stock = 0,
                    GameRequirementsId = 1,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/Celeste/Celeste.png",
                            AltText = "Imagen 1 de Celeste"
                        }
                    }
                },

                new Game {
                    Title = "Dark Souls III",
                    Description = "Enfrenta enemigos desafiantes y jefes épicos en este oscuro juego de rol de acción.",
                    Genre = Genre.RPGDeAccion,
                    DrmFree = Drm.Drm,
                    ReleaseDate = new DateTime(2016, 4, 12),
                    Price = 2790,
                    Stock = 80,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/DarkSoulsIII/DarkSoulsIII.png",
                            AltText = "Imagen 1 de Dark Souls III"
                        }
                    }
                },

                new Game {
                    Title = "Stardew Valley",
                    Description = "Construye tu granja y conéctate con los personajes en este relajante juego de simulación.",
                    Genre = Genre.Simulacion,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime(2016, 2, 26),
                    Price = 1490,
                    Stock = 220,
                    GameRequirementsId = 1,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/StardewValley/StardewValley.png",
                            AltText = "Imagen 1 de Stardew Valley"
                        }
                    }
                },

                new Game {
                    Title = "DOOM Eternal",
                    Description = "Ábrete camino a través del infierno en este frenético y brutal shooter en primera persona.",
                    Genre = Genre.AventuraAccion,
                    DrmFree = Drm.Drm,
                    ReleaseDate = new DateTime(2020, 3, 20),
                    Price = 3590,
                    Stock = 110,
                    GameRequirementsId = 3,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/DOOMEternal/DOOMEternal.png",
                            AltText = "Imagen 1 de DOOM Eternal"
                        }
                    }
                },

                new Game {
                    Title = "Hollow Knight",
                    Description = "Explora un vasto mundo subterráneo lleno de desafíos y criaturas en este aclamado juego de plataformas y aventuras.",
                    Genre = Genre.Plataforma,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime(2017, 2, 24),
                    Price = 1250,
                    Stock = 180,
                    GameRequirementsId = 2,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/HollowKnight/HollowKnight.png",
                            AltText = "Imagen 1 de Hollow Knight"
                        }
                    }
                },

                new Game {
                    Title = "Minecraft",
                    Description = "Explora y construye en un vasto mundo de bloques, lleno de aventuras y creatividad sin límites.",
                    Genre = Genre.Sandbox,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime(2011, 11, 18),
                    Price = 2490,
                    Stock = 500,
                    GameRequirementsId = 1,
                    Sinopsis = "Explora mundos generados aleatoriamente y construye cosas maravillosas, desde una simple casa hasta un fastuoso castillo. Juega en modo creativo con recursos ilimitados o excava hasta las profundidades del mundo en el modo supervivencia y fabrica armas y armaduras para defenderte de peligrosas criaturas. Escala escarpadas montañas, descubre intrincadas cuevas y excava grandes vetas de minerales. Descubre los biomas de cuevas frondosas y cuevas de espeleotema. ¡Llena de luz tu mundo con velas para demostrar que eres un espeleólogo profesional y un maestro de la montaña!\r\n",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/Minecraft/Minecraft.png",
                            AltText = "Imagen portada de Minecraft "
                        },

                        new ImageGame {
                            ImageUrl = "images/Minecraft/1.png",
                            AltText = "Imagen 1 de Minecraft"
                        },

                        new ImageGame {
                            ImageUrl = "images/Minecraft/2.png",
                            AltText = "Imagen 2 de Minecraft"
                        },

                        new ImageGame {
                            ImageUrl = "images/Minecraft/3.png",
                            AltText = "Imagen 3 de Minecraft"
                        },

                        new ImageGame {
                            ImageUrl = "images/Minecraft/4.png",
                            AltText = "Imagen 4 de Minecraft"
                        },

                        new ImageGame {
                            ImageUrl = "images/Minecraft/5.png",
                            AltText = "Imagen 5 de Minecraft"
                        },

                        new ImageGame {
                            ImageUrl = "images/Minecraft/6.png",
                            AltText = "Imagen 6 de Minecraft"
                        },

                        new ImageGame {
                            ImageUrl = "images/Minecraft/7.png",
                            AltText = "Imagen 7 de Minecraft"
                        },
                    }
                },

                new Game {
                    Title = "God of War: Ragnarok",
                    Description = "Acompaña a Kratos y Atreus en su épica aventura para enfrentar el fin de los dioses nórdicos.",
                    Genre = Genre.AventuraAccion,
                    DrmFree = Drm.Drm,
                    ReleaseDate = new DateTime(2024, 09, 19),
                    Price = 5990,
                    Stock = 150,
                    GameRequirementsId = 3,
                    Sinopsis = "En God of War Ragnarök, la secuela del aclamado God of War (2018), el Fimbulvetr está en marcha. Kratos y Atreus deben viajar a cada uno de los Nueve Reinos en busca de respuestas mientras las fuerzas asgardianas de Odín se preparan para la batalla profetizada que supondrá el fin del mundo.\r\n\r\nPor el camino, explorarán paisajes míticos increíbles y se enfrentarán a temibles enemigos, como monstruos y dioses nórdicos. A medida que se avecina la amenaza del Ragnarök, Kratos y Atreus tendrán que elegir entre la seguridad de su familia y la de los reinos.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/GodOfWarRagnarok/Ragnarok.png",
                            AltText = "Imagen 1 de God of War Ragnarok"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/GodOfWarRagnarok/1.png",
                            AltText = "Imagen 1 de God of War Ragnarok"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/GodOfWarRagnarok/2.png",
                            AltText = "Imagen 2 de God of War Ragnarok"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/GodOfWarRagnarok/3.png",
                            AltText = "Imagen 3 de God of War Ragnarok"
                        }
                    }
                },

                new Game {
                    Title = "Dragon Ball Sparking Zero",
                    Description = "Experimenta combates épicos en el universo de Dragon Ball, con gráficos mejorados y acción intensa.",
                    Genre = Genre.AventuraAccion,
                    DrmFree = Drm.Drm,
                    ReleaseDate = new DateTime(2024, 10, 15),
                    Price = 6999,
                    Stock = 200,
                    GameRequirementsId = 2,
                    Sinopsis = "DRAGON BALL: Sparking! ZERO lleva a un nuevo nivel el legendario estilo de juego de la serie Budokai Tenkaichi. Conviértete en un superguerrero y disfruta de los poderosos combates de Dragon Ball, ¡que hacen temblar la tierra y superan todos los límites!\r\nLibera el poder de más de 180 combatientes de Dragon Ball Z, Dragon Ball SUPER, Dragon Ball GT y algunas películas de Dragon Ball, ¡todos incluidos en el juego base! Cada personaje tiene sus habilidades, transformaciones y técnicas propias.\r\n¡Domina el poder destructivo de los luchadores más fuertes que han aparecido en Dragon Ball!",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/DragonBallSparkingZero/SparkingZero.png",
                            AltText = "Imagen 1 de Dragon Ball Sparking Zero"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/DragonBallSparkingZero/1.png",
                            AltText = "Imagen 1 de Dragon Ball Sparking Zero"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/DragonBallSparkingZero/2.png",
                            AltText = "Imagen 2 de Dragon Ball Sparking Zero"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/DragonBallSparkingZero/3.png",
                            AltText = "Imagen 3 de Dragon Ball Sparking Zero"
                        },
                    }
                },

                new Game {
                    Title = "Baldur's Gate 3",
                    Description = "Embárcate en una épica aventura de rol en un mundo de fantasía donde tus decisiones influyen en el destino del mundo y en el de tus compañeros.",
                    Genre = Genre.RPGDeAccion,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime(2023, 8, 3),
                    Price = 6999,
                    Stock = 120,
                    GameRequirementsId = 3,
                    Sinopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/BaldursGate3/BaldursGate3.png",
                            AltText = "Imagen de Baldur's Gate 3"
                        }
                    }
                },
            ];

        _context.Games.AddRange(games);
        _context.SaveChanges();
    }
}
