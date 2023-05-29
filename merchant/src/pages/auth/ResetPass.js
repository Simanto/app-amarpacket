import { Container, Row, Col } from 'reactstrap';

import {Logo} from '../../assets/images/index.js';
import {FromResetPass} from '../../modules/index.js';


const ResetPass = () =>{
    return(
        <div className='min-vh-100'>
            <Container fluid>
                <Row>
                {/* Form */}
                <Col className="bg-white min-vh-100 d-flex flex-column h-auto p-5" xs="12" lg="3">
                    {/* Logo */}
                    <div className='brand-logo'>
                    <img src={Logo} alt='' />
                    </div>

                

                    {/* Form */}
                    <div className="wrapper-login mb-auto">
                        <FromResetPass />
                    </div>

                    <div className="mt-auto">
                    <p>Call for support <span className="fw-bold">013 1504 0934</span></p>
                    </div>

                </Col>
                {/* Form End */}

                {/* Illustration */}
                <Col className="p-0 illustration-delivery_truck">
                    
                </Col>
                {/* Illustration End */}
                </Row>
            </Container>
        </div>
    )
}

export default ResetPass