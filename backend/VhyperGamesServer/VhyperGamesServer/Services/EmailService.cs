﻿using System.Text;
using VhyperGamesServer.Utilities;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Repositories;
using Stripe;

namespace VhyperGamesServer.Services;

public class EmailService
{
    private readonly UnitOfWork _unitOfWork;

    public EmailService(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task SendInvoiceAsync(Order order)
    {
        // Crear el contenido HTML
        StringBuilder emailContent = new StringBuilder();

        emailContent.AppendLine("<html>");
        emailContent.AppendLine("<body>");
        emailContent.AppendLine("<h2>¡Gracias por tu compra, " + order.User.Name + "! :D</h2>");
        emailContent.AppendLine("<p>Confirmación de compra :3</p>");

        // Crear la tabla de productos
        emailContent.AppendLine("<table border='1' style='width:100%; border-collapse: collapse;'>");
        emailContent.AppendLine("<tr>");
        emailContent.AppendLine("<th>Cantidad</th>");
        emailContent.AppendLine("<th>Imagen</th>");
        emailContent.AppendLine("<th>Nombre</th>");
        emailContent.AppendLine("<th>Precio unidad</th>");
        emailContent.AppendLine("<th>Suma</th>");
        emailContent.AppendLine("</tr>");

        // Recorrer los juegos en el pedido
        foreach (OrderDetail orderDetail in order.OrderDetails)
        {
            emailContent.AppendLine("<tr>");
            emailContent.AppendLine($"<td>{orderDetail.Quantity}</td>");
            emailContent.AppendLine($"<td><img src='{orderDetail.Game.ImageGames[0].ImageUrl}' alt='{orderDetail.Game.ImageGames[0].AltText}' style='width:100px;' /></td>");
            emailContent.AppendLine($"<td>{orderDetail.Game.Title}</td>");
            emailContent.AppendLine($"<td>{orderDetail.Game.Price * orderDetail.Quantity}€</td>");
            emailContent.AppendLine($"<td>{orderDetail.Quantity}€</td>");
            emailContent.AppendLine("</tr>");
        }

        emailContent.AppendLine("</table>");

        // Detalles adicionales del pedido
        emailContent.AppendLine("<p><b>Total pagado:</b> " + order.TotalPrice + " €</p>");
        emailContent.AppendLine("<p><b>Pagado con:</b> " + order.PayMode + "</p>");
        emailContent.AppendLine("<p><b>El pedido será entregado en:</b> " + order.User.Address + "</p>");

        emailContent.AppendLine("</body>");
        emailContent.AppendLine("</html>");

        // Enviar el correo usando el helper
        await EmailHelper.SendEmailAsync(order.User.Email, "Confirmación de compra", emailContent.ToString(), true);
    }

    public async Task NewEmail(int idUser)
    {
        Order order = await _unitOfWork.OrderRepository.GetRecentOrderByUserId(idUser);

        await SendInvoiceAsync(order);
    }

}
