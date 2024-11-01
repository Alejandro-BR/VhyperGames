using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;

namespace VhyperGamesServer.Services;

public class UserService
{
    private UnitOfWork _unitOfWork;

    public UserService(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    /**
    * GetUsers
    * Devuelve todos los usuarios
    */
    public async Task<IEnumerable<User>> GetUsers()
    {
        return await _unitOfWork.UserRepository.GetAllAsync();
    }

}
