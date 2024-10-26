using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;

namespace VhyperGamesServer.Controller;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UnitOfWork _unitOfWork;

    public UserController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    /**
     * GetUsers
     * Devuelve todos los usuarios
     */
    [HttpGet("GetUsers")]
    public async Task<IEnumerable<User>> GetUsers()
    {
        return await _unitOfWork.UserRepository.GetAllAsync();
    }

    /**
     * GetByEmail
     * Devuelve el usuario que coincida con el email
     */
    [HttpGet("GetByEmail")]
    public async Task<User> GetByEmail(string email)
    {
        return await _unitOfWork.UserRepository.GetByEmail(email);
    }
}
