using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using VhyperGamesServer.Models.Database.Entities;

namespace VhyperGamesServer.Models.Database;

public class MyDbContext : DbContext
{
    private const string DATABASE_PATH = "vhypergames.db";

    //Tablas
    public DbSet<User> Users { get; set; }
    public DbSet<Game> Games { get; set; }
    public DbSet<GameRequirements> GameRequirements { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<ImageGame> ImagesGame { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartDetail> CartsDetail { get; set; }

    public DbSet<Reserve> Reserve { get; set; }
    public DbSet<ReserveDetail> ReserveDetail { get; set; }

    public DbSet<Order> Order { get; set; }

    public DbSet<OrderDetail> OrderDetail { get; set; }

    public MyDbContext() { }

    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }


    //Configurar el proveedor de base de datos Sqlite

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        //AppDomain obtiene el directorio donde se ejecuta la aplicación
        string baseDir = AppDomain.CurrentDomain.BaseDirectory;
        string conectionString = Environment.GetEnvironmentVariable("DB_CONFIG");

        // Se configura Sqlite como proveedor de BD pasando la ruta de archivo ("vhypergames.db) en el directorio base de la aplicacion
#if DEBUG
        options.UseSqlite($"DataSource={baseDir}{DATABASE_PATH}");
#elif RELEASE
        options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
#endif
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        // Configuración de la tabla users
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");

            // Configurar el Id como clave primaria
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                  .HasColumnName("id")
                  .IsRequired()
                  .ValueGeneratedOnAdd();

            entity.Property(e => e.Name)
                  .HasColumnName("name")
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(e => e.Surname)
                  .HasColumnName("surname")
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(e => e.Email)
                  .HasColumnName("email")
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(e => e.HashPassword)
                  .HasColumnName("hash_password")
                  .HasMaxLength(40)
                  .IsRequired();

            entity.Property(e => e.Rol)
                  .HasColumnName("rol")
                  .IsRequired();

            entity.Property(e => e.Address)
                  .HasColumnName("address")
                  .HasMaxLength(250)
                  .IsRequired();

            // Índice único en el campo Email
            entity.HasIndex(e => e.Email)
                  .IsUnique();
        });

        modelBuilder.Entity<Game>(entity =>
        {
            entity.ToTable("games");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .IsRequired()
                .ValueGeneratedOnAdd();

            entity.Property(e => e.GameRequirementsId)
                .HasColumnName("game_requirements_id");

            entity.HasOne(e => e.GameRequirements)
                .WithMany(g => g.Games)
                .HasForeignKey(e => e.GameRequirementsId);

            entity.Property(e => e.Title)
                .HasColumnName("title")
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(e => e.Description)
                .HasColumnName("description")
                .HasMaxLength(800)
                .IsRequired();

            entity.Property(e => e.Genre)
             .HasColumnName("genre")
             .IsRequired();

            entity.Property(e => e.DrmFree)
                .HasColumnName("drm_free")
                .HasColumnType("boolean")
                .IsRequired();

            entity.Property(e => e.ReleaseDate)
                .HasColumnName("release_date")
                .HasColumnType("date")
                .IsRequired();

            entity.Property(e => e.Price)
                .HasColumnName("price")
                .HasColumnType("REAL")
                .IsRequired();

            entity.Property(e => e.Stock)
                .HasColumnName("stock")
                .IsRequired();

            entity.Property(e => e.AvgRating)
                .HasColumnName("avg_rating");

        });

        // Configuración de la tabla GameRequirements
        modelBuilder.Entity<GameRequirements>(entity =>
        {
            entity.ToTable("gamerequirements");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                  .HasColumnName("id")
                  .IsRequired()
                  .ValueGeneratedOnAdd();

            entity.Property(e => e.OS)
                  .HasColumnName("os")
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(e => e.MinOS)
                  .HasColumnName("min-os")
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(e => e.CPU)
                  .HasColumnName("cpu")
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(e => e.MinCPU)
                  .HasColumnName("min-cpu")
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(e => e.RAM)
                  .HasColumnName("ram")
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(e => e.MinRAM)
                  .HasColumnName("min-ram")
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(e => e.GPU)
                  .HasColumnName("gpu")
                  .HasMaxLength(40)
                  .IsRequired();

            entity.Property(e => e.MinGPU)
                  .HasColumnName("min-gpu")
                  .HasMaxLength(40)
                  .IsRequired();

            entity.Property(e => e.DirectX)
                  .HasColumnName("directx")
                  .IsRequired();

            entity.Property(e => e.MinDirectX)
                  .HasColumnName("min-directx")
                  .IsRequired();

            entity.Property(e => e.Storage)
                  .HasColumnName("storage")
                  .HasMaxLength(250)
                  .IsRequired();

        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.ToTable("reviews");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .IsRequired()
                .ValueGeneratedOnAdd();

            entity.Property(e => e.GameId)
                .HasColumnName("game_id")
                .IsRequired();

            entity.Property(e => e.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            entity.Property(e => e.ReviewText)
                .HasColumnName("review_text")
                .HasMaxLength(250)
                .IsRequired();

            entity.Property(e => e.ReviewDate)
                .HasColumnName("review_date")
                .HasColumnType("date")
                .IsRequired()
                .HasDefaultValueSql("CURRENT_DATE");

            entity.Property(e => e.Rating)
                .HasColumnName("rating")
                .IsRequired();

            entity.HasOne(e => e.Game)
                .WithMany(g => g.Reviews)
                .HasForeignKey(e => e.GameId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ImageGame>(entity =>
        {
            entity.ToTable("images_game");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .IsRequired()
                .ValueGeneratedOnAdd();

            entity.Property(e => e.GameId)
                .HasColumnName("game_id");

            entity.HasOne(e => e.Game)
                .WithMany(g => g.ImageGames)
                .HasForeignKey(e => e.GameId);

            entity.Property(e => e.ImageUrl)
                .HasColumnName("image_url")
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(e => e.AltText)
                .HasColumnName("alt_text")
                .HasMaxLength(100)
                .IsRequired();
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.ToTable("cart");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .IsRequired()
                .ValueGeneratedOnAdd();

            entity.Property(e => e.UserId)
                .HasColumnName("user_id")
                .IsRequired();
        });

        modelBuilder.Entity<CartDetail>(entity =>
        {
            entity.ToTable("cart_details");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .IsRequired()
                .ValueGeneratedOnAdd();

            entity.Property(e => e.CartId)
                .HasColumnName("cart_id")
                .IsRequired();

            entity.Property(e => e.GameId)
                .HasColumnName("game_id")
                .IsRequired();

            entity.Property(e => e.Quantity)
                .HasColumnName("quantity")
                .IsRequired();

            entity.HasOne(cd => cd.Cart)
                .WithMany(c => c.CartDetails)
                .HasForeignKey(cd => cd.CartId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_CartDetail_Cart");
        });

        modelBuilder.Entity<Reserve>(entity =>
        {
            entity.ToTable("reserve");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .IsRequired()
                .ValueGeneratedOnAdd();

            entity.Property(e => e.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            entity.Property(e => e.ExpirationTime)
             .HasColumnName("expirationtime")
             .IsRequired();
        });

        modelBuilder.Entity<ReserveDetail>(entity =>
        {
            entity.ToTable("reserve_details");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .IsRequired()
                .ValueGeneratedOnAdd();

            entity.Property(e => e.ReserveId)
                .HasColumnName("reserve_id")
                .IsRequired();

            entity.Property(e => e.GameId)
                .HasColumnName("game_id")
                .IsRequired();

            entity.Property(e => e.Quantity)
                .HasColumnName("quantity")
                .IsRequired();

            entity.HasOne(cd => cd.Reserve)
                .WithMany(c => c.ReserveDetails)
                .HasForeignKey(cd => cd.ReserveId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_ReserveDetail_Reserve");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("order");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .IsRequired()
                .ValueGeneratedOnAdd();

            entity.Property(e => e.UserId)
                .HasColumnName("user_id")
                .IsRequired();
            entity.Property(e => e.ModeOfPay)
                .HasColumnName("pay_mode")
                .IsRequired();
            entity.Property(e => e.TotalPrice)
                .HasColumnName("total_price")
                .IsRequired();
            entity.Property(e => e.BillingDate)
                .HasColumnName("Billing_date")
                .IsRequired();
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.ToTable("order_details");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .IsRequired()
                .ValueGeneratedOnAdd();

            entity.Property(e => e.OrderId)
                .HasColumnName("order_id")
                .IsRequired();

            entity.Property(e => e.GameId)
                .HasColumnName("game_id")
                .IsRequired();

            entity.Property(e => e.Quantity)
                .HasColumnName("quantity")
                .IsRequired();

            entity.HasOne(cd => cd.Order)
                .WithMany(c => c.OrderDetails)
                .HasForeignKey(cd => cd.OrderId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_OrderDetail_Order");
        });
    }


}

