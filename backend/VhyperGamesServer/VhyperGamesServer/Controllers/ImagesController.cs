using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")]
public class ImagesController : ControllerBase
{
    private readonly ImageService _service;

    public ImagesController(ImageService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<ImageGame>> GetAllAsync()
    {
        List<ImageGame> images = await _service.GetAllAsync();

        return images;
    }

    [HttpGet("{id}")]
    public async Task<ImageGame> GetAsync(int id)
    {
        return await _service.GetAsync(id);
    }

    [HttpPost]
    public async Task<ActionResult<ImageGame>> InsertAsync(ImageRequestDto createImage, int gameId)
    {
        ImageGame newImage = await _service.InsertAsync(createImage, gameId);

        return Ok(newImage);
    }

    [HttpPut("updateImage/{id}")]
    public async Task<ActionResult<ImageGame>> UpdateAsync(ImageRequestDto updateImage, int imageId)
    {
        ImageGame imageUpdated = await _service.UpdateAsync(updateImage, imageId);

        return Ok(imageUpdated);
    }

    [HttpGet("images-byGame")]
    public async Task<ActionResult<List<ImageGame>>> GetImagesByGameIdAsync(int gameId)
    {
        return Ok(await _service.GetImagesByGameIdAsync(gameId));
    }

    [HttpDelete("delete")]
    public async Task<ActionResult> DeleteAsync(int imageId)
    {
       await _service.DeleteAsync(imageId);
       return NoContent();
    }

}
