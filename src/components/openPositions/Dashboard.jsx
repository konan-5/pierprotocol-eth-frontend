import React from "react";
import { Tab, Nav } from "react-bootstrap";
import Buy from "./Buy";
import Sell from "./Sell";
import Activity from "./Activity";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="dashboard-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="fs-30 fw-bold title">Open Positions</div>
            <div className="dashboard-tabs">
              <Tab.Container defaultActiveKey="first">
                <div className="tabs-nav">
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="first">BUY</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">SELL</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Activity</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <div className="ml-lg-auto">
                    <Link href={"/list"} className="btn-lg">CREATE A TRADE</Link>
                  </div>
                </div>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Buy />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Sell />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Activity />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
