 
import OtherHeader from '@/components/global/OtherHeader' 
import Head from 'next/head'  
import ComingSoon from '@/components/global/ComingSoon'

export default function List() {
  return (
    <>
      <Head>
        <title>Pier Protocol List</title> 
      </Head>
      <main id="other-wrapper" className='list-wrapper'>
        <OtherHeader comingSoon={true}/>
        <ComingSoon/>
      </main>
    </>
  )
}
