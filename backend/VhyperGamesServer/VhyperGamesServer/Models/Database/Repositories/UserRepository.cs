using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database.Repositories;

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
