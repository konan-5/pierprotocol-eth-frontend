
import OtherHeader from '@/components/global/OtherHeader'
import Dashboard from '@/components/openPositions/Dashboard'
import Head from 'next/head'

export default function DashboardPage() {
    return (
        <>
            <Head>
                <title> Pier Protocol Dashboard</title>
            </Head>
            <main id="other-wrapper">
                <OtherHeader />
                <Dashboard />
            </main>
        </>
    )
}
