import { getTokenDetails } from "@/utils/web3helper";
import React, { useEffect, useState } from "react";

const ListForm = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [balance, setBalance] = useState(-1);
  const [amountToSell, setAmountToSell] = useState(-1);

  useEffect(() => {
    if (tokenAddress.length == 42) {
      getTokenDetails(tokenAddress)
        .then((tokenDetail) => {
          setTokenName(tokenDetail[0])
          setTokenSymbol(tokenDetail[1])
          setBalance(tokenDetail[2])
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setTokenName("")
      setTokenSymbol("")
      setBalance(-1)
    }
  }, [tokenAddress])

  useEffect(() => {
    if(amountToSell > balance) {
      setAmountToSell(balance)
    }
  }, [amountToSell])

  return (
    <div className="list-form-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <div className="fs-30 fw-bold title">List</div>
            </div>
            <form action="" className="list-form">
              <input type="text" name="address" placeholder="Token Address" onChange={(e) => { setTokenAddress(e.target.value) }} value={tokenAddress} />
              <input type="text" name="name" placeholder="Token Name" value={tokenName} disabled />
              <input type="text" name="symbol" placeholder="Token Symbol" value={tokenSymbol} disabled />
              <input type="text" name="supply" placeholder="Balance" value={balance == -1 ? "" : balance} disabled />
              <input type="number" name="sell" placeholder="Amount To Sell" value={amountToSell == -1 ? "": amountToSell} onChange={(e) => {setAmountToSell(e.target.value)}}/>
              <input type="text" name="eth" placeholder="Amount of ETH" />
              <button type="submit" className="btn-lg">
                List For Sale
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListForm;
