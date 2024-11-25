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
        // HTML
        StringBuilder emailContent = new StringBuilder();

        emailContent.AppendLine("<html>");
        emailContent.AppendLine("<body>");
        emailContent.AppendLine("<h2>¡Gracias por tu compra, " + order.User.Name + ".</h2>");
        emailContent.AppendLine("<p>Confirmación de compra :</p>");

        emailContent.AppendLine("<table border='1' style='width:100%; border-collapse: collapse;'>");
        emailContent.AppendLine("<tr>");
        emailContent.AppendLine("<th>Imagen</th>");
        emailContent.AppendLine("<th>Nombre</th>");
        emailContent.AppendLine("<th>Precio Total</th>");
        emailContent.AppendLine("<th>Cantidad</th>");
        emailContent.AppendLine("</tr>");

        foreach (OrderDetail orderDetail in order.OrderDetails)
        {
            emailContent.AppendLine("<tr>");

            emailContent.AppendLine($"<td><img src='{orderDetail.Game.ImageGames[0].ImageUrl}' alt='{orderDetail.Game.ImageGames[0].AltText}' style='width:100px;' /></td>");
            emailContent.AppendLine($"<td>{orderDetail.Game.Title}</td>");
            emailContent.AppendLine($"<td>{orderDetail.Game.Price * orderDetail.Quantity}€</td>");
            emailContent.AppendLine($"<td>{orderDetail.Quantity}</td>");
            emailContent.AppendLine("</tr>");
        }

        emailContent.AppendLine("</table>");

        emailContent.AppendLine("<p><b>Total pagado:</b> " + order.TotalPrice + " €</p>");

        if (order.ModeOfPay == 0)
        {
           emailContent.AppendLine("<p>Pagado con: Ethereum </p>");
        } else
        {
            emailContent.AppendLine("<p>Pagado con: CreditCard </p>");
        }

        emailContent.AppendLine("<p>El pedido será entregado en: " + order.User.Address + "</p>");

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
