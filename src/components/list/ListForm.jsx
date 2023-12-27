import React from "react";

const ListForm = () => {
  return (
    <div className="list-form-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <div className="fs-30 fw-bold title">List</div>
            </div>
            <form action="" className="list-form">
              <input type="text" name="address" placeholder="Token Address" />
              <input type="text" name="name" placeholder="Token Name" />
              <input type="text" name="symbol" placeholder="Token Symbol" />
              <input type="text" name="supply" placeholder="Token Supply" />
              <input type="text" name="sell" placeholder="Amount To Sell" />
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
