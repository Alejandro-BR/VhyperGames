using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using VhyperGamesServer.Models.Database.Entities.Enuml;

namespace VhyperGamesServer.Models.Database.Entities;

public class Reserve
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public PayMode ModeOfPay { get; set; }

    public string SessionId { get; set; }

    public DateTime ExpirationTime { get; set; }

    public List<ReserveDetail> ReserveDetails { get; set; }

    public Reserve()
    {
        ReserveDetails = new List<ReserveDetail>();
    }
}
