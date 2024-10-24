using Microsoft.EntityFrameworkCore;

namespace VhyperGamesServer.Database;

public class MyDbContext : DbContext
{
    private const string DATABASE_PATH = "vhypergames.db";

    //Tablas
    public DbSet<User> Users { get; set; }


    //Configurar el proveedor de base de datos Sqlite

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        //AppDomain obtiene el directorio donde se ejecuta la aplicación
        string baseDir = AppDomain.CurrentDomain.BaseDirectory;

        // Se configura Sqlite como proveedor de BD pasando la ruta de archivo ("vhypergames.db) en el directorio base de la aplicacion
        options.UseSqlite($"DataSource={baseDir}{DATABASE_PATH}");
    }

}
