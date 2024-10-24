using VhyperGamesServer.Entities;
using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Database;

namespace VhyperGamesServer.Repositories;

public class UserRepositories : Repository<User, int>
{
    public UserRepositories(MyDbMasterContext context) : base(context)
    {

    }

    public Task<ICollection<User>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public IQueryable<User> GetQueryable(bool asNoTracking = true)
    {
        throw new NotImplementedException();
    }

    public Task<User> InsertAsync(User entity)
    {
        throw new NotImplementedException();
    }
}
