using System.Numerics;
using System.Web;
using Examples.WebApi.Models.Dtos;
using Examples.WebApi.Services.Blockchain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nethereum.Contracts;
using Nethereum.Contracts.ContractHandlers;
using Nethereum.Web3;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Services;

namespace Examples.WebApi.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class BlockchainController : ControllerBase
{
    private readonly BlockhainService _blockchainService;
    private readonly ReserveService _reserveService;

    public BlockchainController(BlockhainService blockchainService, ReserveService reserveService)
    {
        _blockchainService = blockchainService;
        _reserveService = reserveService;
    }

    [HttpPost("transaction")]
    public async Task<EthereumTransaction> CreateTransaction([FromBody] ReserveTransactionRequest data)
    {

        decimal totalEuros = (await _reserveService.CalculateTotalByReserveId(data.ReserveId)) /100m;//100m aquí porque el metodo se usa en otros endpoint

        string ethNetworkUrl = Environment.GetEnvironmentVariable("NetworkUrl");
        if (string.IsNullOrEmpty(ethNetworkUrl))
        {
            throw new InvalidOperationException("La variable de entorno 'NetworkUrl' no está configurada.");
        }

        var transactionRequest = new CreateTransactionRequest
        {
            NetworkUrl = ethNetworkUrl,
            Euros = totalEuros
        };

        var ethereumTransaction = await _blockchainService.GetEthereumInfoAsync(transactionRequest);

        decimal ethPriceInEuros = await _blockchainService.GetEthereumPriceInEurosAsync(); 
        decimal equivalentEth = totalEuros / ethPriceInEuros;

        ethereumTransaction.TotalEuros = totalEuros;
        ethereumTransaction.EquivalentEthereum = equivalentEth.ToString("0.000000");

        return ethereumTransaction;
    }

    [HttpPost("check")]
    public Task<bool> CheckTransactionAsync([FromBody] CheckTransactionRequest data)
    {
        return _blockchainService.CheckTransactionAsync(data);
    }
}
