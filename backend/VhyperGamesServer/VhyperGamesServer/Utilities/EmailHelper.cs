using System.Net.Mail;
using System.Net;

namespace VhyperGamesServer.Utilities;

internal class EmailHelper
{
    private const string SMTP_HOST = "smtp.gmail.com";
    private const int SMTP_PORT = 587;
    private const string EMAIL_FROM = "vhypergames24@gmail.com";
    private const string PASSWORD_EMAIL_FROM = "EMAIL_KEY";

    public static async Task SendEmailAsync(string to, string subject, string body, bool isHtml = false)
    {
        string key = Environment.GetEnvironmentVariable(PASSWORD_EMAIL_FROM);

        if (string.IsNullOrEmpty(key))
        {
            throw new InvalidOperationException("EMAIL_KEY is not configured in environment variables.");
        }

        using SmtpClient client = new SmtpClient(SMTP_HOST, SMTP_PORT)
        {
            EnableSsl = true,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(EMAIL_FROM, key)
        };

        MailMessage mail = new MailMessage(EMAIL_FROM, to, subject, body)
        {
            IsBodyHtml = isHtml,
        };

        await client.SendMailAsync(mail);
    }
}
