using VhyperGamesServer.Entities;
using VhyperGamesServer.Database;
using Microsoft.EntityFrameworkCore;

namespace VhyperGamesServer.Repositories;

public class UserRepositories : Repository<User, int>
{
    public UserRepositories(MyDbContext context) : base(context)
    {

    }

    public async Task<User> GetByEmail(string email)
    {
        return await GetQueryable()
            .FirstOrDefaultAsync(user => user.Email == email);
    }

}
