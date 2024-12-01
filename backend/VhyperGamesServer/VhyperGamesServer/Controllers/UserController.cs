using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Controller;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserService _service;

    public UserController(UserService service)
    {
        _service = service;
    }

    /**
     * GetUsers
     * Devuelve todos los usuarios
     */
    //[HttpGet("GetUsers")]
    //public async Task<IEnumerable<User>> GetUsers()
    //{
    //    return await _service.GetUsers();
    //}
}
