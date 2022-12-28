import { Col, Container, Row } from "reactstrap";

// Form import
import {FromRegistration} from "../../modules/index.js";

// Assets
import {Logo,IllustrationRegistration} from '../../assets/images/index.js';
import { useAppContext } from "../../context/appContext.js";
import { useEffect } from "react";


const Register = () =>{
    const {setAreaList} = useAppContext();
    useEffect(() => {
        setAreaList();
    }, [])
    
    return(
        <div className="min-vh-100">
            <Container fluid>
                <Row>
                    <Col className="bg-white p-0 min-vh-100 d-flex flex-column position-fixed app-sidebar app-sidebar_registration d-none d-md-block"  xs="12" lg="3">
                       
                        {/* Logo */}
                        <div className='brand-logo  p-5'>
                            <img src={Logo} alt='' />
                        </div>

                        {/* Illustration */}
                        <div className="overflow-hidden">
                            <img src={IllustrationRegistration} alt='Marchent Registration' />
                        </div>

                        {/* support */}
                        <div className="mt-auto p-5">
                            <p>Call for support <span className="fw-bold">013 1504 0934</span></p>
                        </div>

                    </Col>
                    
                    {/* Registration */}
                    <Col className="app-main_registration">

                        {/* Logo */}
                        <div className='brand-logo p-2 d-xs-block d-md-none'>
                            <img src={Logo} alt='' />
                        </div>

                        <Row className="justify-content-center pt-5">

                            <Col md="6">
                                <h3 className="fw-semibold">Create Marchent Account</h3>
                                <p>Please fill up the form to create your marchent account.</p>
                            </Col>
                        </Row>

                        <FromRegistration />
                        
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Register