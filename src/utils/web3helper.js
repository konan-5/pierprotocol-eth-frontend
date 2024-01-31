import Web3 from 'web3';
import { ERC20, PierMarketplace } from './abi';
import { tokenInfos } from './tokenList';

const provider = "https://ethereum-sepolia.publicnode.com"

NEXT_PUBLIC_PIER_MARKETPLACE="0xF2B20aD0E924ffe531E52227A8364Ec338A36358"

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
    const response = await tokenContract.methods.approve(NEXT_PUBLIC_PIER_MARKETPLACE, tokenAmountToSell * (10 ** decimals)).send({ from: accounts[0] });
    console.log(response)

    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, NEXT_PUBLIC_PIER_MARKETPLACE)
    const listStatus = await pierMarketplaceContract.methods.listTokenForSale(tokenAddress, tokenAmountToSell * (10 ** decimals), sellPriceInWei * (10 ** 18), accounts[0]).send({ from: accounts[0] })
    console.log(listStatus)
}

async function book(sellTokenInfo, forTokenInfo, sellTokenAmount, forTokenamount) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const tokenContract = new web3.eth.Contract(ERC20, sellTokenInfo.address);
    const response = await tokenContract.methods.approve(NEXT_PUBLIC_PIER_MARKETPLACE, sellTokenAmount * (10 ** sellTokenInfo.decimals)).send({from: accounts[0]});
    console.log(response);

    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, NEXT_PUBLIC_PIER_MARKETPLACE)
    const status = await pierMarketplaceContract.methods.book(sellTokenInfo.address, sellTokenAmount * (10 ** sellTokenInfo.decimals), forTokenInfo.address, forTokenamount * (10 ** forTokenInfo.decimals)).send({from: accounts[0]});
    console.log(status)
}

async function fetchSellTokenList() {
    const web3 = new Web3(provider);
    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, NEXT_PUBLIC_PIER_MARKETPLACE)
    const waiter = Number(await pierMarketplaceContract.methods.wtsListingCount().call())
    console.log(waiter)
    const waiterList = []
    for (let i = 1; i <= waiter; i++) {
        const wts = await pierMarketplaceContract.methods.wtsListings(i).call();
        const decimals = tokenInfos[wts[0]]["decimals"]
        const seller = `${wts[1]}`
        waiterList.push({
            id: i,
            token: {
                logo: tokenInfos[wts[0]]["logo"],
                title: tokenInfos[wts[0]]["name"],
                subtitle: tokenInfos[wts[0]]["symbol"]
            },
            tokenPrice: parseFloat(((Number(wts[3]) / (10 ** 18)) / (Number(wts[2]) / (10 ** decimals))).toFixed(8)),
            tokenAmount: Number(wts[2]) / (10 ** decimals),
            totalPrice: Number(wts[3]) / (10 ** decimals),
            seller: `${seller.substring(0, 5)}...${seller.substring(seller.length - 5)}`,
        })
    }
    return waiterList;
}

// async function fetchBookList() {
//     const web3 = new Web3(provider);
//     const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, NEXT_PUBLIC_PIER_MARKETPLACE)
//     console.log(pierMarketplaceContract)
//     const bookCount = Number(await pierMarketplaceContract.methods.bookCount().call())
//     for (let i = 1; i <= bookCount; i ++) {
//         const book = await pierMarketplaceContract.methods.bookList(i).call();
//         const sellTokenInfo = tokenInfos.find((item) => item.address == book[1])
//         const forTokenInfo = tokenInfos.find((item) => item.address == book[3]);
//         console.log(book, sellTokenInfo, forTokenInfo)
//     }
// }

async function* fetchBookList() {
    const web3 = new Web3(provider);
    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, NEXT_PUBLIC_PIER_MARKETPLACE);
    const bookCount = Number(await pierMarketplaceContract.methods.bookCount().call());

    for (let i = 1; i <= bookCount; i++) {
        const book = await pierMarketplaceContract.methods.bookList(i).call();
        const sellTokenInfo = tokenInfos.find((item) => item.address === book[1]);
        const forTokenInfo = tokenInfos.find((item) => item.address === book[3]);

        // Use `yield` to return each book's data immediately
        yield {
            id: i,
            book: book,
            sellTokenInfo: sellTokenInfo,
            forTokenInfo: forTokenInfo,
            sellTokenAmount: Number(book[2]) / (10 ** sellTokenInfo.decimals),
            forTokenAmount: Number(book[4]) / (10 ** sellTokenInfo.decimals),
            isActive: book[5],
        };
    }
}

async function fetchBook (id) {
    const web3 = new Web3(provider);
    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, NEXT_PUBLIC_PIER_MARKETPLACE);
    const bookCount = Number(await pierMarketplaceContract.methods.bookCount().call());

    const book = await pierMarketplaceContract.methods.bookList(id).call();
    const sellTokenInfo = tokenInfos.find((item) => item.address === book[1]);
    const forTokenInfo = tokenInfos.find((item) => item.address === book[3]);

    // Use `yield` to return each book's data immediately
    return {
        id: id,
        book: book,
        sellTokenInfo: sellTokenInfo,
        forTokenInfo: forTokenInfo,
        sellTokenAmount: Number(book[2]) / (10 ** sellTokenInfo.decimals),
        forTokenAmount: Number(book[4]) / (10 ** sellTokenInfo.decimals),
        isActive: book[5],
    };
}

async function buyBook (book, percent) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const tokenContract = new web3.eth.Contract(ERC20, book.forTokenInfo.address);
    const response = await tokenContract.methods.approve(NEXT_PUBLIC_PIER_MARKETPLACE, book.forTokenAmount * (10 ** book.forTokenInfo.decimals)).send({from: accounts[0]});
    console.log(response)
    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, NEXT_PUBLIC_PIER_MARKETPLACE)
    // const status = await pierMarketplaceContract.methods.book(sellTokenInfo.address, sellTokenAmount * (10 ** sellTokenInfo.decimals), forTokenInfo.address, forTokenamount * (10 ** forTokenInfo.decimals)).send({from: accounts[0]});
    console.log(book.id, percent)
    const status = await pierMarketplaceContract.methods.buyToken(book.id, percent).send({from: accounts[0]})
    console.log(status)
}

export { getTokenDetails, orderTokenForSell, fetchSellTokenList, book, fetchBookList, fetchBook, buyBook }
