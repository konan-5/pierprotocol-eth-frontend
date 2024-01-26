import OtherHeader from '@/components/global/OtherHeader'
import Head from 'next/head'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

export default function CreateOffer() {
    const router = useRouter();
    const [tabStatus, setTabStatus] = useState('network');

    useEffect(() => {
        console.log(tabStatus)
    }, [])
    return (
        <>
            <Head>
                <title>Pier Protocol Create Offer</title>
            </Head>
            <main id="other-wrapper" className='list-wrapper'>
                <OtherHeader />
                <div className='create-offer'>
                    <div className='title'>
                        <span>CREATE OFFER</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.7492" cy="11.55" r="11.55" fill="url(#paint0_linear_0_1)" />
                            <path d="M12.9202 16.4024L10.174 16.4024L6.16023 6.84336L9.16394 6.84336L11.5207 13.1545L11.3755 13.0554L11.7254 13.0554L11.5735 13.1545L13.9369 6.84336L16.934 6.84336L12.9202 16.4024Z" fill="white" />
                            <defs>
                                <linearGradient id="paint0_linear_0_1" x1="26.4242" y1="11.4172" x2="-3.60078" y2="11.4172" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5200FF" />
                                    <stop offset="1" stop-color="#58ADFE" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className='body'>
                        <div className='steps'>
                            <div className='step1'>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="15" cy="15" r="15" fill="url(#paint0_linear_0_1)" />
                                    <path d="M17.0916 8.36364V20H14.6314V10.6989H14.5632L11.8984 12.3693V10.1875L14.7791 8.36364H17.0916Z" fill="white" />
                                    <defs>
                                        <linearGradient id="paint0_linear_0_1" x1="34.0584" y1="14.8276" x2="-4.93507" y2="14.8276" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#5200FF" />
                                            <stop offset="1" stop-color="#58ADFE" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <span>Network & Sell</span>
                            </div>
                            <div className='step-line'></div>
                            <div className='step2'>
                                {
                                    tabStatus == 'network' ?
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="15" cy="15" r="15" fill="#D9D9D9" fill-opacity="0.05" />
                                            <circle cx="15" cy="15" r="14.5" stroke="white" stroke-opacity="0.1" />
                                            <path d="M11.4041 20V18.2273L15.5462 14.392C15.8984 14.0511 16.1939 13.7443 16.4325 13.4716C16.675 13.1989 16.8587 12.9318 16.9837 12.6705C17.1087 12.4053 17.1712 12.1193 17.1712 11.8125C17.1712 11.4716 17.0935 11.178 16.9382 10.9318C16.7829 10.6818 16.5708 10.4905 16.3018 10.358C16.0329 10.2216 15.728 10.1534 15.3871 10.1534C15.031 10.1534 14.7204 10.2254 14.4553 10.3693C14.1901 10.5133 13.9856 10.7197 13.8416 10.9886C13.6977 11.2576 13.6257 11.5777 13.6257 11.9489H11.2905C11.2905 11.1875 11.4628 10.5265 11.8075 9.96591C12.1522 9.4053 12.6352 8.97159 13.2564 8.66477C13.8776 8.35795 14.5935 8.20455 15.4041 8.20455C16.2375 8.20455 16.9628 8.35227 17.5803 8.64773C18.2015 8.93939 18.6844 9.3447 19.0291 9.86364C19.3738 10.3826 19.5462 10.9773 19.5462 11.6477C19.5462 12.0871 19.459 12.5208 19.2848 12.9489C19.1143 13.3769 18.8094 13.8523 18.37 14.375C17.9306 14.8939 17.3113 15.517 16.5121 16.2443L14.8132 17.9091V17.9886H19.6996V20H11.4041Z" fill="white" />
                                        </svg> :
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="15" cy="15" r="15" fill="url(#paint0_linear_0_1)" />
                                            <path d="M11.4041 20V18.2273L15.5462 14.392C15.8984 14.0511 16.1939 13.7443 16.4325 13.4716C16.675 13.1989 16.8587 12.9318 16.9837 12.6705C17.1087 12.4053 17.1712 12.1193 17.1712 11.8125C17.1712 11.4716 17.0935 11.178 16.9382 10.9318C16.7829 10.6818 16.5708 10.4905 16.3018 10.358C16.0329 10.2216 15.728 10.1534 15.3871 10.1534C15.031 10.1534 14.7204 10.2254 14.4553 10.3693C14.1901 10.5133 13.9856 10.7197 13.8416 10.9886C13.6977 11.2576 13.6257 11.5777 13.6257 11.9489H11.2905C11.2905 11.1875 11.4628 10.5265 11.8075 9.96591C12.1522 9.4053 12.6352 8.97159 13.2564 8.66477C13.8776 8.35795 14.5935 8.20455 15.4041 8.20455C16.2375 8.20455 16.9628 8.35227 17.5803 8.64773C18.2015 8.93939 18.6844 9.3447 19.0291 9.86364C19.3738 10.3826 19.5462 10.9773 19.5462 11.6477C19.5462 12.0871 19.459 12.5208 19.2848 12.9489C19.1143 13.3769 18.8094 13.8523 18.37 14.375C17.9306 14.8939 17.3113 15.517 16.5121 16.2443L14.8132 17.9091V17.9886H19.6996V20H11.4041Z" fill="white" />
                                            <defs>
                                                <linearGradient id="paint0_linear_0_1" x1="34.0584" y1="14.8276" x2="-4.93507" y2="14.8276" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#5200FF" />
                                                    <stop offset="1" stop-color="#58ADFE" />
                                                </linearGradient>
                                            </defs>
                                        </svg>


                                }
                                <span>Amount & Sell</span>
                            </div>
                        </div>
                        {
                            tabStatus == 'network' ?
                                <div className='network'>
                                    <div className='description'>
                                        On which network you want to sell your coins?
                                    </div>
                                    <div>
                                        Network
                                    </div>
                                    <div className='selected-network'>
                                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="18" cy="18" r="17.5" fill="black" stroke="black" />
                                            <g clip-path="url(#clip0_0_1)">
                                                <path d="M26.9073 22.7879L23.9359 25.9269C23.8713 25.9951 23.7931 26.0494 23.7063 26.0866C23.6194 26.1237 23.5257 26.1429 23.4311 26.1428H9.34496C9.27775 26.1428 9.212 26.1235 9.1558 26.0872C9.09959 26.0509 9.05538 25.9992 9.02859 25.9385C9.0018 25.8778 8.9936 25.8107 9.005 25.7454C9.0164 25.6802 9.04689 25.6196 9.09275 25.5712L12.0664 22.4323C12.1309 22.3643 12.2088 22.31 12.2953 22.2729C12.3819 22.2357 12.4753 22.2165 12.5697 22.2163H26.655C26.7223 22.2163 26.788 22.2357 26.8442 22.272C26.9004 22.3083 26.9446 22.36 26.9715 22.4207C26.9982 22.4814 27.0064 22.5485 26.995 22.6137C26.9836 22.679 26.9531 22.7395 26.9073 22.7879ZM23.9359 16.467C23.8713 16.3988 23.7931 16.3444 23.7063 16.3073C23.6194 16.2701 23.5257 16.251 23.4311 16.251H9.34496C9.27775 16.251 9.212 16.2704 9.1558 16.3067C9.09959 16.343 9.05538 16.3947 9.02859 16.4554C9.0018 16.5161 8.9936 16.5832 9.005 16.6484C9.0164 16.7137 9.04689 16.7742 9.09275 16.8226L12.0664 19.9616C12.1309 20.0296 12.2088 20.0838 12.2953 20.121C12.3819 20.1581 12.4753 20.1774 12.5697 20.1775H26.655C26.7223 20.1775 26.788 20.1582 26.8442 20.1219C26.9004 20.0856 26.9446 20.0339 26.9715 19.9732C26.9982 19.9125 27.0064 19.8454 26.995 19.7801C26.9836 19.7149 26.9531 19.6543 26.9073 19.6059L23.9359 16.467ZM9.34496 14.2122H23.4311C23.5257 14.2123 23.6194 14.1931 23.7063 14.156C23.7931 14.1188 23.8713 14.0645 23.9359 13.9963L26.9073 10.8573C26.9531 10.8089 26.9836 10.7484 26.995 10.6831C27.0064 10.6179 26.9982 10.5508 26.9715 10.4901C26.9446 10.4293 26.9004 10.3777 26.8442 10.3414C26.788 10.305 26.7223 10.2857 26.655 10.2857H12.5697C12.4753 10.2859 12.3819 10.3051 12.2953 10.3423C12.2088 10.3794 12.1309 10.4337 12.0664 10.5017L9.09352 13.6406C9.04771 13.689 9.01722 13.7495 9.0058 13.8146C8.99437 13.8798 9.00251 13.9468 9.0292 14.0075C9.0559 14.0682 9.09999 14.1199 9.15608 14.1563C9.21217 14.1926 9.27782 14.2121 9.34496 14.2122Z" fill="url(#paint0_linear_0_1)" />
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_0_1" x1="10.5194" y1="26.5208" x2="25.0416" y2="9.90071" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.08" stop-color="#9945FF" />
                                                    <stop offset="0.3" stop-color="#8752F3" />
                                                    <stop offset="0.5" stop-color="#5497D5" />
                                                    <stop offset="0.6" stop-color="#43B4CA" />
                                                    <stop offset="0.72" stop-color="#28E0B9" />
                                                    <stop offset="0.97" stop-color="#19FB9B" />
                                                </linearGradient>
                                                <clipPath id="clip0_0_1">
                                                    <rect width="18" height="15.8571" fill="white" transform="translate(9 10.2857)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span>Solana</span>
                                    </div>
                                    <div className='navigate-button'>
                                        <button className='back' onClick={() => router.push("/dashboard")}>
                                            Back
                                        </button>
                                        <button className='next' onClick={() => setTabStatus('token')}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className='network'>
                                    <div className='description'>
                                        How many you want to sell?
                                    </div>

                                    <div className='sell'>
                                        <div className='label'>Selling</div>
                                        <div className='input-area'>
                                            <input placeholder='Enter amount' />
                                            <div className='token-dropdown'>
                                                <span>
                                                    Select Token
                                                </span>
                                                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L5.5 6L10 1" stroke="#FEFEFE" stroke-opacity="0.1" stroke-linecap="round" />
                                                </svg>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='for'>
                                        <div className='label'>For</div>
                                        <div className='input-area'>
                                            <input placeholder='Enter amount' />
                                            <div className='token-dropdown'>
                                                <span>
                                                    Select Token
                                                </span>
                                                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L5.5 6L10 1" stroke="#FEFEFE" stroke-opacity="0.1" stroke-linecap="round" />
                                                </svg>

                                            </div>
                                        </div>
                                    </div>

                                    <div className='navigate-button'>
                                        <button className='back' onClick={() => setTabStatus('network')}>
                                            Back
                                        </button>
                                        <button className='next'>
                                            Sell
                                        </button>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}
