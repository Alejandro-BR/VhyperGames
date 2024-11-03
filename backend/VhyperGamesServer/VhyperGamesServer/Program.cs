using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
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
        // Crear un builder para configurar la aplicación web ASP.NET Core
        var builder = WebApplication.CreateBuilder(args);

    

        // Habilitar el uso de controladores en la aplicación
        builder.Services.AddControllers();

        // Configurar el generador de API para generar documentación OpenAPI
        builder.Services.AddEndpointsApiExplorer();

        // Agregar Swagger para la documentación interactiva de la API
        builder.Services.AddSwaggerGen();
        
        // Inyectar la dependencia del contexto de base de datos
        builder.Services.AddScoped<MyDbContext>();

        // Inyectar el unit of work que contiene todos los repositorios
        builder.Services.AddScoped<UnitOfWork>();

        builder.Services.AddTransient<UserService>();

        builder.Services.AddTransient<CatalogService>();

        builder.Services.AddScoped<SmartSearchService>();

        builder.Services.AddScoped<GameCardMapper>();

        //Método para utilizar el Seeder
        static void SeedDatabase(IServiceProvider serviceProvider)
        {
            using IServiceScope scope = serviceProvider.CreateScope();
            using MyDbContext myDbContext = scope.ServiceProvider.GetService<MyDbContext>();

            if (myDbContext.Database.EnsureCreated())
            {
                Seeder seeder = new Seeder(myDbContext);
                seeder.Seed();
            }
        }

        //Permite CORS
        if (builder.Environment.IsDevelopment())
        {
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });
        }

        builder.Services.AddAuthentication()
            .AddJwtBearer(options =>
            {
                string key = Environment.GetEnvironmentVariable("JWT_KEY");

                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
                };
            });

        // Crear la aplicación web utilizando la configuración del builder
        var app = builder.Build();

        //Creación del seeder
        SeedDatabase(app.Services);

        // Creación de la base de datos si no existe usando MyDbContext
        using (IServiceScope scope = app.Services.CreateScope())
        {
            // Obtener el contexto de base de datos del contenedor de servicios
            MyDbContext dbContext = scope.ServiceProvider.GetService<MyDbContext>();

            // Asegurarse de que la base de datos esté creada
            dbContext.Database.EnsureCreated();
        }

        // Configurar el middleware (pipeline) de solicitudes HTTP.

        // Si el entorno es de desarrollo, habilitar Swagger para la documentación de API
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();        // Usar Swagger para generar documentación
            app.UseSwaggerUI();      // Usar la interfaz de usuario de Swagger


            
            app.UseCors();          //Permite CORS
        }

        // Redirigir automáticamente las solicitudes HTTP a HTTPS
        app.UseHttpsRedirection();


        app.UseAuthentication();

        // Usar middleware de autorización (configurado en los controladores)
        app.UseAuthorization();

        // Mapear las rutas de los controladores a los endpoints HTTP
        app.MapControllers();

        // Ejecutar la aplicación web y escuchar las solicitudes entrantes
        app.Run();
    }
}
