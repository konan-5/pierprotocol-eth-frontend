 
import OtherHeader from '@/components/global/OtherHeader' 
import ListForm from '@/components/list/ListForm' 
import Head from 'next/head'  

export default function List() {
  return (
    <>
      <Head>
        <title>Pier Protocol List</title> 
      </Head>
      <main id="other-wrapper" className='list-wrapper'>
        <OtherHeader/> 
        <ListForm/>
      </main>
    </>
  )
}
