import Web3 from 'web3';
import { ERC20 } from './abi';

// const provider = "https://ethereum-sepolia.publicnode.com"
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

export { getTokenDetails }
