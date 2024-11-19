namespace VhyperGamesServer.Models.Dtos;

public class CartDto
{
    public int UserId { get; set; }

    public int CartId { get; set; }

    public List<CartGameDto> Games { get; set; }

    public int TotalPrice { get; set; }

    public CartDto()
    {
        Games = new List<CartGameDto>();  
        //TotalPrice = GetSumTotal();
    }

    //public int GetSumTotal()
    //{
    //    int precioTotal = 0;

    //    foreach (var g in Games)
    //    {
    //        precioTotal += g.TotalPrice;
    //    }
    //    return precioTotal;

    //}
}