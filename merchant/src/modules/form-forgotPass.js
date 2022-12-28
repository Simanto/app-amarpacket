import { Alert, Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";


import Email from '../assets/images/icon-email.svg';

const FormForgotPass = () => {
    return(
        <div className='mt-5'>
            <Row>
                <Col className='mt-5'>
                    <h3 className='fw-bold'>Forgot Password!</h3>
                    <p>To reset your password, please contact support at 01315040934.</p>
                </Col>
            </Row>
            {/* <Row className='mt-3'>
                <Form>
                    <FormGroup className="mb-4">
                        <Label for="Email" className="fw-medium">
                        Email
                        </Label>
                        <InputGroup>
                            <InputGroupText>
                                <img src={Email} alt='Email' />
                            </InputGroupText>
                            <Input
                                id="email"
                                name="Email"
                                placeholder="Enter email address"
                                type="email"
                            />
                        </InputGroup>
                    </FormGroup>
                    <Button className="text-uppercase fw-medium" color="primary" block>Reset Password</Button>
                </Form>
            </Row> */}

            {/* <Alert className="success mt-3">
                Please check your email inbox for a link to complete the reset.
            </Alert> */}
            
        </div>
    );
}

export default FormForgotPass