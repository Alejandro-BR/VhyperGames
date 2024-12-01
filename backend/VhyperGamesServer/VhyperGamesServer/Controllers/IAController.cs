using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VhyperGamesServer.Models.IA;
using VhyperGamesServer.Services;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")]
public class IAController : ControllerBase
{

    private readonly IAService _service;

    public IAController(IAService service)
    {
        _service = service;
    }

    [HttpGet]
    public ModelOutput Predict(string text)
    {
      return _service.Predict(text);
    }
}
