import React, { useEffect, useState } from "react";
import Bitcoin from "../../assets/images/bitcoin-ic.svg";
import { PiCaretUpDownFill } from "react-icons/pi";
import Image from "next/image";
import { fetchBookList, fetchSellTokenList } from "@/utils/web3helper";
import Card from "./Card";

// {
//   id: 7,
//   token: {
//     logo: <Image src={Bitcoin} alt="" />,
//     title: "Bitcoin",
//     subTitle: "BTC",
//   },
//   tokenPrice: "34.844$",
//   tokenAmount: "62,749.00",
//   totalPrice: "57,600.00",
//   seller: "0xffjeeedv",
// },

const Buy = ({ searchWord }) => {
    // const [sellTokenList, setSellTokenList] = useState([])
    const [bookList, setBookList] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])

    async function processBooks() {
        try {
            for await (const bookData of fetchBookList()) {
                setBookList(currentBooks => {
                    const isExisting = currentBooks.some(book => book.id === bookData.id);
                    if (!isExisting) {
                        return [...currentBooks, bookData];
                    } else {
                        return currentBooks;
                    }
                })
            }
        } catch (error) {
            console.error(error); // Handle potential errors
        }
    }

    const filterBooks = () => {
        if (bookList) {
            if (searchWord == null) {
                console.log(searchWord, bookList)
                setFilteredBooks([...bookList])
            } else {
                setFilteredBooks(
                    bookList.filter(
                        book => searchWord
                            .toLowerCase()
                            .split('')
                            .every(
                                letter => `${book.sellTokenAmount}${book.sellTokenInfo.symbol}${book.forTokenInfo.symbol}`
                                    .toLowerCase()
                                    .includes(letter)
                            )
                    )
                )
            }
        }
    }

    useEffect(() => {
        filterBooks()
    }, [searchWord, bookList])

    useEffect(() => {
        processBooks();
    }, []);

    const [order, setOrder] = useState("ASC");
    const [buyData, setBuyData] = useState([]);

    const sorting = (col) => {
        const sortedData = [...buyData].sort((a, b) => {
            const valueA =
                col === "token.title"
                    ? a.token.title.toLowerCase()
                    : a[col].toLowerCase();
            const valueB =
                col === "token.title"
                    ? b.token.title.toLowerCase()
                    : b[col].toLowerCase();

            if (order === "ASC") {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });

        setBuyData(sortedData);
        setOrder(order === "ASC" ? "DSC" : "ASC");
    };

    // const [starStates, setStarStates] = useState(
    //   Array(buyData.length).fill(false)
    // );
    // const handleStarClick = (index) => {
    //   const updatedStarStates = [...starStates];
    //   updatedStarStates[index] = !updatedStarStates[index];
    //   setStarStates(updatedStarStates);
    // };

    // useEffect(() => {
    //   fetchSellTokenList().then((resp) => { setBuyData(resp); console.log(resp) })
    // }, [])

    return (
        <>
            <div className="buy-board">
                {
                    filteredBooks.map((item) => {
                        if (item.isActive)
                            return <Card key={`buy${item.id}`} book={item} />
                    })
                }
                {/* <Card />
                <Card />
                <Card />
                <Card /> */}
            </div>
        </>
    );
};

export default Buy;
