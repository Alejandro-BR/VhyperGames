using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Models.Database.Repositories;


public class UnitOfWork
{
    private readonly MyDbContext _myDbContext;
    private UserRepository _userRepository;
    private GameRepository _gameRepository;

    public UserRepository UserRepository => _userRepository ??= new UserRepository(_myDbContext);
    public GameRepository GameRepository => _gameRepository ??= new GameRepository(_myDbContext);
    public UnitOfWork(MyDbContext myDbContext)
    {
        _myDbContext = myDbContext;
    }

    public async Task<bool> SaveAsync()
    {
        return await _myDbContext.SaveChangesAsync() > 0;
    }
}
