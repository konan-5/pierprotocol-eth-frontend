
import OtherHeader from '@/components/global/OtherHeader'
import Dashboard from '@/components/openPositions/Dashboard'
import Head from 'next/head'

import { useMemo } from 'react';

require('@solana/wallet-adapter-react-ui/styles.css');

import { SeiWalletProvider } from '@sei-js/react';

export default function DashboardPage() {
    const rpcUrl = 'https://rpc.atlantic-2.seinetwork.io/';
    const restUrl = 'https://rest.atlantic-2.seinetwork.io/';
    const chainId = 'atlantic-2';

    return (
        <SeiWalletProvider chainConfiguration={{ chainId, restUrl, rpcUrl }} wallets={['compass', 'fin']}>
            <Head>
                <title> Pier Protocol Dashboard</title>
            </Head>
            <main id="other-wrapper">
                <OtherHeader />
                <Dashboard />
            </main>
        </SeiWalletProvider>
    )
}
