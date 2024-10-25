using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Database;
using VhyperGamesServer.Entities;
using VhyperGamesServer.Repositories;

namespace VhyperGamesServer.Controller;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private UserRepositories _userRepositories;

    public UsersController(UserRepositories userRepositories)
    {
        _userRepositories = userRepositories;
    }

    /**
     * GetUsers
     * Devuelve todos los usuarios
     */
    [HttpGet("GetUsers")]
    public async Task<IEnumerable<User>> GetUsers()
    {
        return await _userRepositories.GetAllAsync();
    }

    /**
     * GetByEmail
     * Devuelve el usuario que coincida con el email
     */
    [HttpGet("GetByEmail")]
    public async Task<User> GetByEmail(string email)
    {
        return await _userRepositories.GetByEmail(email);
    }
    
}
