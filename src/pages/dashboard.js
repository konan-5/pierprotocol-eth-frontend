
import OtherHeader from '@/components/global/OtherHeader'
import Dashboard from '@/components/openPositions/Dashboard'
import Head from 'next/head'

import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useMemo } from 'react';

require('@solana/wallet-adapter-react-ui/styles.css');

import { SeiWalletProvider } from '@sei-js/react';

export default function DashboardPage() {
    const solNetwork = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ solNetwork })
        ],
        [solNetwork]
    );

    const rpcUrl = 'https://rpc.atlantic-2.seinetwork.io/';
    const restUrl = 'https://rest.atlantic-2.seinetwork.io/';
    const chainId = 'atlantic-2';

    return (
        <SeiWalletProvider chainConfiguration={{ chainId, restUrl, rpcUrl }} wallets={['compass', 'fin']}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets}>
                    <WalletModalProvider>
                        <Head>
                        <title> Pier Protocol Dashboard</title>
                    </Head>
                    <main id="other-wrapper">
                        <OtherHeader />
                        <Dashboard />
                    </main>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </SeiWalletProvider>
    )
}
