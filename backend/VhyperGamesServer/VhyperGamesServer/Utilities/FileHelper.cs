namespace VhyperGamesServer.Utilities;

public class FileHelper
{
    private const string WWWROOT_FOLDER = "wwwroot";

    public static async Task SaveAsync(byte[] bytes, string relativePath)
    {
        string directory = Path.GetDirectoryName(relativePath);
        string absoluteDirectory = Path.Combine(WWWROOT_FOLDER, directory);
        Directory.CreateDirectory(absoluteDirectory);

        string absolutePath = Path.Combine(WWWROOT_FOLDER, relativePath);
        await File.WriteAllBytesAsync(absolutePath, bytes);
    }

    public static async Task SaveAsync(Stream stream, string relativePath)
    {
        using MemoryStream streamAux = new MemoryStream();
        await stream.CopyToAsync(streamAux);
        byte[] bytes = streamAux.ToArray();

        await SaveAsync(bytes, relativePath);
    }

    public static async Task DeleteAsync(string relativePath)
    {
        string absolutePath = Path.Combine(WWWROOT_FOLDER, relativePath);

        if (File.Exists(absolutePath))
        {
            await Task.Run(() => File.Delete(absolutePath));
        }
        else
        {
            throw new FileNotFoundException($"El archivo {relativePath} no existe.");
        }
    }
}
