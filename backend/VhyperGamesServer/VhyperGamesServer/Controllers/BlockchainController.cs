using System.Numerics;
using System.Web;
using Examples.WebApi.Models.Dtos;
using Examples.WebApi.Services.Blockchain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nethereum.Contracts;
using Nethereum.Contracts.ContractHandlers;
using Nethereum.Web3;

namespace Examples.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BlockchainController : ControllerBase
{
    private readonly BlockhainService _blockchainService;

    public BlockchainController(BlockhainService blockchainService)
    {
        _blockchainService = blockchainService;
    }

    [HttpGet]
    public Task<Erc20ContractDto> GetContractInfoAsync([FromQuery] ContractInfoRequest data)
    {
        return _blockchainService.GetContractInfoAsync(data.NetworkUrl, data.ContractAddress);
    }

    [HttpPost("transaction")]
    public Task<EthereumTransaction> CreateTransaction([FromBody] CreateTransactionRequest data)
    {
        data.NetworkUrl = HttpUtility.UrlDecode(data.NetworkUrl);

        return _blockchainService.GetEthereumInfoAsync(data);
    }
    
    [HttpPost("check")]
    public Task<bool> CheckTransactionAsync([FromBody] CheckTransactionRequest data)
    {
        return _blockchainService.CheckTransactionAsync(data);
    }
}
