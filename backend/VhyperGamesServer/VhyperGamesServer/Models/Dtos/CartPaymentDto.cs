namespace VhyperGamesServer.Models.Dtos;

public class CartPaymentDto
{
    public int UserId { get; set; }

    public int CartId { get; set; }

    public List<CartGameDto> Games { get; set; }

    public int TotalPrice { get; set; }

    public CartPaymentDto()
    {
        TotalPrice = GetSumTotal();
    }

    public int GetSumTotal()
    {
        int precioTotal = 0;

        foreach (var g in Games)
        {
            precioTotal += g.TotalPrice;
        }
        return precioTotal;
    }
}
