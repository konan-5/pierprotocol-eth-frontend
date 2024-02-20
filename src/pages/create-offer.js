import OtherHeader from '@/components/global/OtherHeader'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'
import { networkSvgs } from '@/utils/svg';
import { defaultTokenInfos } from '@/utils/tokenList';
import Web3 from 'web3';
import { book, fetchBookList, getTokenDetails } from '@/utils/web3helper';
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from 'react-redux';
import { networks } from '@/utils/constants';

export default function CreateOffer() {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const dispatch = useDispatch();

    const [customSellTokenAddress, setCustomSellTokenAddress] = useState("")
    const [customForTokenAddress, setCustomForTokenAddress] = useState("")
    const [customSellToken, setCustomSellToken] = useState("")
    const [customForToken, setCustomForToken] = useState("")

    const router = useRouter();

    const [tabStatus, setTabStatus] = useState('network');
    // const [network, setNetwork] = useState(networks[0]);
    const network = useSelector((state) => state.app.network);
    const setNetwork = (newNetwork) => dispatch({ type: 'SET_NETWORK', payload: newNetwork });

    const defaultTokens = defaultTokenInfos.filter((token) => token.network == network)

    const [sellingToken, setSellingToken] = useState(defaultTokens[0].symbol);
    const [forToken, setForToken] = useState(defaultTokens[1].symbol);

    const [isNetworkOpen, setIsNetworkOpen] = useState(false);
    const networkDropdownRef = useRef(null);

    const [isSellingTokenOpen, setIsSellingTokenOpen] = useState(false);
    const sellingTokenDropdownRef = useRef(null);

    const [isForTokenOpen, setIsForTokenOpen] = useState(false);
    const forTokenDropdownRef = useRef(null);

    const [sellTokenAmount, setSellTokenAmount] = useState(null);
    const [forTokenAmount, setForTokenAmount] = useState(null);

    const networkToggleDropdown = () => setIsNetworkOpen(!isNetworkOpen);
    const sellingTokenToggleDropdown = () => setIsSellingTokenOpen(!isSellingTokenOpen);
    const forTokenToggleDropdown = () => setIsForTokenOpen(!isForTokenOpen);

    const [booking, setBooking] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            checkIfWalletIsConnected();
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        } else {
            console.log("Please install MetaMask!");
        }

        // Clean up
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);

    const saveUpdateToken = (tokenInfo, tokenAddress) => {
        let localTokenInfos = JSON.parse(localStorage.getItem["tokenInfo"])
        if (localTokenInfos) {
            if (!localTokenInfos.findIndex((a) => a.address == tokenAddress))
                localStorage.setItem("tokenInfo", JSON.stringify([{
                    network,
                    address: tokenAddress,
                    name: tokenInfo[0],
                    symbol: tokenInfo[1],
                    decimals: tokenInfo[3],
                }, ...localTokenInfos]))
        } else {
            localStorage.setItem("tokenInfo", JSON.stringify([{
                network,
                address: tokenAddress,
                name: tokenInfo[0],
                symbol: tokenInfo[1],
                decimals: tokenInfo[3],
            }]))
        }
    }

    useEffect(() => {
        async function getToken() {
            const tokenInfo = await getTokenDetails(customForTokenAddress)
            if (tokenInfo[1]) {
                setCustomForToken(tokenInfo[1])
                saveUpdateToken(tokenInfo, customForTokenAddress)
            }
        }
        if (customForTokenAddress.length == 42) {
            getToken()
        } else {
            setCustomForToken("")
        }
    }, [customForTokenAddress])

    useEffect(() => {
        console.log(customSellTokenAddress)
        async function getToken() {
            const tokenInfo = await getTokenDetails(customSellTokenAddress)
            if (tokenInfo[1]) {
                setCustomSellToken(tokenInfo[1])
            }
            saveUpdateToken(tokenInfo, customSellTokenAddress)
        }
        if (customSellTokenAddress.length == 42) {
            getToken()
        } else {
            setCustomSellToken("")
        }
    }, [customSellTokenAddress])

    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            // Wallet is disconnected or the user has switched accounts
            setIsConnected(false);
            setAccounts([]);
        } else {
            setAccounts(accounts);
            setIsConnected(true);
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                setAccounts(accounts);
                setIsConnected(true);
            } else {
                console.log('not connected')
            }
        } catch (error) {
            console.error("Error checking wallet connection", error);
        }
    };

    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccounts(accounts);
            setIsConnected(true);
        } catch (error) {
            console.error("Error connecting to MetaMask", error);
        }
    };

    const handleClickOutside = (event) => {
        if (networkDropdownRef.current && !networkDropdownRef.current.contains(event.target)) {
            setIsNetworkOpen(false);
        }
        if (sellingTokenDropdownRef.current && !sellingTokenDropdownRef.current.contains(event.target)) {
            setIsSellingTokenOpen(false);
        }
        if (forTokenDropdownRef.current && !forTokenDropdownRef.current.contains(event.target)) {
            setIsForTokenOpen(false);
        }
    };

    const sellToken = async () => {
        try {
            setBooking(true)
            if (!isConnected) {
                await connectWallet()
            }
            const sellTokenInfo = defaultTokens.find(item => item.symbol == sellingToken)
            const forTokenInfo = defaultTokens.find(item => item.symbol == forToken)
            console.log(network, sellTokenInfo, forTokenInfo, sellTokenAmount, forTokenAmount)
            await book(sellTokenInfo, forTokenInfo, sellTokenAmount, forTokenAmount, network)
            router.push("/dashboard")
        } catch {

        } finally {
            setBooking(false)
        }
    }

    useEffect(() => {
        setSellTokenAmount(null)
        setForTokenAmount(null)
        setSellingToken(defaultTokens[0].symbol)
        setForToken(defaultTokens[1].symbol)
    }, [network])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Pier Protocol Create Offer</title>
            </Head>
            <main id="other-wrapper" className='list-wrapper'>
                <OtherHeader />
                <div className='create-offer'>
                    <div className='title'>
                        <span>CREATE OFFER</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.7492" cy="11.55" r="11.55" fill="url(#paint0_linear_0_1)" />
                            <path d="M12.9202 16.4024L10.174 16.4024L6.16023 6.84336L9.16394 6.84336L11.5207 13.1545L11.3755 13.0554L11.7254 13.0554L11.5735 13.1545L13.9369 6.84336L16.934 6.84336L12.9202 16.4024Z" fill="white" />
                            <defs>
                                <linearGradient id="paint0_linear_0_1" x1="26.4242" y1="11.4172" x2="-3.60078" y2="11.4172" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5200FF" />
                                    <stop offset="1" stop-color="#58ADFE" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className='body'>
                        <div className='steps'>
                            <div className='step1'>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="15" cy="15" r="15" fill="url(#paint0_linear_0_1)" />
                                    <path d="M17.0916 8.36364V20H14.6314V10.6989H14.5632L11.8984 12.3693V10.1875L14.7791 8.36364H17.0916Z" fill="white" />
                                    <defs>
                                        <linearGradient id="paint0_linear_0_1" x1="34.0584" y1="14.8276" x2="-4.93507" y2="14.8276" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#5200FF" />
                                            <stop offset="1" stop-color="#58ADFE" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <span>Network & Sell</span>
                            </div>
                            <div className='step-line'></div>
                            <div className='step2'>
                                {
                                    tabStatus == 'network' ?
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="15" cy="15" r="15" fill="#D9D9D9" fill-opacity="0.05" />
                                            <circle cx="15" cy="15" r="14.5" stroke="white" stroke-opacity="0.1" />
                                            <path d="M11.4041 20V18.2273L15.5462 14.392C15.8984 14.0511 16.1939 13.7443 16.4325 13.4716C16.675 13.1989 16.8587 12.9318 16.9837 12.6705C17.1087 12.4053 17.1712 12.1193 17.1712 11.8125C17.1712 11.4716 17.0935 11.178 16.9382 10.9318C16.7829 10.6818 16.5708 10.4905 16.3018 10.358C16.0329 10.2216 15.728 10.1534 15.3871 10.1534C15.031 10.1534 14.7204 10.2254 14.4553 10.3693C14.1901 10.5133 13.9856 10.7197 13.8416 10.9886C13.6977 11.2576 13.6257 11.5777 13.6257 11.9489H11.2905C11.2905 11.1875 11.4628 10.5265 11.8075 9.96591C12.1522 9.4053 12.6352 8.97159 13.2564 8.66477C13.8776 8.35795 14.5935 8.20455 15.4041 8.20455C16.2375 8.20455 16.9628 8.35227 17.5803 8.64773C18.2015 8.93939 18.6844 9.3447 19.0291 9.86364C19.3738 10.3826 19.5462 10.9773 19.5462 11.6477C19.5462 12.0871 19.459 12.5208 19.2848 12.9489C19.1143 13.3769 18.8094 13.8523 18.37 14.375C17.9306 14.8939 17.3113 15.517 16.5121 16.2443L14.8132 17.9091V17.9886H19.6996V20H11.4041Z" fill="white" />
                                        </svg> :
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="15" cy="15" r="15" fill="url(#paint0_linear_0_1)" />
                                            <path d="M11.4041 20V18.2273L15.5462 14.392C15.8984 14.0511 16.1939 13.7443 16.4325 13.4716C16.675 13.1989 16.8587 12.9318 16.9837 12.6705C17.1087 12.4053 17.1712 12.1193 17.1712 11.8125C17.1712 11.4716 17.0935 11.178 16.9382 10.9318C16.7829 10.6818 16.5708 10.4905 16.3018 10.358C16.0329 10.2216 15.728 10.1534 15.3871 10.1534C15.031 10.1534 14.7204 10.2254 14.4553 10.3693C14.1901 10.5133 13.9856 10.7197 13.8416 10.9886C13.6977 11.2576 13.6257 11.5777 13.6257 11.9489H11.2905C11.2905 11.1875 11.4628 10.5265 11.8075 9.96591C12.1522 9.4053 12.6352 8.97159 13.2564 8.66477C13.8776 8.35795 14.5935 8.20455 15.4041 8.20455C16.2375 8.20455 16.9628 8.35227 17.5803 8.64773C18.2015 8.93939 18.6844 9.3447 19.0291 9.86364C19.3738 10.3826 19.5462 10.9773 19.5462 11.6477C19.5462 12.0871 19.459 12.5208 19.2848 12.9489C19.1143 13.3769 18.8094 13.8523 18.37 14.375C17.9306 14.8939 17.3113 15.517 16.5121 16.2443L14.8132 17.9091V17.9886H19.6996V20H11.4041Z" fill="white" />
                                            <defs>
                                                <linearGradient id="paint0_linear_0_1" x1="34.0584" y1="14.8276" x2="-4.93507" y2="14.8276" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#5200FF" />
                                                    <stop offset="1" stop-color="#58ADFE" />
                                                </linearGradient>
                                            </defs>
                                        </svg>


                                }
                                <span>Amount & Sell</span>
                            </div>
                        </div>
                        {
                            tabStatus == 'network' ?
                                <div className='network'>
                                    <div className='description'>
                                        On which network you want to sell your coins?
                                    </div>
                                    <div>
                                        Network
                                    </div>
                                    <div ref={networkDropdownRef} className='select-network'>
                                        <div className='selected-network' onClick={networkToggleDropdown}>
                                            <div className='logo'>
                                                {networkSvgs[network]}
                                            </div>
                                            <span>{network}</span>
                                        </div>
                                        {isNetworkOpen && (
                                            <ul>
                                                {networks.map(network => (
                                                    <li key={network} onClick={() => { setIsNetworkOpen(false); setNetwork(network); }}>
                                                        <div className='logo'>
                                                            {networkSvgs[network]}
                                                        </div>
                                                        <span>{network}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className='navigate-button'>
                                        <button className='back' onClick={() => router.push("/dashboard")}>
                                            Back
                                        </button>
                                        <button className='next' onClick={() => setTabStatus('token')}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className='network'>
                                    <div className='description'>
                                        How many you want to sell?
                                    </div>

                                    <div className='sell'>
                                        <div className='label'>Selling</div>
                                        <div className='input-area'>
                                            <input placeholder='Enter amount' onChange={(e) => setSellTokenAmount(e.target.value)} type='number' value={sellTokenAmount} />
                                            <div className='selling-dropdown'>
                                                <div className='token-dropdown' onClick={sellingTokenToggleDropdown}>
                                                    <span>
                                                        {sellingToken}
                                                    </span>
                                                    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L5.5 6L10 1" stroke="#FEFEFE" stroke-opacity="0.1" stroke-linecap="round" />
                                                    </svg>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='for'>
                                        <div className='label'>For</div>
                                        <div className='input-area'>
                                            <input placeholder='Enter amount' onChange={(e) => setForTokenAmount(e.target.value)} type='number' value={forTokenAmount} />
                                            <div className='for-dropdown'>
                                                <div className='for-dropdown'>
                                                    <div className='token-dropdown' onClick={forTokenToggleDropdown}>
                                                        <span>
                                                            {forToken}
                                                        </span>
                                                        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 1L5.5 6L10 1" stroke="#FEFEFE" stroke-opacity="0.1" stroke-linecap="round" />
                                                        </svg>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        booking ?
                                            // <div className='navigate-button'>
                                            //     <button className='back' onClick={() => setTabStatus('network')}>
                                            //         Back
                                            //     </button>
                                            //     <button className='next' onClick={sellToken}>
                                            //         Sell
                                            //     </button>
                                            // </div> :
                                            <div className='navigate-button'>
                                                <button className='back' onClick={() => setTabStatus('network')} disabled>
                                                    {/* <div className='spin'>
                                                    </div> */}
                                                    Back
                                                </button>
                                                <button className='next' onClick={sellToken} disabled>
                                                    {/* <div className='spin'>loading...</div> */}
                                                    Sell
                                                </button>
                                            </div>
                                            : <div className='navigate-button'>
                                                <button className='back' onClick={() => setTabStatus('network')}>
                                                    Back
                                                </button>
                                                <button className='next' onClick={sellToken}>
                                                    Sell
                                                </button>
                                            </div>
                                    }
                                </div>
                        }
                        {isSellingTokenOpen &&
                            (
                                <div className='select-token'>
                                    <div className='select-token-modal' ref={sellingTokenDropdownRef}>
                                        <h5 className="select-token-title">Select Token</h5>
                                        <div className='custom-token'>
                                            <input placeholder='Custom token address' onChange={(e) => { setCustomSellTokenAddress(e.target.value) }} />
                                        </div>
                                        <ul className="select-token-list">
                                            {
                                                customSellToken ?
                                                    <li onClick={() => {
                                                        setIsSellingTokenOpen(false);
                                                        setSellingToken(customSellToken);
                                                        // if (forToken == tokenInfo.symbol) {
                                                        //     setForToken(tokens.find((ktem) => ktem.symbol != tokenInfo.symbol).symbol)
                                                        // }
                                                    }}>
                                                        <span>{customSellToken}</span>
                                                    </li>
                                                    :
                                                    <>
                                                        {defaultTokenInfos.filter((item) => item.network == network).map(tokenInfo => (
                                                            <li key={tokenInfo.symbol} onClick={() => {
                                                                setIsSellingTokenOpen(false);
                                                                setSellingToken(tokenInfo.symbol);
                                                                if (forToken == tokenInfo.symbol) {
                                                                    setForToken(defaultTokens.find((ktem) => ktem.symbol != tokenInfo.symbol).symbol)
                                                                }
                                                            }}>
                                                                <span>{tokenInfo.symbol}</span>
                                                            </li>
                                                        ))}
                                                    </>
                                            }
                                        </ul>

                                    </div>
                                </div>
                            )}
                        {isForTokenOpen &&
                            (
                                <div className='select-token'>
                                    <div className='select-token-modal' ref={forTokenDropdownRef}>
                                        <h5 className="select-token-title">Select Token</h5>
                                        <div className='custom-token'>
                                            <input placeholder='Custom token address' onChange={(e) => { setCustomForTokenAddress(e.target.value) }} />
                                        </div>
                                        <ul className="select-token-list">
                                            {
                                                customForToken ?
                                                    <li onClick={() => {
                                                        setIsForTokenOpen(false);
                                                        setForToken(customForToken);
                                                        // if (sellingToken == tokenInfo.symbol) {
                                                        //     setSellingToken(tokens.find((ktem) => ktem.symbol != tokenInfo.symbol).symbol)
                                                        // }
                                                    }}>
                                                        <span>{customForToken}</span>
                                                    </li>
                                                    :
                                                    <>
                                                        {defaultTokenInfos.filter((item) => item.network == network).map(tokenInfo => (
                                                            <li key={tokenInfo.symbol} onClick={() => {
                                                                setIsForTokenOpen(false);
                                                                setForToken(tokenInfo.symbol);
                                                                if (sellingToken == tokenInfo.symbol) {
                                                                    setSellingToken(defaultTokens.find((ktem) => ktem.symbol != tokenInfo.symbol).symbol)
                                                                }
                                                            }}>
                                                                <span>{tokenInfo.symbol}</span>
                                                            </li>
                                                        ))}
                                                    </>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </main>
        </>
    )
}
