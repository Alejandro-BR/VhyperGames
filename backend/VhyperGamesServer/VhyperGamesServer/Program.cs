using Examples.WebApi.Services.Blockchain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.ML;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Stripe;
using System.Text;
using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.IA;
using VhyperGamesServer.Models.Mappers;
using VhyperGamesServer.Models.Seeder;
using VhyperGamesServer.Services;

namespace VhyperGamesServer;

public class Program
{
    public static void Main(string[] args)
    {
        Directory.SetCurrentDirectory(AppContext.BaseDirectory);

        var builder = WebApplication.CreateBuilder(args);

        // Configuración de servicios
        ConfigureServices(builder);

        // Crear la aplicación web utilizando la configuración del builder
        var app = builder.Build();

        // Configuración del middleware de la aplicación
        ConfigureMiddleware(app);

        // Configura stripe
        ConfigureStripe(app.Services);

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
        builder.Services.AddScoped<UserService>();
        builder.Services.AddScoped<CatalogService>();
        builder.Services.AddScoped<DetailsViewService>();
        builder.Services.AddScoped<SmartSearchService>();
        builder.Services.AddScoped<IAService>();
        builder.Services.AddScoped<CartService>();
        builder.Services.AddScoped<ReserveService>();
        builder.Services.AddScoped<OrderService>();
        builder.Services.AddScoped<EmailService>();
        builder.Services.AddScoped<AdminGameService>();
        builder.Services.AddScoped<AdminUserService>();
        builder.Services.AddScoped<ImageService>();

        // Blockhain
        builder.Services.AddTransient<BlockhainService>();

        // Inyeccion Hosted Services
        builder.Services.AddHostedService<MybackgroundService>();

        //Inyección de mappers
        builder.Services.AddScoped<GameCardMapper>();
        builder.Services.AddScoped<DetailsViewMapper>();
        builder.Services.AddScoped<CartMapper>();
        builder.Services.AddScoped<ReserveAndOrderMapper>();
        builder.Services.AddScoped<AdminMapper>();
        builder.Services.AddScoped<UserMapper>();

        // Stripe
        builder.Services.AddTransient<StripeService>();

        // Inyección de IA
        builder.Services.AddPredictionEnginePool<ModelInput, ModelOutput>()
            .FromFile("IA.mlnet");

        // Configuración de CORS

#if DEBUG
        if (builder.Environment.IsDevelopment())
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", builder =>
                {
                    builder.WithOrigins("http://localhost:5173")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
            });
        }
#else
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyOrigin().AllowAnyOrigin().AllowAnyMethod();
            });
        });
#endif


        // Configuración de autenticación JWT
        string key = Environment.GetEnvironmentVariable("JWT_KEY");
        if (string.IsNullOrEmpty(key))
        {
            throw new InvalidOperationException("JWT_KEY is not configured in environment variables.");
        }

        builder.Services.AddAuthentication()
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

        builder.Services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
            {
                BearerFormat = "JWT",
                Name = "Authorization",
                Description = "Escribe SOLO tu token JWT",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme
            });

            // Establecer los requisitos de seguridad para las operaciones de la API
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = JwtBearerDefaults.AuthenticationScheme
                }
            },
            new string[] { }
        }
    });
        });

    }

    private static void ConfigureMiddleware(WebApplication app)
    {
#if DEBUG
        app.UseStaticFiles(); 
#else
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"))
    });
#endif



        // Creación de la base de datos y el Seeder
        SeedDatabase(app.Services);

        // Middleware de desarrollo (Swagger y CORS)
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors("AllowSpecificOrigin");
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
        var iaService = scope.ServiceProvider.GetService<IAService>();
        var detailService = scope.ServiceProvider.GetService<DetailsViewService>();

        if (dbContext.Database.EnsureCreated())
        {
            var seeder = new SeedManager(dbContext, iaService, detailService);
            seeder.SeedAll();
        }
    }
    private static void ConfigureStripe(IServiceProvider serviceProvider)
    {

        using IServiceScope scope = serviceProvider.CreateScope();

        string key = Environment.GetEnvironmentVariable("STRIPE_KEY");

        if (string.IsNullOrEmpty(key))
        {
            throw new InvalidOperationException("STRIPE_KEY is not configured in environment variables.");
        }

        StripeConfiguration.ApiKey = key;

    }

}
