using VhyperGamesServer.Entities;
using VhyperGamesServer.Database;
using Microsoft.EntityFrameworkCore;

namespace VhyperGamesServer.Repositories;

public class UserRepository : Repository<User, int>
{
    public UserRepository(MyDbContext context) : base(context)
    {

    }

    public async Task<User> GetByEmail(string email)
    {
        return await GetQueryable()
            .FirstOrDefaultAsync(user => user.Email == email);
    }

}
