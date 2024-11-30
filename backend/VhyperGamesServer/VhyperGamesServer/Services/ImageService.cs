using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Utilities;

namespace VhyperGamesServer.Services;

public class ImageService
{
    private const string IMAGES_FOLDER = "images";

    private readonly UnitOfWork _unitOfWork;

    public ImageService(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<ImageGame>> GetAllAsync()
    {
        return  await _unitOfWork.ImageGameRepository.GetAllImagesGamesAsync();
   
    }

    public Task<ImageGame> GetAsync(int id)
    {
        return _unitOfWork.ImageGameRepository.GetByIdAsync(id);
    }

    public async Task<ImageGame> InsertAsync(ImageRequestDto image, int gameId)
    {
        string relativePath = $"{IMAGES_FOLDER}/{Guid.NewGuid()}_{image.File.FileName}";

        Game game = await _unitOfWork.GameRepository.GetByIdAsync(gameId, false, true);

        if (game == null) {
            throw new InvalidOperationException($"El juego con ID {gameId} no existe.");
        }

        ImageGame newImage = new ImageGame
        {
            AltText = image.AltText,
            ImageUrl = relativePath,
            GameId = gameId,
            Game = game
        };

        game.ImageGames.Add(newImage);

        await _unitOfWork.ImageGameRepository.InsertAsync(newImage);

        if (await _unitOfWork.SaveAsync())
        {
            await StoreImageAsync(relativePath, image.File);
        }

        return newImage;
    }

    public async Task<ImageGame> UpdateAsync(ImageRequestDto image, int id)
    {
        ImageGame entity = await _unitOfWork.ImageGameRepository.GetByIdAsync(id);
        entity.AltText = image.AltText;

        _unitOfWork.ImageGameRepository.Update(entity);

        if (await _unitOfWork.SaveAsync() && image.File != null)
        {
            await StoreImageAsync(entity.ImageUrl, image.File);
        }

        return entity;
    }

    private async Task StoreImageAsync(string relativePath, IFormFile file)
    {
        using Stream stream = file.OpenReadStream();

        await FileHelper.SaveAsync(stream, relativePath);
    }

}
