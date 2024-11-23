using System.Net.Mail;
using System.Net;

namespace VhyperGamesServer.Utilities;

internal class EmailHelper
{
    private const string SMTP_HOST = "smtp.gmail.com";
    private const int SMTP_PORT = 587;
    private const string EMAIL_FROM = "vhypergames24@gmail.com";
    // Se obtiene de este video https://www.youtube.com/watch?v=Yv_Wh0zjMw4
    private const string PASSWORD_EMAIL_FROM = "vhyperGames_2024!";

    public static async Task SendEmailAsync(string to, string subject, string body, bool isHtml = false)
    {
        using SmtpClient client = new SmtpClient(SMTP_HOST, SMTP_PORT)
        {
            EnableSsl = true,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(EMAIL_FROM, PASSWORD_EMAIL_FROM)
        };

        MailMessage mail = new MailMessage(EMAIL_FROM, to, subject, body)
        {
            IsBodyHtml = isHtml,
        };

        await client.SendMailAsync(mail);
    }
}
