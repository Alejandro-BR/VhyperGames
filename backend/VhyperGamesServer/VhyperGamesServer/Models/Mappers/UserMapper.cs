using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Models.Mappers;

public class UserMapper
{
    public UserDto UsertoDto(User user)
    {
        return new UserDto
        {
            Name = user.Name,
            Surname = user.Surname,
            Email = user.Email,
            Address = user.Address
        };
    }
}