using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Database;
using VhyperGamesServer.Entities;

namespace VhyperGamesServer.Controller;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private MyDbContext _dbContext;

    public UsersController(MyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /**
     * GetUsers
     * Devuelve todos los usuarios
     */
    [HttpGet]
    public IEnumerable<User> GetUsers()
    {
        return _dbContext.Users;
    }
}
