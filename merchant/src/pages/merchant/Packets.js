import { useEffect, useState } from "react";
import classnames from "classnames";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"
import { AllPackets, TableMerchantDelivered, TableMerchantOutForDelivery, TableMerchantReturned } from "../../modules";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const Packets = () =>{
    const{dispatch} = useAppContext()

    // State for current active Tab
    const [activeTab, setActiveTab] = useState("all");
  
    // Toggle active state for Tab
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    useEffect(() => {
      dispatch({type:"CLEAR_PACKET_VALUES"})
    }, [])
    

    return(
        <div>
            {/* Header */}
            <div className='app-header p-4 d-flex flex-row justify-content-between'>
                <div className='app-header_title pt-1'>
                    <h4>Packets</h4>
                </div>
                <div className='app-header_date d-flex justify-content-center align-items-center'>
                    <Link to={'/add-packet'} className='btn btn-primary text-uppercase fw-medium mb-2'> Add Packet</Link>
                </div>
            </div>
            {/* End */}

            {/* Card: Tab - Packets Table */}
            <div className="app-inner mx-4">
                <div className="card">
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
                        <TabPane tabId="all" className="p-0 table-packets">
                            <AllPackets />
                        </TabPane>
                        {/* End */}
                        {/* Table: On Route Packet */}
                        <TabPane tabId="onRoute" className="p-0">
                            <div className="table-packets">
                                <TableMerchantOutForDelivery />
                            </div>
                        </TabPane>
                        {/* End */}
                        {/* Table: On Route Packet */}
                        <TabPane tabId="delivered" className="p-0">
                            <div className="table-packets">
                                <TableMerchantDelivered />
                            </div>
                        </TabPane>
                        {/* End */}
                        {/* Table: On Route Packet */}
                        <TabPane tabId="returned" className="p-0">
                            <div className="table-packets">
                                <TableMerchantReturned />
                            </div>
                        </TabPane>
                        {/* End */}
                    </TabContent>
                    {/* End: TAB - Content */}
                </div>
            </div>
            {/* End */}
        </div>
    )
}

export default Packets