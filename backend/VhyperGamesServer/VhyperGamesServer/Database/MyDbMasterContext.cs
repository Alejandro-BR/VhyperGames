using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Entities;

namespace VhyperGamesServer.Database;

public class MyDbMasterContext : DbContext
{
    public MyDbMasterContext() { }

    public MyDbMasterContext(DbContextOptions<MyDbMasterContext> options) : base(options) { }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("DataSource=vhypergames.db")
                      .LogTo(Console.WriteLine);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Tabla users
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");

            entity.Property(e => e.Id)
                  .HasColumnName("id")
                  .IsRequired();

            entity.Property(e => e.Name)
                  .HasColumnName("name")
                  .HasMaxLength(20)
                  .IsRequired();

            entity.Property(e => e.Email)
                  .HasColumnName("email")
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(e => e.Password)
                  .HasColumnName("password_hash")
                  .HasMaxLength(255)
                  .IsRequired();

            entity.Property(e => e.Rol)
                  .HasColumnName("rol")
                  .HasMaxLength(10)
                  .IsRequired();

            entity.Property(e => e.Address)
                  .HasColumnName("address")
                  .HasMaxLength(100)
                  .IsRequired();

            // Unicos
            entity.HasIndex(e => e.Name)
                  .IsUnique();

            entity.HasIndex(e => e.Email)
                  .IsUnique();
        });
    }
}

