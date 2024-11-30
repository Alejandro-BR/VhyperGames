using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;

namespace VhyperGamesServer.Services;

public class ImageService
{
    private const string IMAGES_FOLDER = "images";

    private readonly UnitOfWork _unitOfWork;

    public ImageService(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

}
