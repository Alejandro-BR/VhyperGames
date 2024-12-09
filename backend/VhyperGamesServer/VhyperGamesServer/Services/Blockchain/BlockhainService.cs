using System.Numerics;
using Examples.WebApi.Models.Dtos;
using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
using Nethereum.Web3;

namespace Examples.WebApi.Services.Blockchain;

public class BlockhainService
{

    public async Task<EthereumTransaction> GetEthereumInfoAsync(CreateTransactionRequest data)
    {
        CoinGeckoApi coinGeckoApi = new CoinGeckoApi();
        EthereumService ethereumService = new EthereumService(data.NetworkUrl);

        decimal ethEurPrice = await coinGeckoApi.GetEthereumPriceAsync();
        BigInteger value = ethereumService.ToWei(data.Euros / ethEurPrice);
        HexBigInteger gas = ethereumService.GetGas();
        HexBigInteger gasPrice = await ethereumService.GetGasPriceAsync();

        if (string.IsNullOrEmpty(data.NetworkUrl))
        {
            throw new ArgumentNullException(nameof(data.NetworkUrl), "La URL de la red es nula o está vacía.");
        }

        string walletAddress = Environment.GetEnvironmentVariable("METAMASK_WALLET");
        if (string.IsNullOrEmpty(walletAddress))
        {
            throw new InvalidOperationException("La variable de entorno 'METAMASK_WALLET' no está configurada.");
        }

        Web3 web3 = new Web3(data.NetworkUrl);
        return new EthereumTransaction
        {
            To = walletAddress,
            Value = new HexBigInteger(value).HexValue,
            Gas = gas.HexValue,
            GasPrice = gasPrice.HexValue,
        };
    }
    public async Task<decimal> GetEthereumPriceInEurosAsync()
    {
        CoinGeckoApi coinGeckoApi = new CoinGeckoApi();
        return await coinGeckoApi.GetEthereumPriceAsync();
    }

    public Task<bool> CheckTransactionAsync(CheckTransactionRequest data)
    {

        string ethNetworkUrl = Environment.GetEnvironmentVariable("NetworkUrl");
        if (string.IsNullOrEmpty(ethNetworkUrl))
        {
            throw new InvalidOperationException("La variable de entorno 'NetworkUrl' no está configurada.");
        }

        string walletAddress = Environment.GetEnvironmentVariable("METAMASK_WALLET");
        if (string.IsNullOrEmpty(walletAddress))
        {
            throw new InvalidOperationException("La variable de entorno 'METAMASK_WALLET' no está configurada.");
        }
        data.To = walletAddress;

        EthereumService ethereumService = new EthereumService(ethNetworkUrl);

        return ethereumService.CheckTransactionAsync(data.Hash, data.From, data.To, data.Value); 
    }
   
}
