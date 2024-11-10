using VhyperGamesServer.Models.Database.Entities;
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

    public async Task<GameDataDto> GetGameData(int id)
    {
        Game game = await _unitOfWork.GameRepository.GetByIdAsync(id);

        if (game == null) { return null; }

        GameDataDto data = _viewDetailsMapper.GameDataToDto(game);

        return data;
    }

    public async Task<GamePriceDto> GetDataDto(int id)
    {
        Game game = await _unitOfWork.GameRepository.GetByIdAsync(id);

        if (game == null) { return null; }

        GamePriceDto data = _viewDetailsMapper.GamePriceToDto(game);

        return data;
        
    }

    public async Task<RequirementsDto> GetRequirementsDto(int id)
    {
        GameRequirements requirement = await _unitOfWork.RequerimentRepository.GetRequerimentByIdGame(id);

        if (requirement == null) { return null; }

        RequirementsDto requerimentsDto = _viewDetailsMapper.RequirementsToDto(requirement);

        return requerimentsDto;
    }
    
}
