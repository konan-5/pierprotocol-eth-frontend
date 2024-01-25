import Image from "next/image";
// import EthereumIcon from "../../assets/images/ethereum-logo.png"
// import MetamaskIcon from "../../assets/images/metamask-logo.png"
// import SolidityIcon from "../../assets/images/solidity-logo.png"
// import UniswapIcon from "../../assets/images/uniswap-logo.png"
import promoImage1 from '../../assets/images/promo-1.png'
import promoImage2 from '../../assets/images/promo-2.png'
import promoImage3 from '../../assets/images/promo-3.png'
import promoImage4 from '../../assets/images/promo-4.png'
import promoImage5 from '../../assets/images/promo-5.png'
import Link from "next/link";

const Banner = () => {
  return (
    <div className="banner-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-text">
              <div className="fs-80 text-g">Pier Protocol</div>
              <p>
                A cutting-edge multi-chain peer-to-peer protocol, transforming digital asset exchange with unmatched security and speed across diverse blockchains.
              </p>
              <div className="d-flex justify-content-center gap-4">
                <Link className="btn-lg btn-gray" href="/dashboard">LAUNCH APP</Link>
                <button className="btn-lg">Buy $PIER</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-map">
              {/* <Image src={map} className="img-fluid" alt="" /> */}
              <div class="webm-container">
                <video width={"100%"} loop autoplay="true" muted playsinline>
                  <source src="world.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="promo-area">
              <div className="fs-36 fw-semibold text-center">
                Powering tools and integrations from companies
                all around the world
              </div>
              <div className="promo-content">
                {promoData.map((item, index) => (
                  <div className="promo-item" key={index}>
                    <Image src={item.src} alt={item.alt} height={60} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

const promoData = [
  { src: promoImage1, alt: "Image" },
  { src: promoImage2, alt: "Image" },
  { src: promoImage3, alt: "Image" },
  { src: promoImage4, alt: "Image" },
  { src: promoImage5, alt: "Image" },
];
