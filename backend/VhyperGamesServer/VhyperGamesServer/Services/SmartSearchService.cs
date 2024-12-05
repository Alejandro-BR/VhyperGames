using F23.StringSimilarity;
using F23.StringSimilarity.Interfaces;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Utilities;

namespace VhyperGamesServer.Services;

public class SmartSearchService
{
    private readonly INormalizedStringSimilarity _stringSimilarityComparer;

    private const double THRESHOLD = 0.75;

    public SmartSearchService()
    {
        _stringSimilarityComparer = new JaroWinkler();
    }

    public IEnumerable<string> Search(string query, List<string> data)
    {
        IEnumerable<string> result;

        // Si la consulta está vacía o solo tiene espacios en blanco, devolvemos todos los items
        if (string.IsNullOrWhiteSpace(query))
        {
            result = null;
        }
        // En caso contrario, realizamos la búsqueda
        else
        {
            // Limpiamos la query y la separamos por espacios
            string[] queryKeys = GetKeys(TextCleaner.Clear(query));
            // Aquí guardaremos los items que coincidan
            List<string> matches = new List<string>();

            foreach (string item in data)
            {
                // Limpiamos el item y lo separamos por espacios
                string[] itemKeys = GetKeys(TextCleaner.Clear(item));

                // Si coincide alguna de las palabras de item con las de query
                // entonces añadimos item a la lista de coincidencias
                if (IsMatch(queryKeys, itemKeys))
                {
                    matches.Add(item);
                }
            }

            result = matches;
        }

        return result;
    }

    private bool IsMatch(string[] queryKeys, string[] itemKeys)
    {
        bool isMatch = false;

        for (int i = 0; !isMatch && i < itemKeys.Length; i++)
        {
            string itemKey = itemKeys[i];

            for (int j = 0; !isMatch && j < queryKeys.Length; j++)
            {
                string queryKey = queryKeys[j];

                isMatch = IsMatch(itemKey, queryKey);
            }
        }

        return isMatch;
    }

    // Hay coincidencia si las palabras son las mismas o si item contiene query o si son similares
    private bool IsMatch(string itemKey, string queryKey)
    {
        return itemKey == queryKey
            || itemKey.Contains(queryKey)
            || _stringSimilarityComparer.Similarity(itemKey, queryKey) >= THRESHOLD;
    }

    // Separa las palabras quitando los espacios y 
    private string[] GetKeys(string query)
    {
        return query.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    }
}
