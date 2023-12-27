 
import OtherHeader from '@/components/global/OtherHeader'  
import OfferForm from '@/components/offer/OfferForm'
import Head from 'next/head'  

export default function Offer() {
  return (
    <>
      <Head>
        <title>Pier Protocol Offer</title> 
      </Head>
      <main id="other-wrapper" className='list-wrapper'>
        <OtherHeader/> 
        <OfferForm/>
      </main>
    </>
  )
}
