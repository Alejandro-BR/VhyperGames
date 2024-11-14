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
                    Sinopsis = "La atracción principal es Freddy Fazbear, por supuesto; y sus dos amigos. ¡Son robots animatrónicos, programados para complacer a las multitudes! Sin embargo, el comportamiento de los robots se ha vuelto algo impredecible por la noche, y era mucho más barato contratarlo como guardia de seguridad que encontrar un reparador.\r\n\r\nDesde su pequeña oficina debe mirar las cámaras de seguridad con cuidado. Tiene una cantidad muy limitada de electricidad que puede usar por noche (recortes presupuestarios corporativos, ya sabe). Eso significa que cuando te quedas sin energía para la noche, ¡no más puertas de seguridad ni más luces! Si algo no está bien, es decir, si Freddybear o sus amigos no están en sus lugares adecuados, ¡debes encontrarlos en los monitores y protegerte si es necesario!\r\n\r\n¿Puedes sobrevivir cinco noches en Freddy's?\r\n",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys/Freddy1.png",
                            AltText = "Imagen 1 de fnaf1"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys/fnaf1-1.jpg",
                            AltText = "Imagen 2 de fnaf1"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys/fnaf1-2.jpg",
                            AltText = "Imagen 3 de fnaf1"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys/fnaf1-3.jpg",
                            AltText = "Imagen 4 de fnaf1"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys/fnaf1-4.jpg",
                            AltText = "Imagen 5 de fnaf1"
                        },
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's 2",
                    Description = "¡Bienvenido de nuevo a la nueva y mejorada pizzeria de Freddy Fazbear!",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2014, 11, 10),
                    Price = 799,
                    Stock = 100,
                    GameRequirementsId = 1,
                    Sinopsis = "En Five Nights at Freddy's 2, los animatrónicos antiguos y viejos se unen a un nuevo elenco de personajes. ¡Son amigables para los niños, actualizados con lo último en tecnología de reconocimiento facial, vinculados a bases de datos criminales locales y prometen ofrecer un espectáculo seguro y entretenido para niños y adultos por igual!\r\n\r\n¿Qué podría salir mal?\r\n\r\nComo el nuevo guardia de seguridad que trabaja por las noches, su trabajo es monitorear las cámaras y asegurarse de que nada salga mal después de las horas. El guardia anterior se ha quejado de los personajes que intentan ingresar a la oficina (desde entonces ha sido trasladado al turno de día). Entonces, para facilitar su trabajo, se le ha proporcionado su propia cabeza vacía de Freddy Fazbear, lo que debería engañar a los personajes animatrónicos para que lo dejen solo si ingresan accidentalmente a su oficina.\r\n\r\nComo siempre, Fazbear Entertainment no es responsable de la muerte o el desmembramiento.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys2/Freddy2.png",
                            AltText = "Imagen 1 de fnaf2"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys2/fnaf2-1.jpg",
                            AltText = "Imagen 2 de fnaf2"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys2/fnaf2-2.jpg",
                            AltText = "Imagen 3 de fnaf2"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys2/fnaf2-3.jpg",
                            AltText = "Imagen 4 de fnaf2"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys2/fnaf2-4.jpg",
                            AltText = "Imagen 5 de fnaf2"
                        },
                    }
                },

                new Game {
                    Title = "Five Nights at Freddy's 3",
                    Description = "Treinta años después de que Freddy Fazbear's Pizza cerrara sus puertas, los eventos que tuvieron lugar allí se han convertido en nada más que un rumor y un recuerdo de la infancia",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2015, 3, 2),
                    Price = 799,
                    Stock = 100,
                    GameRequirementsId = 1,
                    Sinopsis = "pero los propietarios de \"Fazbear's Fright: The Horror Attraction\" están decididos a revivir la leyenda y hacer que la experiencia sea lo más auténtica posible para los clientes haciendo todo lo posible para encontrar cualquier cosa que pueda haber sobrevivido a décadas de negligencia y ruina.\r\n\r\nAl principio solo había conchas vacías, una mano, un gancho, una vieja muñeca de papel, pero luego se hizo un descubrimiento notable...\r\n\r\nLa atracción ahora tiene un animatrónico.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys3/Freddy3.png",
                            AltText = "Imagen 1 de fnaf3"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys3/fnaf3-1.jpg",
                            AltText = "Imagen 2 de fnaf3"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys3/fnaf3-2.jpg",
                            AltText = "Imagen 3 de fnaf3"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys3/fnaf3-3.jpg",
                            AltText = "Imagen 4 de fnaf3"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys3/fnaf3-4.jpg",
                            AltText = "Imagen 5 de fnaf3"
                        },
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
                    GameRequirementsId = 1,
                    Sinopsis = "En este último capítulo de la historia original de Five Nights at Freddy, debes defenderte una vez más contra Freddy Fazbear, Chica, Bonnie, Foxy e incluso cosas peores que acechan en las sombras. Jugando como un niño cuyo papel aún se desconoce, debe protegerse hasta las 6 am observando las puertas, así como evitando criaturas no deseadas que pueden aventurarse en su armario o en la cama detrás de usted.\r\n\r\nSolo tienes una linterna para protegerte. Asustará las cosas que pueden estar arrastrándose en el otro extremo de los pasillos, pero tenga cuidado y escuche. Si algo se ha acercado demasiado, entonces las luces brillantes en sus ojos serán tu fin.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys4/Freddy4.png",
                            AltText = "Imagen 1 de fnaf4"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys4/fnaf4-1.jpg",
                            AltText = "Imagen 2 de fnaf4"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys4/fnaf4-2.jpg",
                            AltText = "Imagen 3 de fnaf4"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys4/fnaf4-3.jpg",
                            AltText = "Imagen 4 de fnaf4"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys4/fnaf4-4.jpg",
                            AltText = "Imagen 5 de fnaf4"
                        },
                    },
                },

                new Game {
                    Title = "Five Nights at Freddy's: Sister Location",
                    Description = "¡Bienvenido a Circus Baby's Pizza World, donde la diversión familiar y la interactividad van más allá de todo lo que has visto en esas *otras* pizzerías!",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2016, 10, 7),
                    Price = 799,
                    Stock = 10,
                    GameRequirementsId = 1,
                    Sinopsis = "¡Con artistas animatrónicos de vanguardia que se quitarán los calcetines de sus hijos, así como un catering de pizza personalizado, ninguna fiesta está completa sin Circus Baby y la pandilla!\r\n\r\nAhora contratando: Técnico nocturno. Debe disfrutar de espacios reducidos y sentirse cómodo con la maquinaria activa. No es responsable de la muerte o desmembramiento.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys5/Freddy5.png",
                            AltText = "Imagen 1 de fnaf5"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys5/fnaf5-1.jpg",
                            AltText = "Imagen 2 de fnaf5"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys5/fnaf5-2.jpg",
                            AltText = "Imagen 3 de fnaf5"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys5/fnaf5-3.jpg",
                            AltText = "Imagen 4 de fnaf5"
                        },

                         new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys5/fnaf5-4.jpg",
                            AltText = "Imagen 5 de fnaf5"
                        },
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
                    Sinopsis = "En un universo, donde todos los personajes animatrónicos de las primeras cuatro entregas habitan pacíficamente, están ocurriendo una serie de fallas en \"Flipside\", una dimensión interna del universo, causando inquietud entre los animatrónicos.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysWorld/FreddyWorld.png",
                            AltText = "Imagen 1 de fnaf World"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysWorld/fnafWorld-1.jpg",
                            AltText = "Imagen 2 de fnaf World"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysWorld/fnafWorld-2.jpg",
                            AltText = "Imagen 3 de fnaf World"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysWorld/fnafWorld-3.jpg",
                            AltText = "Imagen 4 de fnaf World"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysWorld/fnafWorld-4.jpg",
                            AltText = "Imagen 5 de fnaf World"
                        },
                    }
                },

                 new Game {
                    Title = "Freddy Fazbear's Pizzeria Simulator",
                    Description = "¡Presentando un divertido Five Nights en la aventura de Freddy con un toque más ligero para las vacaciones!",
                    Genre = Genre.SurvivalHorror,
                    DrmFree = Drm.DrmFree,
                    ReleaseDate = new DateTime (2017, 12, 4),
                    Price = 1,
                    Stock = 999999,
                    GameRequirementsId = 1,
                    Sinopsis = "¡Freddy Fazbear's Pizzeria Simulator te pone a cargo de desarrollar tu propio restaurante! ¡Diseñe pizzas, alimente a los niños y obtenga puntajes altos!",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys6/Freddy6.png",
                            AltText = "Imagen 1 de fnaf 6"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys6/fnaf6-1.jpg",
                            AltText = "Imagen 2 de fnaf 6"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys6/fnaf6-2.jpg",
                            AltText = "Imagen 3 de fnaf 6"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys6/fnaf6-3.jpg",
                            AltText = "Imagen 4 de fnaf 6"
                        },
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
                    GameRequirementsId = 1,
                    Sinopsis = "Con 50 personajes animatrónicos seleccionables que abarcan siete Five Nights en los juegos de Freddy, las opciones de personalización son casi infinitas. ¡Mezcle y combine cualquier variedad de personajes que desee, establezca su dificultad de 0-20 y luego salte directamente a la acción! Desde el escritorio de su oficina, deberá administrar dos puertas laterales, dos respiraderos y dos mangueras de aire, todas las cuales conducen directamente a su oficina.\r\n\r\nEsta vez también tendrá que dominar otras herramientas si desea completar los desafíos finales, herramientas como el calentador, A/C, una caja de música global, un generador de energía y más. ¡Como si todo eso no fuera suficiente, también tendrá que configurar trampas láser en los respiraderos, recoger Faz-Coins, comprar artículos en el mostrador de premios, y como siempre, mantener un ojo de cerca no uno, sino dos, cortinas Pirate Cove!",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys7/Freddy7.png",
                            AltText = "Imagen 1 de fnaf ucn"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys7/fnaf7-1.jpg",
                            AltText = "Imagen 2 de fnaf 7"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys7/fnaf7-2.jpg",
                            AltText = "Imagen 3 de fnaf 7"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys7/fnaf7-3.jpg",
                            AltText = "Imagen 4 de fnaf 7"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddys7/fnaf7-4.jpg",
                            AltText = "Imagen 5 de fnaf 7"
                        },
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
                    GameRequirementsId = 3,
                    Sinopsis = "Sobrevive a encuentros terroríficos con tus animatrónicos asesinos favoritos en una colección de experiencias nuevas y clásicas de FIVE NIGHTS AT FREDDYidsS™. “¡Donde la fantasía y la diversión cobran vida!”\r\n\r\nNO se requiere un auricular VR para jugar.\r\n\r\nUSTED ES CONTRATADO - Es hora de ensuciarse las manos. Repare los sistemas de ventilación claustrofóbicos, solucione problemas de animatrónicos rotos que podrían activarse en cualquier momento o pase las tardes encogiéndose en la oficina de guardia de seguridad nocturna.\r\nCELEBRAR - Enfréntate a tus animatrónicos asesinos favoritos, incluyendo; Freddy, Bonnie, Chica, Foxy, Springtrap, The Mangle, Funtime Foxy y Circus Baby.\r\nDIVERSIÓN DIVERSIÓN PREMIOS ¡Juguetes, peluches, Bobbleheads y dulces dulces! ¡Gana premios súper divertidos con los que puedas jugar en el Contador de Premios interactivo! Recoge Faz-Tokens bien ocultos para desbloquear coleccionables aún más raros para más SUPER FUN FUN FUN.\r\nFIESTA DE PIZZA - Las escenas de los títulos clásicos se han actualizado y rehecho para una experiencia totalmente inmersiva que incluye; Five Nights at Freddydids, Five Nights at Freddydids 2, Five Nights at Freddydids 3, Five Nights at Freddydids 4 y Five Nights at Freddydids: Sister Location.\r\nDOS FORMAS DE JUGAR - Experimente el horror en modo plano (no VR) o VR. Oculus Rift y HTC Vive son compatibles.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted/FreddyHelpWanted.png",
                            AltText = "Imagen 1 de fnaf Help Wanted"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted/fnafHW-1.jpg",
                            AltText = "Imagen 2 de fnaf Help Wanted"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted/fnafHW-2.jpg",
                            AltText = "Imagen 3 de fnaf Help Wanted"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted/fnafHW-3.jpg",
                            AltText = "Imagen 4 de fnaf Help Wanted"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted/fnafHW-4.jpg",
                            AltText = "Imagen 5 de fnaf Help Wanted"
                        },
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
                    GameRequirementsId = 3,
                    Sinopsis = "Five Nights at Freddy's: Security Breach es la última entrega de la saga de juegos de terror para toda la familia que ha cautivado a millones de jugadores en todo el mundo. Juega con Gregory, un joven que pasa la noche atrapado en Freddy Fazbear's Mega Pizzaplex. Con la ayuda del mismísimo Freddy Fazbear, Gregory debe sobrevivir a la inagotable cacería de las nuevas versiones de los personajes de Five Nights at Freddy's y a una serie de amenazas igualmente terroríficas.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysSecurityBreach/FreddySecurityBreach.png",
                            AltText = "Imagen 1 de fnaf security breach"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysSecurityBreach/fnafSB-1.jpg",
                            AltText = "Imagen 2 de fnaf security breach"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysSecurityBreach/fnafSB-2.jpg",
                            AltText = "Imagen 3 de fnaf security breach"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysSecurityBreach/fnafSB-3.jpg",
                            AltText = "Imagen 3 de fnaf security breach"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysSecurityBreach/fnafSB-4.jpg",
                            AltText = "Imagen 4 de fnaf security breach"
                        },
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
                    GameRequirementsId = 3,
                    Sinopsis = "Five Nights at Freddy’s: Help Wanted 2 es la secuela de la terrorífica experiencia de RV que ha dado nueva vida a la icónica franquicia de miedo. Como nuevo miembro del personal Fazbear, tendrás que demostrar que puedes destacar en todos los aspectos administrativos y de mantenimiento de la pizzería.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted2/FreddyHelpWanted2.png",
                            AltText = "Imagen 1 de fnaf help wanted 2"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted2/fnafHW2-1.jpg",
                            AltText = "Imagen 2 de fnaf help wanted 2"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted2/fnafHW2-2.jpg",
                            AltText = "Imagen 3 de fnaf help wanted 2"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted2/fnafHW2-3.jpg",
                            AltText = "Imagen 4 de fnaf help wanted 2"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysHelpWanted2/fnafHW2-4.jpg",
                            AltText = "Imagen 5 de fnaf help wanted 2"
                        },
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
                    Sinopsis = "Salta al pozo y sumérgete en un nuevo capítulo en el universo de Five Nights at Freddy's. Oswald deseaba que su ciudad, y su vida, no fueran tan aburridas. Todo cambia cuando explora la piscina de bolas en una pizzaria decadente y se encuentra en el pasado. Sin embargo, el deseo más profundo de Oswald tendrá un costo inesperado…\r\n\r\nExperimenta la emocionante aventura de una entrada querida en la franquicia de Five Nights at Freddy’s, Into the Pit.\r\nResuelve satisfactorios puzles entrelazados con una historia cargada de adrenalina.\r\nSumérjase en una experiencia narrativa.\r\nIntenta salvar a tus amigos, a tu familia y tu propia vida.\r\nDescubra secretos que abarcan décadas.\r\nDescubre diferentes finales.\r\nEscapa de las garras de las criaturas animatrónicas que causan estragos a través del tiempo.",
                    AvgRating = null,

                    ImageGames = new List<ImageGame>
                    {
                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysIntoThePit/FreddyIntoThePit.png",
                            AltText = "Imagen 1 de fnaf Into the pit"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysIntoThePit/fnafIP-1.jpg",
                            AltText = "Imagen 2 de fnaf Into the pit"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysIntoThePit/fnafIP-2.jpg",
                            AltText = "Imagen 3 de fnaf Into the pit"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysIntoThePit/fnafIP-3.jpg",
                            AltText = "Imagen 4 de fnaf Into the pit"
                        },

                        new ImageGame
                        {
                            ImageUrl = "images/FiveNightsAtFreddysIntoThePit/fnafIP-4.jpg",
                            AltText = "Imagen 5 de fnaf Into the pit"
                        },
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
