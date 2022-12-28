import React, {useEffect, useState} from 'react'
import classnames from "classnames";
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { TableAdminAllPackets } from '../../modules';



const AdminPackets = () => {
    // State for current active Tab
    const [activeTab, setActiveTab] = useState("all");
  
    // Toggle active state for Tab
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    useEffect(() => {
        window.history.scrollRestoration = 'manual'
      }, []);
      
  return (
    <>
        <div className='app-header p-4 d-flex flex-row justify-content-between'>
            <div className='app-header_title pt-1'>
                <h4>Packets</h4>
            </div>
        </div>

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
                                        activeTab === "assignPickup"
                                })}
                                onClick={() => { toggle("assignPickup"); }}
                            >
                                Assign Pickup
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                                className={classnames({
                                    active:
                                        activeTab === "onPickup"
                                })}
                                onClick={() => { toggle("onPickup"); }}
                            >
                                On Pickup
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                                className={classnames({
                                    active:
                                        activeTab === "atHub"
                                })}
                                onClick={() => { toggle("atHub"); }}
                            >
                                At hub
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
                                        activeTab === "canceled"
                                })}
                                onClick={() => { toggle("canceled"); }}
                            >
                                canceled
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                                className={classnames({
                                    active:
                                        activeTab === "wayToReturn"
                                })}
                                onClick={() => { toggle("wayToReturn"); }}
                            >
                                Way to Return
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
                        <TableAdminAllPackets />
                    </TabPane>
                    {/* End */}
                    {/* Table: On Route Packet */}
                    <TabPane tabId="assignPickup" className="p-4">
                        <div>
                            Assign Pickup
                        </div>
                    </TabPane>
                    {/* End */}
                    {/* Table: On Route Packet */}
                     <TabPane tabId="onPickup" className="p-4">
                        <div>
                            On Pickup
                        </div>
                    </TabPane>
                    {/* End */}
                    {/* Table: On Route Packet */}
                    <TabPane tabId="atHub" className="p-4">
                        <div>
                            At hub / on hold
                        </div>
                    </TabPane>
                    {/* End */}
                    {/* Table: On Route Packet */}
                    <TabPane tabId="onRoute" className="p-4">
                        <div>
                            On Route
                        </div>
                    </TabPane>
                    {/* End */}
                    {/* Table: On Route Packet */}
                    <TabPane tabId="delivered" className="p-4">
                        <div>
                            Delivered
                        </div>
                    </TabPane>
                    {/* End */}
                    {/* Table: On Route Packet */}
                    <TabPane tabId="canceled" className="p-4">
                        <div>
                            Canceled
                        </div>
                    </TabPane>
                    {/* End */}
                    {/* Table: On Route Packet */}
                    <TabPane tabId="wayToReturn" className="p-4">
                        <div>
                            Way to return
                        </div>
                    </TabPane>
                    {/* End */}
                    {/* Table: On Route Packet */}
                    <TabPane tabId="returned" className="p-4">
                        <div>
                            Returned
                        </div>
                    </TabPane>
                    {/* End */}
                </TabContent>
                {/* End: TAB - Content */}
            </div>
            {/* End */}
    </>
  )
}

export default AdminPackets