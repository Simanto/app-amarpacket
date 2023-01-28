import {useState} from "react";
import { Link, Outlet, useNavigate } from "react-router-dom"
import { PendingVerification, SideBarNav } from "../modules"
import { useAppContext } from "../context/appContext"


// Import Assets
import {IconArrowRightS, IconUser, Logo, LogoLight, LogoPrint} from "../assets/images/index.js"
import { useEffect } from "react"
import { Container, Row } from "reactstrap"


const SharedLayout = () => {
    const [isAdmin, setIsAdmin] = useState(false)

    const {
        getMerchant,
        user,
        data,
        logOut,
    } = useAppContext();

    useEffect(() =>{
        if(user.role === "merchant"){
            getMerchant()
        }
        if(user.role === "admin"){
            setIsAdmin(true)
        }
    },[]);

    const {isVerified,business_name,phone} = data;

    const navigate = useNavigate();

    const handleClick = () =>{
        if(user.role === "merchant"){
            navigate("/profile");
        }
        if(user.role === "admin"){
            logOut();
        }
    }
    
  return (
    // App Wrapper
    <div className="app-wrapper">
    {/* App Sidebar */}
        <div className="sidebar-desktop d-none d-sm-block">
            <div className="app-sidebar app-sidebar_navbar min-vh-100 position-fixed d-flex flex-column">
                {/* Header */}
                <div className="app-sidebar_header p-4">
                    <img src={LogoLight} alt="Amar Packet" />
                </div>
                {/* End of header */}
                
                {/* Navbar */}
                <div className='app-sidebar_nav'>
                    <SideBarNav />
                </div>
                {/* End of navbar */}

                {/* Footer */}
                <div className='mt-auto border border-top border-dark user-info' onClick={handleClick}>
                    <div className="d-flex flex-row align-items-center p-2">
                        <div className="img-picto rounded-circle bg-primary d-flex align-items-center justify-content-center me-2">
                            <img src={IconUser} alt="User Icon" className="icon icon-user" />
                        </div>
                        <div className="flex-fill">
                            <div className="text-white fw-medium user-info_name"> 
                                {isAdmin ? <span>{user.name}</span> : <span>{business_name}</span>}
                                
                            </div>
                            <div className="text-white opacity-75">
                                {isAdmin ? <span>{user.role}</span> : <span>{phone}</span>}
                            </div>
                        </div>
                        <div>
                            <img src={IconArrowRightS} alt="Icon Arrow" className="icon icon-white" />
                        </div>
                    </div>
                </div>
                {/* End of footer */}
            </div>
        </div>
        {/* End of App Sidebar */}
        
        {/* App Main */}
        <Container fluid className="app-main_body position-relative min-vh-100">
            <Row className="bg-primary_dark">
                <div className="app-sidebar_sm d-flex d-sm-none lign-items-center jsutify-content-start">
                    <div>
                        <Link className="menu-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-36"><path fill="none" d="M0 0h24v24H0z"/><path d="M22 12.999V20a1 1 0 0 1-1 1h-8v-8.001h9zm-11 0V21H3a1 1 0 0 1-1-1v-7.001h9zM11 3v7.999H2V4a1 1 0 0 1 1-1h8zm10 0a1 1 0 0 1 1 1v6.999h-9V3h8z" fill="currentColor"/></svg>
                        </Link>
                    </div>
                    <div className="logo">
                        <img src={LogoLight} alt="Amar Packet" />
                    </div>
                    <div>
                        <Link to="#" className="btn btn-sm btn-outline-primary">Add Packet</Link>
                    </div>
                </div>
            </Row>

            {/* {isAdmin ? 
                <Outlet /> 
                :
                <>
                {isVerified ? 
                    <Outlet />
                    :
                    <PendingVerification />
                }
                </>
            } */}
        </Container>
        {/* End of App Main */}
    </div>
// End of App Wrapper
  )
}

export default SharedLayout
