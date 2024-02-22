import Web3 from 'web3';
import { ERC20, PierMarketplace } from './abi';
import { defaultTokenInfos } from './tokenList';
import axios from 'axios';
import { useSelector } from "react-redux";
import { getAllFire } from './firebase';

// const provider = "https://ethereum-sepolia.publicnode.com"
const providerInfo = {
    "Optimism": "https://opt-mainnet.g.alchemy.com/v2/nRz4mGrUbXWEm_tTKlIFbxcn3KCqIO17",
    "Ethereum": "https://eth-mainnet.g.alchemy.com/v2/xRpnmvup4LCr2mL9lNqqpKnHQJepfeSc",
    "Arbitrum": "https://arb-mainnet.g.alchemy.com/v2/EG83x-cSn3_otO7KBnqnG0ws3mt5fnLP",
    "Base": "https://base-mainnet.g.alchemy.com/v2/mWNKTlIEj3AujVAvLytXLenxbEGhlhag",
    "ZkSync": "https://mainnet.era.zksync.io",
    "Scroll": "https://1rpc.io/scroll",
    "Linea": "https://linea.drpc.org",
}

const scanApiInfo = {
    "ZkSync": {
        "endpoint": "https://block-explorer-api.mainnet.zksync.io/api",
        "key": ""
    },
    "Optimism": {
        "endpoint": "https://api-optimistic.etherscan.io/api",
        "key": "W2FDXKHSX9PHEUYEUYV2FKPTJBM5C6FQ5V"
    },
    "Arbitrum": {
        "endpoint": "https://api.arbiscan.io/api",
        "key": "YA4NWMCW91HWUFYY8BP6FJYP1ES594SPHH"
    },
    "Ethereum": {
        "endpoint": "https://api.etherscan.io/api",
        "key": "KR5PMG4YFWFZJ997G8RKJA94YCFF2EBT8R",
    },
    "Base": {
        "endpoint": "https://api.basescan.org/api",
        "key": "T7MNKDRXM77S6TAW25XHQB4VNXITZR4R1Z"
    },
    "Scroll": {
        "endpoint": "https://api.scrollscan.com/api",
        "key": "MDDVVBGY7QFY6D34EB9P7DSGXAVS5SRDVY"
    },
    "Linea": {
        "endpoint": "https://api.lineascan.build/api",
        "key": "4EYQVJRXAQPCKKFCZXIQZQ1X6BHBIXM4ZK"
    }
}

const NEXT_PUBLIC_PIER_MARKETPLACE = "0x9ed4c32F668C2b0bA9F61F56d5DB106E6F687AD2"
const NEXT_PUBLIC_PIER_MARKETPLACE_ZKSYNC = "0xD47DBfc9553321AD8E2A4F8B4c5D919540DCD92e"

const getMarketplaceAddress = (network) => {

    console.log("get Markerplace address for: ", network);
    switch (network) {
        case "Ethereum":
            return NEXT_PUBLIC_PIER_MARKETPLACE
        case "ZkSync":
            return NEXT_PUBLIC_PIER_MARKETPLACE_ZKSYNC
        default:
            return NEXT_PUBLIC_PIER_MARKETPLACE
    }

}



async function getTokenDetails(tokenAddress) {
    try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const tokenContract = new web3.eth.Contract(ERC20, tokenAddress);
        const name = await tokenContract.methods.name().call();
        const symbol = await tokenContract.methods.symbol().call();
        const decimals = Number(await tokenContract.methods.decimals().call());
        const balance = Number(BigInt(await tokenContract.methods.balanceOf(accounts[0]).call()) / BigInt(`1${"0".repeat(decimals)}`));
        return [name, symbol, balance, decimals]
    } catch (error) {
        return [null, null, null, null]
    }
}

async function orderTokenForSell(tokenAddress, tokenAmountToSell, sellPriceInWei, network) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const tokenContract = new web3.eth.Contract(ERC20, tokenAddress);
    const decimals = Number(await tokenContract.methods.decimals().call());
    const response = await tokenContract.methods.approve(getMarketplaceAddress(network), tokenAmountToSell * (10 ** decimals)).send({ from: accounts[0] });

    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, getMarketplaceAddress(network))
    const listStatus = await pierMarketplaceContract.methods.listTokenForSale(tokenAddress, tokenAmountToSell * (10 ** decimals), sellPriceInWei * (10 ** 18), accounts[0]).send({ from: accounts[0] })
}

async function book(sellTokenInfo, forTokenInfo, sellTokenAmount, forTokenamount, network) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const tokenContract = new web3.eth.Contract(ERC20, sellTokenInfo.address);
    const response = await tokenContract.methods.approve(getMarketplaceAddress(network), sellTokenAmount * (10 ** sellTokenInfo.decimals)).send({ from: accounts[0] });

    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, getMarketplaceAddress(network))
    const status = await pierMarketplaceContract.methods.book(sellTokenInfo.address, sellTokenAmount * (10 ** sellTokenInfo.decimals), forTokenInfo.address, forTokenamount * (10 ** forTokenInfo.decimals)).send({ from: accounts[0] });
}

async function fetchSellTokenList(network) {
    const provider = providerInfo[network]
    const web3 = new Web3(provider);
    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, getMarketplaceAddress(network))
    const waiter = Number(await pierMarketplaceContract.methods.wtsListingCount().call())
    const waiterList = []
    for (let i = waiter; i > 0; i--) {
        const wts = await pierMarketplaceContract.methods.wtsListings(i).call();
        const decimals = defaultTokenInfos[wts[0]]["decimals"]
        const seller = `${wts[1]}`
        waiterList.push({
            id: i,
            token: {
                logo: defaultTokenInfos[wts[0]]["logo"],
                title: defaultTokenInfos[wts[0]]["name"],
                subtitle: defaultTokenInfos[wts[0]]["symbol"]
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
//     const bookCount = Number(await pierMarketplaceContract.methods.bookCount().call())
//     for (let i = 1; i <= bookCount; i ++) {
//         const book = await pierMarketplaceContract.methods.bookList(i).call();
//         const sellTokenInfo = tokenInfos.find((item) => item.address == book[1])
//         const forTokenInfo = tokenInfos.find((item) => item.address == book[3]);
//     }
// }

async function* fetchBookList(network) {
    console.log("network: ", getMarketplaceAddress(network));
    const tokenInfos = await getAllFire()
    const provider = providerInfo[network]
    const web3 = new Web3(provider);
    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, getMarketplaceAddress(network));
    const bookCount = Number(await pierMarketplaceContract.methods.bookCount().call());

    for (let i = 1; i <= bookCount; i++) {
        const book = await pierMarketplaceContract.methods.bookList(i).call();
        const sellTokenInfo = tokenInfos.find((item) => item.address.toLowerCase() === book[1].toLowerCase());
        const forTokenInfo = tokenInfos.find((item) => item.address.toLowerCase() === book[3].toLowerCase());

        // Use `yield` to return each book's data immediately
        yield {
            id: i,
            book: book,
            sellTokenInfo: sellTokenInfo,
            forTokenInfo: forTokenInfo,
            sellTokenAmount: Number(book[2]) / (10 ** sellTokenInfo.decimals),
            forTokenAmount: Number(book[4]) / (10 ** forTokenInfo.decimals),
            isActive: book[5],
        };
    }
}

async function fetchBook(id, network) {
    const tokenInfos = await getAllFire()
    const provider = providerInfo[network]
    const web3 = new Web3(provider);
    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, getMarketplaceAddress(network));
    const bookCount = Number(await pierMarketplaceContract.methods.bookCount().call());

    const book = await pierMarketplaceContract.methods.bookList(id).call();
    const sellTokenInfo = tokenInfos.find((item) => item.address.toLowerCase() === book[1].toLowerCase());
    const forTokenInfo = tokenInfos.find((item) => item.address.toLowerCase() === book[3].toLowerCase());

    // Use `yield` to return each book's data immediately
    return {
        id: id,
        book: book,
        sellTokenInfo: sellTokenInfo,
        forTokenInfo: forTokenInfo,
        sellTokenAmount: Number(book[2]) / (10 ** sellTokenInfo.decimals),
        forTokenAmount: Number(book[4]) / (10 ** forTokenInfo.decimals),
        isActive: book[5],
    };
}

async function buyBook(book, percent, network) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const tokenContract = new web3.eth.Contract(ERC20, book.forTokenInfo.address);
    const response = await tokenContract.methods.approve(getMarketplaceAddress(network), book.forTokenAmount * (10 ** book.forTokenInfo.decimals)).send({ from: accounts[0] });
    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, getMarketplaceAddress(network))
    // const status = await pierMarketplaceContract.methods.book(sellTokenInfo.address, sellTokenAmount * (10 ** sellTokenInfo.decimals), forTokenInfo.address, forTokenamount * (10 ** forTokenInfo.decimals)).send({from: accounts[0]});
    const status = await pierMarketplaceContract.methods.buyToken(book.id, percent).send({ from: accounts[0] })
}

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

function splitInto64LengthArray(hexString) {
    // Remove the "0x" prefix if it exists
    const cleanString = hexString.startsWith('0x') ? hexString.substring(2) : hexString;

    // Initialize an empty array to store the 64-length chunks
    let arrayOf64Length = [];

    // Loop through the cleaned string, stepping by 64 characters at a time
    for (let i = 0; i < cleanString.length; i += 64) {
        // Extract a 64-character chunk and add it to the array
        arrayOf64Length.push(`0x${cleanString.substring(i, i + 64)}`);
    }

    return arrayOf64Length;
}


// Function to convert hex values to decimal
function hexToDecimal(hexString) {
    return BigInt(hexString).toString(10);
}

function formatAddress(address) {
    const trimmedAddress = address.toLowerCase().replace(/^0x/, '');
    const paddedAddress = '0x' + trimmedAddress.substring(24);
    return paddedAddress;
}

// Function to convert hex timestamp to a human-readable date
function hexToDateTime(hexString) {
    const seconds = parseInt(hexString, 16);
    const date = new Date(seconds * 1000);
    return date.toUTCString(); // Converting to a human-readable format
}

async function fetchBookListBatch(ids, network) {
    const tokenInfos = await getAllFire()
    const provider = providerInfo[network]
    const web3 = new Web3(provider);
    const pierMarketplaceContract = new web3.eth.Contract(PierMarketplace, getMarketplaceAddress(network));

    // Create a promise for each book fetch operation
    const bookPromises = ids.map(async (id) => {
        const book = await pierMarketplaceContract.methods.bookList(id).call();
        const sellTokenInfo = tokenInfos.find((item) => item.address.toLowerCase() === book[1].toLowerCase());
        const forTokenInfo = tokenInfos.find((item) => item.address.toLowerCase() === book[3].toLowerCase());

        // Calculate token amounts considering their decimals
        const sellTokenAmount = Number(book[2]) / (10 ** sellTokenInfo.decimals);
        const forTokenAmount = Number(book[4]) / (10 ** forTokenInfo.decimals);

        return {
            id: id,
            book: book,
            sellTokenInfo: sellTokenInfo,
            forTokenInfo: forTokenInfo,
            sellTokenAmount: sellTokenAmount,
            forTokenAmount: forTokenAmount,
            isActive: book[5],
        };
    });

    // Wait for all promises to resolve and return the results
    return await Promise.all(bookPromises);
}

async function fetchActivity(network) {
    const tokenInfos = await getAllFire()
    // try {
    console.log("network: ", getMarketplaceAddress(network));
    const bookTopic = "0x40fa13892a154d5d335b7d020f62557c2b03f175d8c7a397f0578b72646bb24c"
    const buyTopic = "0x892605e5aa205718bf5422cbe570beb6c419fe374afe9a7f9c8fc114b99020a8"
    // https://api-sepolia.etherscan.io//api?module=logs&action=getLogs&toBlock=latest&address=${NEXT_PUBLIC_PIER_MARKETPLACE}&topic0=${topic0}&page=1&offset=1000&apikey=YourApiKeyToken
    let bookResponse = null;
    if (network === "ZkSync") {
        bookResponse = await axios.get(`${scanApiInfo[network]['endpoint']}?module=logs&action=getLogs&toBlock=latest&address=${getMarketplaceAddress(network)}&page=1&offset=1000`)
        //filter only bookResponse.data.result only if topics includes bookTopic
        bookResponse = {
            data: {
                result: bookResponse.data.result.filter((item) => item.topics.includes(bookTopic))
            }
        };
    } else {
        bookResponse = await axios.get(`${scanApiInfo[network]['endpoint']}?module=logs&action=getLogs&toBlock=latest&address=${getMarketplaceAddress(network)}&topic0=${bookTopic}&page=1&offset=1000&apikey=${scanApiInfo[network]['key']}`)
    }

    let bookActivitys = []
    for (let item of bookResponse.data.result) {
        const data = [...item.topics, ...splitInto64LengthArray(item.data)]
        if (data.length < 5) {
            continue;
        }
        const sellTokenInfo = tokenInfos.find((item) => item.address.toLowerCase() == formatAddress(data[3]))
        const forTokenInfo = tokenInfos.find((item) => item.address.toLowerCase() == formatAddress(data[5]))
        const bookActivity = {
            category: 'book',
            bookId: hexToDecimal(data[1]),
            seller: formatAddress(data[2]),
            buyer: "",
            sellTokenInfo: sellTokenInfo,
            sellTokenAmount: hexToDecimal(data[4]) / (10 ** sellTokenInfo.decimals),
            forTokenInfo: forTokenInfo,
            forTokenAmount: hexToDecimal(data[6]) / (10 ** forTokenInfo.decimals),
            timeStamp: hexToDateTime(item.timeStamp),
            unixTime: hexToDecimal(item.timeStamp)
        }
        bookActivitys.push(bookActivity)
    }

    let buyActivitys = []
    console.log(11111111111)
    let buyResponse = null;
    if (network === "ZkSync") {
        buyResponse = await axios.get(`${scanApiInfo[network]['endpoint']}?module=logs&action=getLogs&toBlock=latest&address=${getMarketplaceAddress(network)}&page=1&offset=1000`)
        buyResponse = {
            data: {
                result: bookResponse.data.result.filter((item) => item.topics.includes(buyTopic))
            }
        };
    } else {
        buyResponse = await axios.get(`${scanApiInfo[network]['endpoint']}?module=logs&action=getLogs&toBlock=latest&address=${getMarketplaceAddress(network)}&topic0=${buyTopic}&page=1&offset=1000&apikey=${scanApiInfo[network]['key']}`)
    }
    //const buyResponse = await axios.get(`${scanApiInfo[network]['endpoint']}?module=logs&action=getLogs&toBlock=latest&address=${NEXT_PUBLIC_PIER_MARKETPLACE}&topic0=${buyTopic}&page=1&offset=1000&apikey=${scanApiInfo[network]['key']}`)
    console.log(buyResponse.data.result, 2222222222222)
    let bookIds = []

    for (let item of buyResponse.data.result) {
        const data = [...item.topics, ...splitInto64LengthArray(item.data)]
        const bookId = hexToDecimal(data[1])
        const buyActivity = {
            category: 'buy',
            bookId: bookId,
            seller: formatAddress(data[2]),
            buyer: formatAddress(data[3]),
            sellTokenAmount: hexToDecimal(data[4]),
            forTokenAmount: hexToDecimal(data[5]),
            timeStamp: hexToDateTime(item.timeStamp),
            unixTime: hexToDecimal(item.timeStamp)
        }
        buyActivitys.push(buyActivity)
        bookIds.push(bookId)
    }

    const bookList = await fetchBookListBatch(bookIds, network)
    for (let idx in buyActivitys) {
        buyActivitys[idx].sellTokenInfo = bookList[idx].sellTokenInfo
        buyActivitys[idx].forTokenInfo = bookList[idx].forTokenInfo
        buyActivitys[idx].sellTokenAmount = buyActivitys[idx].sellTokenAmount / (10 ** bookList[idx].sellTokenInfo.decimals)
        buyActivitys[idx].forTokenAmount = buyActivitys[idx].forTokenAmount / (10 ** bookList[idx].forTokenInfo.decimals)
    }

    const activitys = [...bookActivitys, ...buyActivitys]
    console.log(activitys)

    return activitys.sort((a, b) => b.unixTime - a.unixTime)
    // } catch (error) {
    //     console.log(error)
    //     return []
    // }
}

export { getTokenDetails, orderTokenForSell, fetchSellTokenList, book, fetchBookList, fetchBook, buyBook, fetchActivity }
