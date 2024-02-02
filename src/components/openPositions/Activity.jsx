import React, { useEffect, useState } from "react";
import Bitcoin from "../../assets/images/bitcoin-ic.svg";
import { PiCaretUpDownFill } from "react-icons/pi";
import Image from "next/image";
import { fetchActivity } from "@/utils/web3helper";

const Activity = ({ searchWord }) => {
    const [activitys, setActivitys] = useState();
    const [filteredActivitys, setFilteredActivitys] = useState();
    async function init() {
        const activitys = await fetchActivity()
        setActivitys(activitys)
    }

    const filterActivitys = () => {
        if (activitys) {
            if (searchWord == null) {
                setFilteredActivitys([...activitys])
            } else {
                setFilteredActivitys(
                    activitys.filter(
                        activity => searchWord
                            .toLowerCase()
                            .split('')
                            .every(
                                letter => `${activity.category == 'book' ? 'Listed' : 'Completed'}${activity.sellTokenAmount}${activity.forTokenAmount}${activity.sellTokenInfo.symbol}`
                                    .toLowerCase()
                                    .includes(letter)
                            )
                    )
                )
            }
        }
    }

    useEffect(() => {
        console.log(searchWord, activitys)
        filterActivitys()
    }, [searchWord, activitys])

    useEffect(() => {
        init()
    }, [])

    // const [order, setOrder] = useState("ASC");
    // const [buyData, setBuyData] = useState([
    //     {
    //         id: 1,
    //         token: {
    //             logo: <Image src={Bitcoin} alt="" />,
    //             title: "Bitcoin",
    //             subTitle: "BTC",
    //         },
    //         tokenAmount: "62,749.00",
    //         totalPrice: "57,600.00",
    //         seller: "0xffjeeedv",
    //         buyer: "0xffjeeedv",
    //         activityStatus: "COMPLETED",
    //     },
    //     {
    //         id: 2,
    //         token: {
    //             logo: <Image src={Bitcoin} alt="" />,
    //             title: "Bitcoin",
    //             subTitle: "BTC",
    //         },
    //         tokenAmount: "62,749.00",
    //         totalPrice: "57,600.00",
    //         seller: "0xffjeeedv",
    //         buyer: "0xffjeeedv",
    //         activityStatus: "COMPLETED",
    //     },
    //     {
    //         id: 3,
    //         token: {
    //             logo: <Image src={Bitcoin} alt="" />,
    //             title: "Bitcoin",
    //             subTitle: "BTC",
    //         },
    //         tokenAmount: "62,749.00",
    //         totalPrice: "57,600.00",
    //         seller: "0xffjeeedv",
    //         buyer: "0xffjeeedv",
    //         activityStatus: "LISTED",
    //     },
    //     {
    //         id: 4,
    //         token: {
    //             logo: <Image src={Bitcoin} alt="" />,
    //             title: "Bitcoin",
    //             subTitle: "BTC",
    //         },
    //         tokenAmount: "62,749.00",
    //         totalPrice: "57,600.00",
    //         seller: "0xffjeeedv",
    //         buyer: "0xffjeeedv",
    //         activityStatus: "LISTED",
    //     },
    //     {
    //         id: 5,
    //         token: {
    //             logo: <Image src={Bitcoin} alt="" />,
    //             title: "Bitcoin",
    //             subTitle: "BTC",
    //         },
    //         tokenAmount: "62,749.00",
    //         totalPrice: "57,600.00",
    //         seller: "0xffjeeedv",
    //         buyer: "0xffjeeedv",
    //         activityStatus: "COMPLETED",
    //     },
    //     {
    //         id: 6,
    //         token: {
    //             logo: <Image src={Bitcoin} alt="" />,
    //             title: "Bitcoin",
    //             subTitle: "BTC",
    //         },
    //         tokenAmount: "62,749.00",
    //         totalPrice: "57,600.00",
    //         seller: "0xffjeeedv",
    //         buyer: "0xffjeeedv",
    //         activityStatus: "LISTED",
    //     },
    //     {
    //         id: 7,
    //         token: {
    //             logo: <Image src={Bitcoin} alt="" />,
    //             title: "Bitcoin",
    //             subTitle: "BTC",
    //         },
    //         tokenAmount: "62,749.00",
    //         totalPrice: "57,600.00",
    //         seller: "0xffjeeedv",
    //         buyer: "0xffjeeedv",
    //         activityStatus: "COMPLETED",
    //     },
    // ]);

    // const sortByColumn = (col) => {
    //     const sortedData = [...buyData].sort((a, b) => {
    //         const valueA =
    //             col === "token.title"
    //                 ? a.token.title.toLowerCase()
    //                 : a[col].toLowerCase();
    //         const valueB =
    //             col === "token.title"
    //                 ? b.token.title.toLowerCase()
    //                 : b[col].toLowerCase();

    //         if (order === "ASC") {
    //             return valueA > valueB ? 1 : -1;
    //         } else {
    //             return valueA < valueB ? 1 : -1;
    //         }
    //     });

    //     setBuyData(sortedData);
    //     setOrder(order === "ASC" ? "DSC" : "ASC");
    // };
    // const [starStates, setStarStates] = useState(
    //     Array(buyData.length).fill(false)
    // );
    // const handleStarClick = (index) => {
    //     const updatedStarStates = [...starStates];
    //     updatedStarStates[index] = !updatedStarStates[index];
    //     setStarStates(updatedStarStates);
    // };

    return (
        <>
            {filteredActivitys &&
                <div className="table-responsive dashboard-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th
                                    scope="col"
                                    className="cursor"
                                // onClick={() => sortByColumn("token.title")}
                                >
                                    Token <PiCaretUpDownFill />
                                </th>
                                <th
                                    scope="col"
                                    className="cursor"
                                // onClick={() => sortByColumn("tokenAmount")}
                                >
                                    Token Amount <PiCaretUpDownFill />
                                </th>
                                <th scope="col">Total Price</th>
                                <th scope="col">Seller</th>
                                <th scope="col">Buyer</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredActivitys.map((item, index) => (
                                <tr key={`activity${index}`} className={`${index % 2 == 1 ? "odd" : ""} tr`}>
                                    <td>
                                        {item.bookId}
                                    </td>
                                    <td className="table-title">
                                        {/* <div
                                        className={`star-icon ${starStates[index] ? "start-button" : ""
                                            }`}
                                        onClick={() => handleStarClick(index)}
                                    ></div> */}
                                        <img src={item.sellTokenInfo.logo} width={35} />
                                        <span>{item.sellTokenInfo.name}</span>
                                        <span className="subTitle">{item.sellTokenInfo.symbol}</span>
                                    </td>
                                    <td>{item.sellTokenAmount}</td>
                                    <td>{item.forTokenAmount}</td>
                                    <td className="seller-text">{item.seller.substring(0, 8)}</td>
                                    <td className="seller-text">{item.buyer.substring(0, 8)}</td>
                                    <td>
                                        {item.category === "buy" && (
                                            <button className="btn-completed">Completed</button>
                                        )}
                                        {item.category === "book" && (
                                            <button className="btn-listed">Listed</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
};

export default Activity;
