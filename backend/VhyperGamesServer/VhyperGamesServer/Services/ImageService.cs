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
        Game game = await _unitOfWork.GameRepository.GetByIdAsync(gameId, false, true);

        if (game == null)
        {
            throw new InvalidOperationException($"El juego con ID {gameId} no existe.");
        }

        // Usamos Directory.GetCurrentDirectory() para obtener la ruta base del proyecto.
        string rootDirectory = Directory.GetCurrentDirectory(); // Esto devuelve la ruta al directorio donde se ejecuta el código (debería ser la raíz de tu proyecto).

        // Confirmamos que estamos obteniendo la ruta correcta (se debe imprimir la ruta base del proyecto)
        Console.WriteLine("Ruta base del proyecto: " + rootDirectory);

        // Ruta a 'wwwroot/images'
        string imagesDirectory = Path.Combine(rootDirectory, "wwwroot", "images");

        // Verificamos si la ruta construida es la esperada
        Console.WriteLine("Ruta de imágenes: " + imagesDirectory);

        // Creamos la carpeta del juego dentro de 'wwwroot/images' si no existe
        string gameDirectory = Path.Combine(imagesDirectory, game.Title);
        if (!Directory.Exists(gameDirectory))
        {
            Directory.CreateDirectory(gameDirectory);
            Console.WriteLine($"Directorio creado: {gameDirectory}"); // Verificamos si la carpeta se creó correctamente
        }

        // Ruta del archivo de imagen con GUID único
        string fileName = $"{Guid.NewGuid()}_{image.File.FileName}";
        string relativePath = Path.Combine(gameDirectory, fileName);

        // Verificamos la ruta del archivo
        Console.WriteLine("Ruta final del archivo de imagen: " + relativePath);

        // Crear el objeto de la imagen
        ImageGame newImage = new ImageGame
        {
            AltText = image.AltText,
            ImageUrl = Path.Combine("images", game.Title, fileName), // URL relativa para la base de datos
            GameId = gameId,
            Game = game
        };

        // Agregar la imagen al juego
        game.ImageGames.Add(newImage);

        // Insertar la imagen en la base de datos
        await _unitOfWork.ImageGameRepository.InsertAsync(newImage);

        // Guardar cambios en la base de datos y almacenar la imagen físicamente
        if (await _unitOfWork.SaveAsync())
        {
            await StoreImageAsync(relativePath, image.File);
            Console.WriteLine($"Imagen guardada en: {relativePath}"); // Verificamos si se guardó correctamente
        }

        return newImage;
    }





    public async Task<ImageGame> UpdateAsync2(IFormFile image, string alt, int id)
    {
        ImageGame entity = await _unitOfWork.ImageGameRepository.GetByIdAsync(id);
        entity.AltText = alt;

        _unitOfWork.ImageGameRepository.Update(entity);

        if (await _unitOfWork.SaveAsync() && alt != null)
        {
            await StoreImageAsync(entity.ImageUrl, image);
        }

        return entity;
    }

    public async Task<ImageGame> UpdateAsync(ImageRequestDto image, int id)
    {
        ImageGame entity = await _unitOfWork.ImageGameRepository.GetByIdAsync(id);
        entity.AltText = image.AltText;

        _unitOfWork.ImageGameRepository.Update(entity);

        if (await _unitOfWork.SaveAsync() && entity != null)
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

    public async Task<List<ImageGame>> GetImagesByGameIdAsync(int gameId)
    {
        return await _unitOfWork.ImageGameRepository.GetImagesByGameIdAsync(gameId);
    }

}
