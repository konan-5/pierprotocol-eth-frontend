import Link from "next/link";
import React from "react";
import logo from "../../assets/images/logo.png";
import Image from "next/image";

const OtherHeader = () => {
  return (
    <div className="other-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="other-content">
              <Link href="">
                <Image src={logo} alt="logo" />
              </Link>
              <Link href="/" className="btn-lg navbar-btn">
                <span>Connect Wallet</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherHeader;
