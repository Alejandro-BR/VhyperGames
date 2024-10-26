using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
        try
        {
            var user = await _unitOfWork.UserRepository.UserValidate(request.Email, request.Password);

            if (user == null)
            {
                return Unauthorized("Email o contraseña inválidos");
            } 

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {

                Claims = new Dictionary<string, object>
                {
                    { "id", user.Id.ToString() },
                    { ClaimTypes.Role, user.Rol }               
                },

                 // Aquí indicamos cuándo caduca el token
                 Expires = DateTime.UtcNow.AddDays(5),
                 // Aquí especificamos nuestra clave y el algoritmo de firmado
                 SigningCredentials = new SigningCredentials(
                 _tokenParameters.IssuerSigningKey,
                 SecurityAlgorithms.HmacSha256Signature)
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string accessToken = tokenHandler.WriteToken(token);
            

            return Ok(new AccessTokenJws { AccessToken = accessToken });
        }

        catch (Exception ex)
        {
            // Puedes loguear la excepción aquí si es necesario
            // Logger.LogError(ex, "An error occurred during login.");

            return StatusCode(500, "Un error ha ocurrido al enviar su petición.");
        }
    }
}