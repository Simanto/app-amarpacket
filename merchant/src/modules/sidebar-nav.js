import { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav,NavItem } from "reactstrap";
import { useAppContext } from "../context/appContext";


// Imports: Assets
const SideBarNav = () =>{
    const [isMerchant, setIsMerchant] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)

    const {user} = useAppContext()
    useEffect(() => {
        if(user.role === "merchant"){
            setIsMerchant(true)
        }
        if(user.role === "super-admin"){
            setIsSuperAdmin(true)
        }
    }, [])
    
    return(
        <Fragment>
            {isMerchant ?  
                <Nav>
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
                            to="/packets/all"
                            >
                            <div className="nav-icon nav-icon_packets"></div>
                            <span className="nav-label">Packets</span>
                        </NavLink>
                        
                    </NavItem>

                    <NavItem>

                        <NavLink
                            className="nav-link"
                            to="/customers"
                            >
                            <div className="nav-icon nav-icon_customers"></div>
                            <span className="nav-label">Customers</span>
                        </NavLink>
                        
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="nav-link"
                            to="/payments"
                            >
                            <div className="nav-icon nav-icon_payments"></div>
                            <span className="nav-label">Payments</span>
                        </NavLink>
                    </NavItem>
                    <NavItem className="d-flex d-sm-none">
                        <NavLink
                            className="nav-link"
                            to="/profile"
                            >
                            <div className="nav-icon nav-icon_settings"></div>
                            <span className="nav-label">Settings</span>
                        </NavLink>
                    </NavItem>
                </Nav>
                :

                isSuperAdmin ?
                <Nav>
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
                            <span className="nav-label">Merchants</span>
                        </NavLink>
                        
                    </NavItem>
                    
                    <NavItem>
                        <NavLink
                            className="nav-link"
                            to="admin/packets/weekly"
                            >
                            <div className="nav-icon nav-icon_packets"></div>
                            <span className="nav-label">Packets</span>
                        </NavLink>
                    </NavItem>
                    
                    <NavItem>
                        <NavLink
                            className="nav-link"
                            to="admin/payments"
                            >
                            <div className="nav-icon nav-icon_payments"></div>
                            <span className="nav-label">Payments</span>
                        </NavLink>
                    </NavItem>
                        
                    <NavItem className="d-flex d-sm-none">
                        <NavLink
                            className="nav-link"
                            to="admin/logout"
                            >
                            <div className="nav-icon nav-icon_logout"></div>
                            <span className="nav-label">Logout</span>
                        </NavLink>
                    </NavItem>
                    
                </Nav>
                :
                <Nav>
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
                            <span className="nav-label">Merchants</span>
                        </NavLink>
                        
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className="nav-link"
                            to="admin/packets/all"
                            >
                            <div className="nav-icon nav-icon_packets"></div>
                            <span className="nav-label">Packets</span>
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className="nav-link"
                            to="admin/payments"
                            >
                            <div className="nav-icon nav-icon_payments"></div>
                            <span className="nav-label">Payments</span>
                        </NavLink>
                    </NavItem>
                        
                    <NavItem className="d-flex d-sm-none">
                        <NavLink
                            className="nav-link"
                            to="admin/logout"
                            >
                            <div className="nav-icon nav-icon_logout"></div>
                            <span className="nav-label">Logout</span>
                        </NavLink>
                    </NavItem>
                </Nav>
            }

            
        </Fragment>
    );
}

export default SideBarNav