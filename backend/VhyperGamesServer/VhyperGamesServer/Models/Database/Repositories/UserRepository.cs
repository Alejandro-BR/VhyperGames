using Microsoft.EntityFrameworkCore;
using TorchSharp.Modules;
using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Utilities;

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
            .FirstOrDefaultAsync(user => user.Email == email && user.HashPassword == hashPassword);
    }

    public async Task<User> UserValidate(string email, string password)
    {
        if (email == null || password == null)
        {
            return null;
        } 
        
        return await GetDataRegister(email, password);

    }

    public async Task<bool> ExistEmail(string email)
    {
        email = email.ToLower();
        User user = await GetQueryable().FirstOrDefaultAsync(user => user.Email == email);
        if (user == null) {
            return false;
        }
        return true;
    }

    public async Task<List<User>> GetAllUserAsync()
    {
        return await GetQueryable().ToListAsync();
    }

    public async Task<User> GetUserById(int id)
    {
        return await Context.Set<User>()
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<List<string>> GetAllName()
    {
        ICollection<User> users = await GetAllAsync();

        List<string> names = users.Select(u => u.Name).ToList();

        return names;
    }

    public async Task<List<User>> GetGamesByTitles(IEnumerable<string> names)
    {
        if (names == null || !names.Any())
        {
            return new List<User>();
        }

        return await Context.Users
            .Where(u => names.Contains(u.Name))
            .ToListAsync();
    }

}
