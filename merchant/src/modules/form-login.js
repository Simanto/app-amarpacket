import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { Alert } from "../elements";
import { useAppContext } from "../context/appContext.js";

import { IconEmail, IconKey } from "../assets/images";

const LoginForm = () => {

    const [credential, setCredential] = useState({
        email: undefined,
        password: undefined
    })

    const {
        user,
        token,
        isLoading,
        showAlert,
        login,
        dispatch
    } = useAppContext();

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setCredential((prev) => ({...prev, [e.target.id]: e.target.value}));
    };

    const handleClick = async e => {
        e.preventDefault();

        const {email, password} = credential;

        if(!email || !password){
            dispatch({type:"ERROR", payload: {msg:"Please provide all the details."}});
            return
        }

        const currentUser = {email, password}
        
        login(currentUser);
    };

    useEffect(() =>{
        if(user && token){
            if(user.role === "merchant"){
                navigate("/dashboard")
            }

            if(user.role === "admin" || user.role === "super-admin"){
                navigate("/admin/dashboard")
            }

            if(user.role === "agent"){
                navigate("/agent/dashboard")
            }
        }
    },[user, token, navigate]);

    return(
        <div className='mt-5'>
            <Row>
                <Col className='mt-5'>
                    <h3 className='fw-bold'>Welcome!</h3>
                    <p>Login to your marchent account</p>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Form>

                     {/* Error */}
                    {showAlert && <Alert /> }
                    {/* Error: end */}

                    <FormGroup className="mb-4 mt-4" autoCapitalize="off">
                        <Label for="Email" className="fw-medium">
                        Email
                        </Label>
                        <InputGroup>
                            <InputGroupText>
                                <img src={IconEmail} alt='Email' />
                            </InputGroupText>
                            <Input
                                id="email"
                                name="Email"
                                placeholder="Enter email address"
                                type="email"
                                onChange={handleChange}
                                value={credential.email}
                            />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup className="mb-4">
                        <Label for="Password" className="fw-medium">
                            Password
                        </Label>

                        <InputGroup>
                            <InputGroupText>
                                <img src={IconKey} alt='Key' />
                            </InputGroupText>
                            <Input
                                id="password"
                                name="Password"
                                placeholder="Password"
                                type="password"
                                onChange={handleChange}
                                value={credential.password}
                            />
                        </InputGroup>
                    </FormGroup>
                    <Button  className="text-uppercase fw-medium" color="primary" block onClick={handleClick}>Login</Button>
                </Form>
            </Row>
            
        </div>
    );
}

export default LoginForm