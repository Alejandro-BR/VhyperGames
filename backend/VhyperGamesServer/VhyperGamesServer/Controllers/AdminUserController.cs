using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Services;
using Microsoft.AspNetCore.Authorization;
using VhyperGamesServer.Models.Dtos;

namespace VhyperGamesServer.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")]
public class AdminUserController : ControllerBase
{
    private readonly AdminUserService _adminUserService;

    public AdminUserController(AdminUserService adminUserService)
    {
        _adminUserService = adminUserService;
    }

    [HttpGet("get-user")]
    public async Task<List<AdminUserDto>> GetListUser()
    {
       return await _adminUserService.GetListUser();
    }

    [HttpPut("update-rol")]
    public async Task PutRolUserById(int userId)
    {
        await _adminUserService.PutRolUserById(userId);
    }

    [HttpDelete("delete")]
    public async Task DeleteUserById(int userId)
    {
        await _adminUserService.DeleteUserById(userId);
    }
}
