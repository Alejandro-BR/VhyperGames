using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Models.Mappers;

public class AdminMapper
{
    public AdminUserDto ToAdminUserDto(User user)
    {
        return new AdminUserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Rol = user.Rol,
        };
    }

    public List<AdminUserDto> ToListAdminUser(List<User> users) {
        List<AdminUserDto> adminUserDtos = new List<AdminUserDto>();

        foreach (User user in users) { 
            adminUserDtos.Add(ToAdminUserDto(user));
        }

        return adminUserDtos;
    }

    public AdminGameDto ToAdminGameDto(Game game) {
        return new AdminGameDto
        {
            Id = game.Id,
            Title = game.Title,
            Price = game.Price,
            Stock = game.Stock,
            ImageGame = game.ImageGames.FirstOrDefault(),
        };
    }

    public List<AdminGameDto> ToListAdminGameDto(List<Game> games) { 
        List<AdminGameDto> adminGameDtos = new List<AdminGameDto>();

        foreach (Game game in games)
        {
            adminGameDtos.Add(ToAdminGameDto(game));
        }

        return adminGameDtos;
    }

    public AdminFormGameDto ToAdminFormGameDto(Game game)
    {
        return new AdminFormGameDto
        {
            Id =game.Id,
            Title = game.Title,
            Price = game.Price,
            Stock = game.Stock,
            GameRequirementsId = game.GameRequirementsId,
            Description = game.Description,
            Sinopsis = game.Sinopsis,
            Genre = game.Genre,
            DrmFree = game.DrmFree,
            ReleaseDate = game.ReleaseDate,
            ImageGames = game.ImageGames,
        };
    }
}
