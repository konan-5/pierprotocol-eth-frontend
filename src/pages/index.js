import Footer from '@/components/global/Footer'
import Header from '@/components/global/Header'
import Banner from '@/components/home/Banner'
import Faq from '@/components/home/Faq'
import Features from '@/components/home/Features'
import Head from 'next/head'  

export default function Home() {
  return (
    <>
      <Head>
        <title>Pier Protocol</title> 
      </Head>
      <main id="home-wrapper">
        <Header/>
        <Banner/>
        <Features/>
        <Faq/>
        <Footer/>
      </main>
    </>
  )
}
