import Image from "next/image";
import EthereumIcon from "../../assets/images/ethereum-logo.png"
import MetamaskIcon from "../../assets/images/metamask-logo.png"
import SolidityIcon from "../../assets/images/solidity-logo.png"
import UniswapIcon from "../../assets/images/uniswap-logo.png"
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
                Discover a groundbreaking peer-to-peer experience, blending
                technology seamlessly for innovative collaboration and
                meaningful connections that transcend boundaries.
              </p>
              <div className="d-flex justify-content-center gap-4">
                <Link className="btn-lg btn-gray" href="/coming-soon">LAUNCH APP</Link>
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
              <div className="promo-title fs-20 fw-semibold text-center">
                POWERING TOOLS AND INTEGRATIONS FROM COMPANIES ALL AROUND THE
                WORLD
              </div>
              <div className="promo-content">
                {promoData.map((item, index) => (
                  <div className="promo-item" key={index}>
                    <Image src={item.src} alt={item.alt} height={60}/>
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
  { src: EthereumIcon,alt :"Ethereum" },
  { src: MetamaskIcon,alt :"Metamask" },
  { src: SolidityIcon,alt :"Solidity" },
  { src: UniswapIcon,alt :"Uniswap" },
];
