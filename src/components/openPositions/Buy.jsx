import React, { useEffect, useState } from "react";
import Bitcoin from "../../assets/images/bitcoin-ic.svg";
import { PiCaretUpDownFill } from "react-icons/pi";
import Image from "next/image";
import { fetchSellTokenList } from "@/utils/web3helper";
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

const Buy = () => {
  // const [sellTokenList, setSellTokenList] = useState([])
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
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default Buy;
