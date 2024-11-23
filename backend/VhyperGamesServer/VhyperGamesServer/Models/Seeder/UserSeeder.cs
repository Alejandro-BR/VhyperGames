using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Utilities;

namespace VhyperGamesServer.Models.Seeder;

public class UserSeeder
{
    private readonly MyDbContext _context;

    public UserSeeder(MyDbContext context)
    {
        _context = context;
    }

    public void Seed()
    {
        if (_context.Users.Any())
        {
            Console.WriteLine("Usuarios ya existen en la base de datos, no se insertarán duplicados.");
            return;
        }

        var users = new List<User>
        {
            new User
            {
                Id = 1,
                Name = "Vhyper",
                Surname = "Games",
                Email = "vhypergames24@gmail.com",
                HashPassword = PasswordHelper.Hash("vhypergames"),
                Rol = "Admin",
                Address = "Calle 123"
            },
            new User
            {
                Id = 2,
                Name = "User",
                Surname = "User",
                Email = "user@user.com",
                HashPassword = PasswordHelper.Hash("user"),
                Rol = "User",
                Address = "Calle 456"
            }
        };

        var carts = new List<Cart>
        {
            new Cart
            {
                Id = 1,
                UserId = 1
            },

            new Cart
            {
                Id = 2,
                UserId = 2
            }
        };

        _context.Carts.AddRange(carts);
        _context.Users.AddRange(users);
        _context.SaveChanges();
    }
 }
