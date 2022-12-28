import {useState} from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { PendingVerification, SideBarNav } from "../modules"
import { useAppContext } from "../context/appContext"


// Import Assets
import {IconArrowRightS, IconUser, LogoLight} from "../assets/images/index.js"
import { useEffect } from "react"
import { Container } from "reactstrap"


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
        {/* End of App Sidebar */}

        {/* App Main */}
        <Container fluid className="app-main_body position-relative min-vh-100">

            {isAdmin ? 
                <Outlet /> 
                :
                <>
                {isVerified ? 
                    <Outlet />
                    :
                    <PendingVerification />
                }
                </>
            }
        </Container>

        
        {/* End of App Main */}
    </div>
// End of App Wrapper
  )
}

export default SharedLayout
