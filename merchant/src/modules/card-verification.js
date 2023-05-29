import { Col, Row } from "reactstrap";
import { useAppContext } from "../context/appContext"
import { IllustrationVerification } from "../assets/images";

const PendingVerification = () => {
    const {logOut} = useAppContext();
    const handleClick = () =>{
        logOut();
    }

    return(
        <Row className="justify-content-center min-vh-100 d-flex align-items-center">
            <Col md="5" className="text-center"> 
                <img src={IllustrationVerification} alt="Pending Verification" />
                <h5>Please wait while we verify your account</h5>
                <p>One of our representatice will be calling you to verify your account. Please wait, it might take 24 to 48 hours.</p>
                <div className="align-self-center">
                    <div className="btn btn-primary btn-logout text-uppercase fw-medium" onClick={handleClick}>Logout</div>
                </div>
            </Col>
        </Row>
    );
}

export default PendingVerification