import React, { useEffect, useState } from "react";

const Card = () => {
  return (
    <div className="card">
      <div className="summary">
        <div className="token">
          <svg
            width="25"
            height="25"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.8758 21.2713C31.6281 30.2874 22.4962 35.7745 13.4789 33.5261C4.46548 31.2784 -1.02158 22.1459 1.22718 13.1305C3.47396 4.11331 12.6059 -1.37416 21.6203 0.873606C30.6369 3.12137 36.1236 12.2548 33.8756 21.2714L33.8758 21.2713H33.8758Z"
              fill="#F7931A"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.9734 14.8022C25.3084 12.5625 23.6032 11.3586 21.2715 10.5554L22.0279 7.52156L20.1811 7.06138L19.4448 10.0154C18.9593 9.89429 18.4607 9.78019 17.9651 9.66708L18.7068 6.69358L16.8611 6.2334L16.1043 9.26629C15.7025 9.17481 15.3079 9.0844 14.9251 8.98914L14.9272 8.9796L12.3804 8.34362L11.8891 10.3161C11.8891 10.3161 13.2593 10.6302 13.2304 10.6495C13.9783 10.8362 14.1135 11.3313 14.0911 11.7237L13.2295 15.18C13.2809 15.193 13.3477 15.212 13.4215 15.2416L13.3678 15.2282L13.3674 15.2281C13.322 15.2167 13.2747 15.2049 13.2262 15.1933L12.0185 20.0351C11.9271 20.2623 11.6952 20.6033 11.1723 20.4738C11.1908 20.5006 9.82999 20.1388 9.82999 20.1388L8.91309 22.2528L11.3164 22.8519C11.5796 22.9179 11.8397 22.9857 12.0971 23.0528L12.0971 23.0529C12.277 23.0997 12.4556 23.1463 12.6331 23.1917L11.8689 26.2604L13.7136 26.7205L14.4704 23.6844C14.9743 23.8213 15.4634 23.9474 15.9422 24.0664L15.1879 27.0882L17.0348 27.5484L17.7989 24.4854C20.9482 25.0814 23.3161 24.8412 24.3128 21.9927C25.116 19.6994 24.2728 18.3766 22.616 17.5139C23.8228 17.2356 24.7317 16.442 24.974 14.8025L24.9735 14.802L24.9734 14.8022ZM20.7533 20.7191C20.2297 22.8232 16.9362 21.9533 15.4294 21.5553C15.2938 21.5195 15.1727 21.4875 15.0694 21.4618L16.0836 17.3964C16.2095 17.4278 16.3633 17.4623 16.5377 17.5015C18.0963 17.8513 21.2898 18.5679 20.7534 20.7191H20.7533ZM16.8504 15.6146C18.1067 15.9499 20.8473 16.6813 21.3246 14.7689H21.3248C21.8121 12.8131 19.1488 12.2234 17.848 11.9354C17.7016 11.903 17.5725 11.8745 17.4671 11.8482L16.5476 15.5353C16.6345 15.5569 16.7363 15.5841 16.8504 15.6146Z"
              fill="white"
            />
          </svg>
          <div>0.8012 BTC</div>
        </div>
        <div className="seller">
          <div>Seller</div>
          <a>ox33333333</a>
        </div>
      </div>
      <div className="detail">
        <div className="unit">
            <div>Price(/Token)</div>
          <div>$40.883,50 USD</div>
        </div>
        <div className="total">
          <div>Total price</div>
          <a>$34.844</a>
        </div>
      </div>

      <button>Buy Token</button>
    </div>
  );
};

export default Card;
