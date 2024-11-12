using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Seeders
{
    public class ReviewSeeder
    {
        private readonly MyDbContext _context;
        private readonly IAService _iaService;
        private readonly DetailsViewService _detailsService;

        public ReviewSeeder(MyDbContext context, IAService iaService, DetailsViewService detailsView)
        {
            _context = context;
            _iaService = iaService;
            _detailsService = detailsView;
        }

        public void Seed()
        {

            Review[] reviews = new Review[] {
                new Review
                {
                    GameId = 1,
                    UserId = 1,
                    ReviewText = "Este juego es increíble, no puedo dejar de jugarlo.",
                    ReviewDate = DateTime.UtcNow.Date,
                    Rating = (int)_iaService.Predict("Este juego es increíble, no puedo dejar de jugarlo.").PredictedLabel
                },
                new Review
                {
                    GameId = 2,
                    UserId = 2,
                    ReviewText = "Muy repetitivo, me aburrí rápidamente.",
                    ReviewDate = DateTime.UtcNow.Date,
                    Rating = (int)_iaService.Predict("Muy repetitivo, me aburrí rápidamente.").PredictedLabel
                },
                new Review
                {
                    GameId = 1,
                    UserId = 2,
                    ReviewText = "Tiene algunos errores, pero es muy divertido.",
                    ReviewDate = DateTime.UtcNow.Date,
                    Rating = (int)_iaService.Predict("Tiene algunos errores, pero es muy divertido.").PredictedLabel
                },
                new Review
                {
                    GameId = 2,
                    UserId = 1,
                    ReviewText = "Excelente historia, pero la jugabilidad podría mejorar.",
                    ReviewDate = DateTime.UtcNow.Date,
                    Rating = (int)_iaService.Predict("Excelente historia, pero la jugabilidad podría mejorar.").PredictedLabel
                }
            };

            _context.Reviews.AddRange(reviews);
            _context.SaveChanges();

            UpdateRatingsForSeededGames().Wait();
        }

        private async Task UpdateRatingsForSeededGames()
        {
            var gameIds = _context.Reviews.Select(r => r.GameId).Distinct().ToList();
            foreach (var gameId in gameIds)
            {
                await _detailsService.UpdateGameAverageRating(gameId);
            }
        }
    }
}

