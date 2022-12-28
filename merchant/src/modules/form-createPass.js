import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";


import Email from '../assets/images/icon-email.svg';
import Key from '../assets/images/icon-key.svg';

const FromResetPass = () => {
    return(
        <div className='mt-5'>
            <Row>
                <Col className='mt-5'>
                    <h3 className='fw-bold'>Create New Password!</h3>
                </Col>
            </Row>
            <Row className='mt-3'>
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
                    <FormGroup className="mb-4">
                        <Label for="Password" className="fw-medium">
                            New Password
                        </Label>

                        <InputGroup>
                            <InputGroupText>
                                <img src={Key} alt='Key' />
                            </InputGroupText>
                            <Input
                                id="password"
                                name="Password"
                                placeholder="Password"
                                type="password"
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Label for="Password" className="fw-medium">
                            Confirm NewPassword
                        </Label>

                        <InputGroup>
                            <InputGroupText>
                                <img src={Key} alt='Key' />
                            </InputGroupText>
                            <Input
                                id="password"
                                name="Password"
                                placeholder="Password"
                                type="password"
                            />
                        </InputGroup>
                    </FormGroup>
                    <Button className="text-uppercase fw-medium" color="primary" block>Reset Password</Button>
                </Form>
            </Row>
            
        </div>
    );
}

export default FromResetPass