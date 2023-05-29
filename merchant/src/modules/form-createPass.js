import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import validator from "validator";
import { useAppContext } from "../context/appContext";


import Email from '../assets/images/icon-email.svg';
import Key from '../assets/images/icon-key.svg';
import { Alert } from "../elements";

const initialState = {
    email: "",
    password: "",
    confirmPassword: ""
}

const FromResetPass = () => {
    const [value, setValue] = useState(initialState);
    const{
        isLoading, 
        dispatch,
        showAlert,
        resetPassword
    } = useAppContext();

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setValue((prev) => ({...prev,[name]: value,}));
    };

    const handleClick = async e => {

        e.preventDefault();

        const{
            email,
            password,
            confirmPassword
        } = value

        if(
            !email || 
            !password ||
            !confirmPassword
        ){
            dispatch({type:"ERROR", payload: {msg:"Please provide all the details."}});
            return
        } else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(!validator.isEmail(email)){
            dispatch({type:"ERROR", payload: {msg:"Please provide valid Email address"}});
            return
        }else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(password.length < 6){
            dispatch({type:"ERROR", payload: {msg:"Password must be at least 6 character long"}});
            return
        }else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(password !== confirmPassword || confirmPassword !== password){
            dispatch({type:"ERROR", payload: {msg:"Password and Confirmed password does not match"}});
            return
        }else{
            dispatch({type:"CLEAR_ALERT"})
        }


        const data = {
            email,
            password,
            confirmPassword
        }

        resetPassword(data)

    }
    return(
        <div className='mt-5'>
            <Row>
                <Col className='mt-5'>
                    <h3 className='fw-bold'>Create New Password!</h3>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Form>
                    {/* Error */}
                    {showAlert && 
                        <div className="mb-4">
                            <Alert />
                        </div>
                    }
                    {/* Error: end */}

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
                                name="email"
                                placeholder="Enter email address"
                                type="text"
                                onChange={handleChange} 
                                value={value.email}
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
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={handleChange}
                                value={value.rpPassword}

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
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirmed Password"
                                type="password"
                                onChange={handleChange}
                                value={value.confirmPassword}
                            />
                        </InputGroup>
                    </FormGroup>
                    <Button disabled={isLoading} className="text-uppercase fw-medium" color="primary" block onClick={handleClick}>Reset Password</Button>
                </Form>
            </Row>
            
        </div>
    );
}

export default FromResetPass