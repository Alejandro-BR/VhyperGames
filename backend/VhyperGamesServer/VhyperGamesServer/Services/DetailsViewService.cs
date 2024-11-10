using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;

namespace VhyperGamesServer.Services;

public class DetailsViewService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly DetailsViewMapper _viewDetailsMapper;

    public DetailsViewService(UnitOfWork unitOfWork, DetailsViewMapper viewDetailsMapper)
    {
        _unitOfWork = unitOfWork;
        _viewDetailsMapper = viewDetailsMapper;
    }

    
}
