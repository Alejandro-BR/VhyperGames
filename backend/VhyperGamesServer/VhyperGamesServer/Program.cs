using Microsoft.IdentityModel.Tokens;
using System.Text;
using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Mappers;
using VhyperGamesServer.Models.Seeder;
using VhyperGamesServer.Services;

namespace VhyperGamesServer;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configuración de servicios
        ConfigureServices(builder);

        // Crear la aplicación web utilizando la configuración del builder
        var app = builder.Build();

        // Configuración del middleware de la aplicación
        ConfigureMiddleware(app);

        // Ejecutar la aplicación web y escuchar las solicitudes entrantes
        app.Run();
    }

    private static void ConfigureServices(WebApplicationBuilder builder)
    {
        // Habilitar el uso de controladores y Swagger para la documentación de API
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Configuración de base de datos y repositorios
        builder.Services.AddScoped<MyDbContext>();
        builder.Services.AddScoped<UnitOfWork>();

        // Inyección de servicios
        builder.Services.AddTransient<UserService>();
        builder.Services.AddTransient<CatalogService>();
        builder.Services.AddTransient<DetailsViewService>();
        builder.Services.AddScoped<SmartSearchService>();
        builder.Services.AddScoped<GameCardMapper>();
        builder.Services.AddScoped<DetailsViewMapper>();

        // Configuración de CORS
        if (builder.Environment.IsDevelopment())
        {
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policyBuilder =>
                {
                    policyBuilder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
        }

        // Configuración de autenticación JWT
        string key = Environment.GetEnvironmentVariable("JWT_KEY");
        if (string.IsNullOrEmpty(key))
        {
            throw new InvalidOperationException("JWT_KEY is not configured in environment variables.");
        }

        builder.Services.AddAuthentication()
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
                };
            });
    }

    private static void ConfigureMiddleware(WebApplication app)
    {
        // Habilitar el uso de archivos estáticos
        app.UseStaticFiles();

        // Creación de la base de datos y el Seeder
        SeedDatabase(app.Services);

        // Middleware de desarrollo (Swagger y CORS)
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors();
        }

        // Redirigir HTTP a HTTPS
        app.UseHttpsRedirection();

        // Middleware de autenticación y autorización
        app.UseAuthentication();
        app.UseAuthorization();

        // Mapear rutas de controladores
        app.MapControllers();
    }

    private static void SeedDatabase(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetService<MyDbContext>();

        if (dbContext.Database.EnsureCreated())
        {
            var seeder = new Seeder(dbContext);
            seeder.Seed();
        }
    }
}
