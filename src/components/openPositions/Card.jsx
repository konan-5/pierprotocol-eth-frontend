import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ book }) => {
    
    const router = useRouter();
    const [tokenPrice, setTokenPrice] = useState(null);
    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.portals.fi/v2/tokens', {
                headers: {
                    'Authorization': 'Bearer 60f89292-289a-48ce-9588-d2da9469142b'
                },
                params: {
                    search: book.sellTokenInfo.symbol,
                    platforms: 'basic',
                    networks: 'ethereum'
                }
            });
            const price = response.data.tokens.find((item, idx) => {return item.address.toLowerCase() == book.sellTokenInfo.address.toLowerCase()}).price
            setTokenPrice(price)
            return price;
        } catch (error) {
            // console.error('Error fetching data:', error);
            return null;
        }
    };
    useEffect(() => {
        // console.log(tokenPrice)
    }, [tokenPrice])
    useEffect(() => {
        // fetchData()
    }, [])
    
    return (
        <div className="card">
            <div className="summary">
                <div className="token">
                    <img src={book.sellTokenInfo.logo} width="25px" alt={book.sellTokenInfo.symbol} />
                    <div>{book.sellTokenAmount} {book.sellTokenInfo.symbol}</div>
                </div>
                <div className="seller">
                    <div>Seller</div>
                    <a>{book.book[0].substring(0, 10)}</a>
                </div>
            </div>
            <div className="detail">
                <div className="unit">
                    <div>Price(/Token)</div>
                    <div>$1 USD</div>
                </div>
                <div className="total">
                    <div className="for-token">
                        For {book.forTokenAmount}&nbsp;
                        <img src={book.forTokenInfo.logo} width="25px" alt={book.forTokenInfo.symbol} />
                    </div>
                    <a>${book.forTokenAmount}</a>
                </div>
            </div>

            <button onClick={() => router.push(`/buy?id=${book.id}`)}>Buy Token</button>
        </div>
    );
};

export default Card;
