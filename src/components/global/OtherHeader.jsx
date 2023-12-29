import Web3 from 'web3';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import Image from "next/image";

const OtherHeader = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

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

  return (
    <div className="other-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="other-content">
              <Link href="/dashboard">
                <Image src={logo} alt="logo" />
              </Link>
              <a href="#" className="btn-lg navbar-btn" onClick={connectWallet}>
                {isConnected ?
                  <span>Connected</span> :
                  <span>Connect Wallet</span>
                }
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherHeader;
