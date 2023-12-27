import React from "react";

const OfferForm = () => {
  return (
    <div className="list-form-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <div className="fs-30 fw-bold title">OFFER</div>
            </div>
            <form action="" className="list-form">
              <input type="text" name="contract" placeholder="Token Contract" />
              <input type="text" name="amount" placeholder="Token Amount" />
              <input type="text" name="eth" placeholder="Amount of ETH" />
              <button type="submit" className="btn-lg">
                Create an Offer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferForm;
