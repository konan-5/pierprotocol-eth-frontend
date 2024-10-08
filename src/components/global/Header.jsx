import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { HiOutlineMenu } from "react-icons/hi";
import Image from "next/image";

const Header = () => {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const _checkAccount = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(accounts);
        setIsConnected(true);
      }
      _checkAccount()
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

  const toggleOffcanvas = () => {
    setOffcanvasOpen(!offcanvasOpen);
  };
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar_main ${offcanvasOpen ? "offcanvas-open" : ""
          }`}
      >
        <div className="container">
          <Link className="logo" href="/">
            <Image src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler d-lg-none ms-auto pe-0"
            type="button"
            onClick={toggleOffcanvas}
          >
            <HiOutlineMenu />
          </button>

          <div className={`navbarOffset ${offcanvasOpen ? "show" : ""}`}>
            <div className="offset-header">
              <h5 className="offcanvas-title">
                <Image src={logo} alt="logo" />
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggleOffcanvas}
              ></button>
            </div>
            <div className="d-lg-flex align-items-center justify-content-center gap-4">
              <ul className="nav_list ms-auto">
                <li class="nav-item">
                  <Link
                    href="#features"
                    className="nav-link"
                    onClick={toggleOffcanvas}
                  >
                    Key Features
                  </Link>
                </li>
                <li class="nav-item">
                  <Link href="#faq" className="nav-link" onClick={toggleOffcanvas}>
                    FAQ
                  </Link>
                </li>
                <li class="nav-item">
                  <Link href="https://pier-protocol.gitbook.io/pier-protocol/" target="_blank" className="nav-link" onClick={toggleOffcanvas}>
                    Gitbook
                  </Link>
                </li>
              </ul>
              <div className="nav-btn d-lg-flex align-items-center justify-content-center mt-lg-0 mt-4 ms-auto">
                <div className="d-flex gap-2 align-items-center justify-content-center mt-4 mt-lg-0">
                  <a href={"#"} className="btn-lg navbar-btn" onClick={connectWallet}>
                    {isConnected ?
                      <span>Connected</span> :
                      <span>Connect Wallet</span>
                    }
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${offcanvasOpen ? "show offcanvas-backdrop fade" : ""}`}
            onClick={toggleOffcanvas}
          ></div>
        </div>
      </nav>
    </>
  );
};

export default Header;
