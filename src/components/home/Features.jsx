import Integration from "@/assets/icons/Integration";
import Security from "@/assets/icons/Security";
import Speed from "@/assets/icons/Speed";

const Features = () => {
  return (
    <div className="features-area" id="features">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="fs-70 fw-bold text-center title">Key Features</div>
            <div className="features-content">
              {featureData.map((item) => (
                <div className="features-item" key={item.id}>
                  <div className="icon">{item.icon}</div>
                  <div className="fs-40 fw-bold title">{item.title}</div>
                  <p className="fs-10">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

const featureData = [
  {
    id: 1,
    icon: <Speed />,
    title: "High-Speed Transactions",
    text: "Utilizing Ethereum's advanced blockchain, our protocol ensures rapid transaction processing, far exceeding traditional speeds.",
  },
  {
    id: 1,
    icon: <Security />,
    title: "Enhanced Security",
    text: "With a direct peer-to-peer approach, our protocol maximizes security, fostering trust and reliability in every interaction.",
  },
  {
    id: 1,
    icon: <Integration />,
    title: "Smart Contract Integration",
    text: "Our smart contracts, optimized for Ethereum, enable a wide range of applications, all benefiting from peer-to-peer efficiency.",
  },
];
