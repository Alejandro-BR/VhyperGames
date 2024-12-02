using Microsoft.AspNetCore.Mvc;

namespace VhyperGamesServer.Controllers;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseController : ControllerBase
{
    protected int GetUserId()
    {
        var userIdClaim = User.FindFirst("id");
        if (userIdClaim == null)
        {
            throw new UnauthorizedAccessException("Usuario no autenticado.");
        }

        return int.Parse(userIdClaim.Value);
    }
}
