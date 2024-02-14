import React from 'react';
import logo from "../../assets/images/logo.svg"
import Image from 'next/image';
import Link from 'next/link';
import TwitterIcon from '@/assets/icons/TwitterIcon';
import DiscordIcon from '@/assets/icons/DiscordIcon';
import EvenoddIcon from '@/assets/icons/EvenoddIcon';

const Footer = () => {
    return (
        <footer className='footer-area'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="footer-content">
                            <Link href="" className="footer-logo">
                                <Image src={logo} alt="logo" />
                            </Link>
                            <div className="footer-nav">
                                <Link href="#features">Key Features</Link>
                                <Link href="#faq">Faq</Link>
                                <Link href="https://pier-protocol.gitbook.io/pier-protocol/" target="_blank">Gitbook</Link>
                            </div>
                            <div className="footer-social">
                                <Link href="https://twitter.com/protocolpier" target="_blank"><TwitterIcon/></Link>
                                {/* <Link href=""><DiscordIcon/></Link> */}
                                <Link href="https://t.me/" target="_blank"><EvenoddIcon/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;