import Web3 from 'web3';
import { ERC20, PierMarketplace } from './abi';
import { tokenInfo } from './tokenList';

const provider = "https://ethereum-sepolia.publicnode.com"

async function getTokenDetails(tokenAddress) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const tokenContract = new web3.eth.Contract(ERC20, tokenAddress);
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const decimals = Number(await tokenContract.methods.decimals().call());
    const balance = Number(BigInt(await tokenContract.methods.balanceOf(accounts[0]).call()) / BigInt(`1${"0".repeat(decimals)}`));
    return [name, symbol, balance]
}

async function orderTokenForSell(tokenAddress, tokenAmountToSell, sellPriceInWei) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const tokenContract = new web3.eth.Contract(ERC20, tokenAddress);
    const decimals = Number(await tokenContract.methods.decimals().call());
    const response = await tokenContract.methods.approve(process.env.NEXT_PUBLIC_PIER_MARKETPLACE, tokenAmountToSell * (10 ** decimals)).send({ from: accounts[0] });
    console.log(response)

    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, process.env.NEXT_PUBLIC_PIER_MARKETPLACE)
    const listStatus = await pierMarketplaceContract.methods.listTokenForSale(tokenAddress, tokenAmountToSell * (10 ** decimals), sellPriceInWei * (10 ** 18), accounts[0]).send({ from: accounts[0] })
    console.log(listStatus)
}


async function fetchSellTokenList() {
    const web3 = new Web3(provider);
    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, process.env.NEXT_PUBLIC_PIER_MARKETPLACE)
    const waiter = Number(await pierMarketplaceContract.methods.wtsListingCount().call())
    console.log(waiter)
    const waiterList = []
    for (let i = 1; i <= waiter; i++) {
        const wts = await pierMarketplaceContract.methods.wtsListings(i).call();
        const decimals = tokenInfo[wts[0]]["decimals"]
        waiterList.push({
            id: i,
            token: {
                logo: tokenInfo[wts[0]]["logo"],
                title: tokenInfo[wts[0]]["name"],
                subtitle: tokenInfo[wts[0]]["symbol"]
            },
            tokenPrice: Number(wts[3] / wts[2]) / (10 ** decimals),
            tokenAmount: Number(wts[2]) / (10 ** decimals),
            totalPrice: Number(wts[3]) / (10 ** decimals),
            seler: wts[1],
        })
    }
    return waiterList;
}

export { getTokenDetails, orderTokenForSell, fetchSellTokenList }
