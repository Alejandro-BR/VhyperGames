using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly TokenValidationParameters _tokenParameters;
    private readonly UnitOfWork _unitOfWork;

    public AuthController(IOptionsMonitor<JwtBearerOptions> jwtOptions)
    {
        _tokenParameters = jwtOptions.Get(JwtBearerDefaults.AuthenticationScheme)
            .TokenValidationParameters;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AccessTokenJws>> Login([FromBody] LoginRequest request)
    {

        var user = await _unitOfWork.UserRepository.UserValidate(request.Email.ToLower(), request.Password);
        if (request.Email == )
    }
}
