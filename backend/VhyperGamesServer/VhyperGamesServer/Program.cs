using Microsoft.EntityFrameworkCore;
using VhyperGamesServer.Database;

namespace VhyperGamesServer;

public class Program
{
    public static void Main(string[] args)
    {
        // Crear un builder para configurar la aplicación web ASP.NET Core
        var builder = WebApplication.CreateBuilder(args);

        // Agregar servicios al contenedor de inyección de dependencias.

        // Habilitar el uso de controladores en la aplicación
        builder.Services.AddControllers();

        // Configurar el generador de API para generar documentación OpenAPI
        builder.Services.AddEndpointsApiExplorer();

        // Agregar Swagger para la documentación interactiva de la API
        builder.Services.AddSwaggerGen();

        // Inyectar la dependencia del contexto de base de datos
        builder.Services.AddScoped<MyDbContext>();

        // Crear la aplicación web utilizando la configuración del builder
        var app = builder.Build();

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
        }

        // Redirigir automáticamente las solicitudes HTTP a HTTPS
        app.UseHttpsRedirection();

        // Usar middleware de autorización (configurado en los controladores)
        app.UseAuthorization();

        // Mapear las rutas de los controladores a los endpoints HTTP
        app.MapControllers();

        // Ejecutar la aplicación web y escuchar las solicitudes entrantes
        app.Run();
    }
}
