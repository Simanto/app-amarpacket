import { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav,NavItem } from "reactstrap";
import { useAppContext } from "../context/appContext";


// Imports: Assets
const SideBarNav = () =>{

    const [isMerchant, setIsMerchant] = useState(false)
    const {user} = useAppContext()
    useEffect(() => {
        if(user.role === "merchant"){
            setIsMerchant(true)
        }
    }, [])
    
    return(
        <Fragment>
        {isMerchant ?  
            <Nav vertical>
                <NavItem> 
                    <NavLink
                        className="nav-link"
                        to="/dashboard"
                        >

                        <span className="nav-icon nav-icon_dashboard"></span>
                        <span className="nav-label">Dashboard</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className="nav-link"
                        to="/packets"
                        >
                        <div className="nav-icon nav-icon_packets"></div>
                        Packets
                    </NavLink>
                    
                </NavItem>

                <NavItem>

                    <NavLink
                        className="nav-link"
                        to="/customers"
                        >
                        <div className="nav-icon nav-icon_customers"></div>
                        Customers
                    </NavLink>
                    
                </NavItem>
                <NavItem>
                    <NavLink
                        className="nav-link"
                        to="/payments"
                        >
                        <div className="nav-icon nav-icon_payments"></div>
                        Payments
                    </NavLink>
                </NavItem>
            </Nav>
            :
            <Nav vertical>
                <NavItem> 
                    <NavLink
                        className="nav-link"
                        to="admin/users"
                        >

                        <span className="nav-icon nav-icon_dashboard"></span>
                        <span className="nav-label">Users</span>
                    </NavLink>
                </NavItem>
                <NavItem>

                    <NavLink
                        className="nav-link"
                        to="admin/merchants"
                        >
                        <div className="nav-icon nav-icon_customers"></div>
                        Merchants
                    </NavLink>
                    
                </NavItem>
                <NavItem>
                    <NavLink
                        className="nav-link"
                        to="admin/packets"
                        >
                        <div className="nav-icon nav-icon_packets"></div>
                        Packets
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className="nav-link"
                        to="admin/payments"
                        >
                        <div className="nav-icon nav-icon_payments"></div>
                        Payments
                    </NavLink>
                </NavItem>
            </Nav>
        }
        </Fragment>
    );
}

export default SideBarNav