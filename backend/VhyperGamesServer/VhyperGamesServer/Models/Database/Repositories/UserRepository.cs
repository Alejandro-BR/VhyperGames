using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Resources;

namespace VhyperGamesServer.Models.Database.Repositories;

public class UserRepository : Repository<User, int>
{
    public UserRepository(MyDbContext context) : base(context)
    {

    }

    public async Task<User> GetDataRegister(string email, string password)
    {
        string hashPassword = PasswordHelper.Hash(password);
        email = email.ToLower();

        return await GetQueryable()
            .FirstOrDefaultAsync(user => user.Email == email && user.Password == hashPassword);
    }

    public async Task<User> UserValidate(string email, string password)
    {
        if (email == null || password == null)
        {
            return null;
        } 
        
        return await GetDataRegister(email, password);

    }
}
