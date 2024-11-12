using System.Globalization;
using System.Text;

namespace VhyperGamesServer.Utilities;

public static class TextCleaner
{
    // Método para limpiar el texto
    public static string Clear(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return string.Empty;

        return RemoveDiacritics(text.ToLower());
    }

    // Método para quitar las tildes y normalizar el texto
    private static string RemoveDiacritics(string text)
    {
        string normalizedString = text.Normalize(NormalizationForm.FormD);
        StringBuilder stringBuilder = new StringBuilder(normalizedString.Length);

        foreach (char c in normalizedString)
        {
            UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }

        return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
    }
}
