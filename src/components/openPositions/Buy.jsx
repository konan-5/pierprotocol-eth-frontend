import React, { useEffect, useState } from "react";
import Bitcoin from "../../assets/images/bitcoin-ic.svg";
import { PiCaretUpDownFill } from "react-icons/pi";
import Image from "next/image";
import { fetchSellTokenList } from "@/utils/web3helper";

const Buy = () => {
  const [sellTokenList, setSellTokenList] = useState([])
  const [order, setOrder] = useState("ASC");
  const [buyData, setBuyData] = useState([
    {
      id: 7,
      token: {
        logo: <Image src={Bitcoin} alt="" />,
        title: "Bitcoin",
        subTitle: "BTC",
      },
      tokenPrice: "34.844$",
      tokenAmount: "62,749.00",
      totalPrice: "57,600.00",
      seller: "0xffjeeedv",
    },
  ]);

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

  const [starStates, setStarStates] = useState(
    Array(buyData.length).fill(false)
  );
  const handleStarClick = (index) => {
    const updatedStarStates = [...starStates];
    updatedStarStates[index] = !updatedStarStates[index];
    setStarStates(updatedStarStates);
  };

  useEffect(() => {
    fetchSellTokenList().then((resp) => { setBuyData(resp); console.log(resp) })
  }, [])

  return (
    <>
      <div className="table-responsive dashboard-table">
        <table className="table">
          <thead>
            <tr>
              <th
                scope="col"
                className="cursor"
                onClick={() => sorting("token.title")}
              >
                # Token <PiCaretUpDownFill />
              </th>
              <th
                scope="col"
                className="cursor"
                onClick={() => sorting("tokenPrice")}
              >
                Price per Token <PiCaretUpDownFill />
              </th>
              <th
                scope="col"
                className="cursor"
                onClick={() => sorting("tokenAmount")}
              >
                Token Amount <PiCaretUpDownFill />
              </th>
              <th scope="col">Total Price</th>
              <th scope="col">Seller</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {buyData.map((item, index) => (
              <tr key={item.id}>
                <td className="table-title">
                  <div
                    className={`star-icon ${starStates[index] ? "start-button" : ""
                      }`}
                    onClick={() => handleStarClick(index)}
                  ></div>
                  {item.id}
                  {/* {item.token.logo} */}
                  <img src={item.token.logo} alt="" width={30}/>
                  <span>{item.token.title}</span>
                  <span className="subTitle">{item.token.subtitle}</span>
                </td>
                <td>{item.tokenPrice}</td>
                <td>{item.tokenAmount}</td>
                <td>{item.totalPrice}</td>
                <td className="seller-text">{item.seller}</td>
                <td>
                  <button className="btn-buy">Buy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Buy;
