using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace VhyperGamesServer.Models.Database.Entities;

public class Reserve
{
    public int Id { get; set; }

    public int UserId { get; set; }

    [JsonIgnore]
    public List<ReserveDetail> ReserveDetails { get; set; }

    public Reserve()
    {
        ReserveDetails = new List<ReserveDetail>();
    }
}
