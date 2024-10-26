using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;

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

    public async Task<User> UserValidate(string email, string password)
    {
        
        // Esto no esta terminado

        email = email.ToLower();

        if (email == null || password == null) {
            return null;
        } else
        {
            User user = await GetByEmail(email);
            if (user.Password == password)
            {
                return user;
            }

            return null;

        } 

    }

}
