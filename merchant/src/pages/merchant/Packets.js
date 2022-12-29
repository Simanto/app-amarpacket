import { useState } from "react";
import classnames from "classnames";
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"
import { AllPackets, TableMerchantDelivered, TableMerchantOutForDelivery, TableMerchantReturned } from "../../modules";
import { Link } from "react-router-dom";

const Packets = () =>{

    // State for current active Tab
    const [activeTab, setActiveTab] = useState("all");
  
    // Toggle active state for Tab
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return(
        <div>
            {/* Header */}
            <div className='app-header p-4 d-flex flex-row justify-content-between'>
                <div className='app-header_title pt-1'>
                    <h4>Packets</h4>
                </div>
                <div className='app-header_date d-flex justify-content-center align-items-center'>
                    <Link to={'add-packet'} className='btn btn-primary text-uppercase fw-medium mb-2'> Add Packet</Link>
                </div>
            </div>
            {/* End */}

            {/* Card: Tab - Packets Table */}
            <div className="card mx-4">
                {/* Tab - Header */}
                <Nav tabs className="ps-4">
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active:
                                    activeTab === "all"
                            })}
                            onClick={() => { toggle("all"); }}
                        >
                            All
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                                className={classnames({
                                    active:
                                        activeTab === "onRoute"
                                })}
                                onClick={() => { toggle("onRoute"); }}
                            >
                                On Route
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                                className={classnames({
                                    active:
                                        activeTab === "delivered"
                                })}
                                onClick={() => { toggle("delivered"); }}
                            >
                                Delivered
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                                className={classnames({
                                    active:
                                        activeTab === "returned"
                                })}
                                onClick={() => { toggle("returned"); }}
                            >
                                Returned
                        </NavLink>
                    </NavItem>
                </Nav>
                {/* End: Tab - Header */}
                {/* TAB - Content */}
                <TabContent activeTab={activeTab}>
                    {/* Table: All Packets*/}
                    <TabPane tabId="all" className="p-0">
                        <AllPackets />
                    </TabPane>
                    {/* End */}
                    {/* Table: On Route Packet */}
                    <TabPane tabId="onRoute" className="p-0">
                        <div>
                            <TableMerchantOutForDelivery />
                        </div>
                    </TabPane>
                    {/* End */}
                    {/* Table: On Route Packet */}
                    <TabPane tabId="delivered" className="p-0">
                        <div>
                            <TableMerchantDelivered />
                        </div>
                    </TabPane>
                    {/* End */}
                    {/* Table: On Route Packet */}
                    <TabPane tabId="returned" className="p-0">
                        <div>
                           <TableMerchantReturned />
                        </div>
                    </TabPane>
                    {/* End */}
                </TabContent>
                {/* End: TAB - Content */}
            </div>
            {/* End */}
        </div>
    )
}

export default Packets