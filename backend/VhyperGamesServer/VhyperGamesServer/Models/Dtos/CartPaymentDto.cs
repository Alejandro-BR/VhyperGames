namespace VhyperGamesServer.Models.Dtos;

public class CartPaymentDto
{
    public int UserId { get; set; }

    public int CartId { get; set; }

    public List<CartGameDto> Games { get; set; }

    public int TotalPrice { get; set; }

}
