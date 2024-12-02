using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;
using VhyperGamesServer.Utilities;

namespace VhyperGamesServer.Services;

public class UserService
{
    private UnitOfWork _unitOfWork;
    private UserMapper _userMapper;

    public UserService(UnitOfWork unitOfWork, UserMapper userMapper)
    {
        _unitOfWork = unitOfWork;
        _userMapper = userMapper;
    }

    public async Task<UserDto> GetUserDtoById(int userId)
    {
        User user = await _unitOfWork.UserRepository.GetByIdAsync(userId);

        UserDto userDto = _userMapper.UsertoDto(user);

        return userDto;
    }

    public async Task UpdateUserBD(int userId, UserDto userDto)
    {
        if (userDto == null)
        {
            throw new ArgumentNullException(nameof(userDto), "El objeto UserDto no puede ser nulo.");
        }

        User existingUser = await _unitOfWork.UserRepository.GetByIdAsync(userId) ?? throw new KeyNotFoundException("Usuario no encontrado.");

        UpdateUserProperties(existingUser, userDto);

        await _unitOfWork.SaveAsync();
    }

    private static void UpdateUserProperties(User existingUser, UserDto userDto)
    {
        if (!string.IsNullOrEmpty(userDto.Name) && userDto.Name != existingUser.Name)
        {
            existingUser.Name = userDto.Name;
        }

        if (!string.IsNullOrEmpty(userDto.Surname) && userDto.Surname != existingUser.Surname)
        {
            existingUser.Surname = userDto.Surname;
        }

        if (!string.IsNullOrEmpty(userDto.Email) && userDto.Email != existingUser.Email)
        {
            existingUser.Email = userDto.Email;
        }

        if (!string.IsNullOrEmpty(userDto.Address) && userDto.Address != existingUser.Address)
        {
            existingUser.Address = userDto.Address;
        }

        if (!string.IsNullOrEmpty(userDto.Password) && userDto.Password != existingUser.HashPassword)
        {
            existingUser.HashPassword = PasswordHelper.Hash(userDto.Password);
        }
    }
}
