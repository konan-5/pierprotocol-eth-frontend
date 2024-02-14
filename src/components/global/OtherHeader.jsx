import Web3 from 'web3';
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
import { tokenInfos } from '@/utils/tokenList';
import { networkSvgs } from '@/utils/svg';

import { WalletMultiButton, setVisible, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { useWallet as useSeiWallet, WalletConnectButton } from '@sei-js/react';

const OtherHeader = ({comingSoon = false}) => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [activeToken, setActiveToken] = useState("erc20");
    const [isConnected, setIsConnected] = useState(false);
    const networkDropdownRef = useRef(null);
    const networkToggleDropdown = () => setIsNetworkOpen(!isNetworkOpen);
    const [isNetworkOpen, setIsNetworkOpen] = useState(false);
    const networks = [...new Set(tokenInfos.map(token => token.network))];
    const [network, setNetwork] = useState(networks[0]);

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const { setVisible } = useWalletModal();

    useEffect(() => {
        if (window.ethereum) {
            // const web3Instance = new Web3(window.ethereum);
            // setWeb3(web3Instance);
            // checkIfWalletIsConnected();
            // window.ethereum.on('accountsChanged', handleAccountsChanged);
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

    const connectSolana = () => {
        setVisible(true)
        setIsConnected(true);
    }

    const connectSei = () => {
        setIsConnected(true);
    }

    return (
        <div className="other-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="other-content">
                            <Link href="/">
                                <Image src={logo} alt="logo" />
                            </Link>
                            {
                                !comingSoon &&
                                <div className='config'>
                                    {
                                        network == "Ethereum" &&
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
                                    </div>
                                    {
                                        network == "Solana" ?
                                        // <WalletMultiButton /> 
                                        <a href="#" className="btn-lg navbar-btn connect-wallet" onClick={connectSolana}>
                                            {isConnected ?
                                                <span>Connected</span> :
                                                <span>Connect Wallet</span>
                                            }
                                        </a>
                                        : (
                                        network == "Sei" ?
                                            <a href="#" className="btn-lg navbar-btn connect-wallet" onClick={connectSei}>
                                                {isConnected ?
                                                    <span>Connected</span> :
                                                    <span><WalletConnectButton /></span>
                                                }
                                            </a>
                                            :
                                            <a href="#" className="btn-lg navbar-btn connect-wallet" onClick={connectWallet}>
                                                {isConnected ?
                                                    <span>Connected</span> :
                                                    <span>Connect Wallet</span>
                                                }
                                            </a>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OtherHeader;
