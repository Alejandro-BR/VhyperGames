using System.Text;
using VhyperGamesServer.Utilities;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;

namespace VhyperGamesServer.Services;

public class EmailService
{
    private readonly UnitOfWork _unitOfWork;

    public EmailService(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    private async Task SendInvoiceAsync(Order order)
    {
        string url = Environment.GetEnvironmentVariable("SERVER_URL");

        // HTML
        StringBuilder emailContent = new StringBuilder();

        emailContent.AppendLine("<html>");
        emailContent.AppendLine("<head>");
        emailContent.AppendLine("<style>");
        emailContent.AppendLine("body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }");
        emailContent.AppendLine("h2 { color: #a440d2; }");
        emailContent.AppendLine("table { width: 100%; border-collapse: collapse; margin: 20px 0; }");
        emailContent.AppendLine("table, th, td { border: 1px solid #ddd; }");
        emailContent.AppendLine("th, td { text-align: left; padding: 8px; }");
        emailContent.AppendLine("th { background-color: #f4f4f4; }");
        emailContent.AppendLine("tr:nth-child(even) { background-color: #f9f9f9; }");
        emailContent.AppendLine("p { margin: 10px 0; }");
        emailContent.AppendLine(".total { font-size: 1.2em; font-weight: bold; color: #333; }");
        emailContent.AppendLine("</style>");
        emailContent.AppendLine("</head>");
        emailContent.AppendLine("<body>");
        emailContent.AppendLine("<h2>¡Gracias por tu compra, " + order.User.Name + "!</h2>");
        emailContent.AppendLine("<p>Confirmación de compra:</p>");

        emailContent.AppendLine("<table>");
        emailContent.AppendLine("<tr>");
        emailContent.AppendLine("<th>Imagen</th>");
        emailContent.AppendLine("<th>Nombre</th>");
        emailContent.AppendLine("<th>Precio Unitario</th>");
        emailContent.AppendLine("<th>Precio Total</th>");
        emailContent.AppendLine("<th>Cantidad</th>");
        emailContent.AppendLine("</tr>");

        foreach (OrderDetail orderDetail in order.OrderDetails)
        {
            double price = (orderDetail.Game.Price / 100.0) * orderDetail.Quantity;

            emailContent.AppendLine("<tr>");
            emailContent.AppendLine($"<td><img src='{url + orderDetail.Game.ImageGames[0].ImageUrl}' alt='{orderDetail.Game.ImageGames[0].AltText}' style='width:100px; border-radius:5px;' /></td>");
            emailContent.AppendLine($"<td>{orderDetail.Game.Title}</td>");
            emailContent.AppendLine($"<td>{(double)orderDetail.Game.Price / 100}€</td>");
            emailContent.AppendLine($"<td>{price}€</td>");
            emailContent.AppendLine($"<td>{orderDetail.Quantity}</td>");
            emailContent.AppendLine("</tr>");
        }

        emailContent.AppendLine("</table>");

        emailContent.AppendLine("<p class='total'><b>Total pagado:</b> " + (double)order.TotalPrice / 100 + " €</p>");

        if (order.ModeOfPay == 0)
        {
            emailContent.AppendLine("<p>Pagado con: Ethereum</p>");
        }
        else
        {
            emailContent.AppendLine("<p>Pagado con: Tarjeta de Crédito</p>");
        }

        emailContent.AppendLine("<p>El pedido será entregado en: <strong>" + order.User.Address + "</strong></p>");

        emailContent.AppendLine("</body>");
        emailContent.AppendLine("</html>");

        await EmailHelper.SendEmailAsync(order.User.Email, "Confirmación de compra", emailContent.ToString(), true);
    }



    public async Task NewEmail(int idUser)
    {
        Order order = await _unitOfWork.OrderRepository.GetRecentOrderByUserId(idUser);

        await SendInvoiceAsync(order);
    }

}
