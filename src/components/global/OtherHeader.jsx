import Web3 from 'web3';
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
import { networkSvgs } from '@/utils/svg';

import { networkConfig } from '@/utils/networkConfig';
import { useRouter as nextUseRouter } from "next/router";

import { useWallet as useSeiWallet, WalletConnectButton } from '@sei-js/react';
import { useDispatch, useSelector } from 'react-redux';
import { networks } from '@/utils/constants';

const OtherHeader = ({ comingSoon = false }) => {
    const dispatch = useDispatch();
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [activeToken, setActiveToken] = useState("erc20");
    const [isConnected, setIsConnected] = useState(false);
    const networkDropdownRef = useRef(null);
    const networkToggleDropdown = () => setIsNetworkOpen(!isNetworkOpen);
    const [isNetworkOpen, setIsNetworkOpen] = useState(false);

    // const [network, setNetwork] = useState(networks[0]);
    const networko = useSelector((state) => state.app.network);

    const { seiConnectedWallet, seiAccounts } = useSeiWallet();

    const setNetwork = (newNetwork) => dispatch({ type: 'SET_NETWORK', payload: newNetwork });
    const switchNetwork = async () => {
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                // Try to switch to the desired network
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: networkConfig[networko].chainId }], // Use the chainId from the networkConfig
                });
            } else {
                console.log('MetaMask is not installed!');
            }
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    // Attempt to add the new network
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [networkConfig[networko]], // Use the full networkConfig here
                    });
                } catch (addError) {
                    // Handle errors like user rejection
                    console.error(addError);
                }
            } else {
                console.error(switchError);
            }
        }
    };

    const handleClickOutside = (event) => {
        if (networkDropdownRef.current && !networkDropdownRef.current.contains(event.target)) {
            setIsNetworkOpen(false);
        }
    };

    const nextRouter = nextUseRouter();
    const { network } = nextRouter.query;

    useEffect(() => {
        if (networko == "Solana") {
            window.location.assing("https://solana.pierprotocol.com")
        }
        switchNetwork()
    }, [networko])

    useEffect(() => {
        if (network)
            dispatch(setNetwork(query.get('network')))
        if (window.ethereum) {
            const _checkAccount = async () => {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccounts(accounts);
                setIsConnected(true);
            }
            _checkAccount()
            // const web3Instance = new Web3(window.ethereum);
            // setWeb3(web3Instance);
            // checkIfWalletIsConnected();
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        } else {
            console.log("Please install MetaMask!");
        }

        // Clean up
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        };
    }, []);

    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            // Wallet is disconnected or the user has switched accounts
            setIsConnected(false);
            setAccounts([]);
        } else {
            setAccounts(accounts);
            console.log(accounts)
            setIsConnected(true);
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

    const connectSolana = () => {
        // setVisible(true)
        // setIsConnected(true);
    }

    const connectSei = () => {
        // setIsConnected(true);
    }

    return (
        <div className="other-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="other-content">
                            {
                                !comingSoon &&
                                <>
                                    <Link href="/">
                                        <Image src={logo} alt="logo" />
                                    </Link>
                                    <div className='config'>
                                        {
                                            networko == "Ethereum" &&
                                            <div className='token-config'>
                                                <a href="#" className={"btn-lg " + (activeToken == "erc20" ? "navbar-btn" : "")} onClick={() => setActiveToken("erc20")}>
                                                    <span>ERC-20</span>
                                                </a>
                                                <a href="#" className={"btn-lg erc404 " + (activeToken == "erc404" ? "navbar-btn" : "")} onClick={() => setActiveToken("erc404")}>
                                                    <span>ERC-404</span>
                                                </a>
                                            </div>
                                        }
                                        <div className='network-config'>

                                            <div ref={networkDropdownRef} className='select-network'>
                                                <div className='selected-network' onClick={networkToggleDropdown}>
                                                    <div className='logo'>
                                                        {networkSvgs[networko]}
                                                    </div>
                                                    <span>{networko}</span>
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
                                        </div>
                                        {
                                            networko == "Solana" ?
                                                // <WalletMultiButton /> 
                                                <a href="#" className="btn-lg navbar-btn connect-wallet" onClick={connectSolana}>
                                                    {isConnected ?
                                                        <span>Connected</span> :
                                                        <span>Connect Wallet</span>
                                                    }
                                                </a>
                                                : (
                                                    networko == "Sei" ?
                                                        <a href="#" className="btn-lg navbar-btn connect-wallet" onClick={connectSei}>
                                                            {seiConnectedWallet ?
                                                                <span>Connected</span> :
                                                                <span style={{ fontSize: "18px", fontWeight: "bolder" }}><WalletConnectButton /></span>
                                                            }
                                                        </a>
                                                        :
                                                        <a href="#" className="btn-lg navbar-btn connect-wallet" onClick={connectWallet}>
                                                            {isConnected ?
                                                                <span>{`${accounts[0].toString().substr(0, 3)}...${accounts[0].toString().substr(-5)}`}</span> :
                                                                <span>Connect Wallet</span>
                                                            }
                                                        </a>
                                                )
                                        }
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OtherHeader;
