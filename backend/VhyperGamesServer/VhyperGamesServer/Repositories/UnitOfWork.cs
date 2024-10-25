using VhyperGamesServer.Database;

namespace VhyperGamesServer.Repositories;


public class UnitOfWork
{
    private readonly MyDbContext _myDbContext;
    private UserRepository _userRepository;

    public UserRepository UserRepository => _userRepository ??= new UserRepository(_myDbContext);

    public UnitOfWork(MyDbContext myDbContext)
    {
        _myDbContext = myDbContext;
    }

    public async Task<bool> SaveAsync()
    {
        return await _myDbContext.SaveChangesAsync() > 0;
    }
}
