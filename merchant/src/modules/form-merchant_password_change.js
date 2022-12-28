import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useAppContext } from '../context/appContext'
import { Alert } from '../elements';

const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
}

const FormPassword = () => {
    const [value, setValue] = useState(initialState);
    const {showAlert, merchantChangePassword, dispatch} = useAppContext();
    
    const handleInput = (e) =>{
        const { name, value } = e.target;
        setValue((prev) => ({...prev,[name]: value,}));
    };

    const handleClick = (e) =>{
        e.preventDefault();

        const{
            oldPassword,
            newPassword,
            confirmNewPassword
        } = value

        if(
            !oldPassword || 
            !newPassword ||
            !confirmNewPassword
        ){
            dispatch({type:"ERROR", payload: {msg:"Please provide all the passwords."}});
            return
        }

        if(oldPassword.length < 6 || newPassword.length < 6  ){
            dispatch({type:"ERROR", payload: {msg:"Password must be at least 6 character long"}});
            return
        }
        if(oldPassword === newPassword ){
            dispatch({type:"ERROR", payload: {msg:"New Password can not be same as Old Password"}});
            return
        }

        if(newPassword !== confirmNewPassword || confirmNewPassword !== newPassword){
            dispatch({type:"ERROR", payload: {msg:"New Password and Confirmed New Password does not match"}});
            return
        }

        dispatch({type: "CLEAR_ALERT"})

        const passwords = {
            oldPassword,
            newPassword
        }

        merchantChangePassword(passwords)

    }


  return (
    <div className="p-4">
        <Row>
            <Col>
                <h6 className='fw-bold text-dark'>Change Password</h6>
            </Col>
        </Row>
        <Row className="mt-2">
            <Form>
                 {/* Error */}
                 {showAlert && <Alert /> }

                {/* Old Password */}
                <FormGroup>
                    <Label for="bikash_number" className="fw-medium mt-2">
                        Old Password
                    </Label>
                    <Input
                        id="oldPassword"
                        name="oldPassword"
                        placeholder="Old Password"
                        type="password"
                        onChange={handleInput}
                        value={value.oldPassword}
                    />
                </FormGroup>

                {/* New Password */}
                <FormGroup>
                    <Label for="bikash_number" className="fw-medium mt-2">
                        New Password
                    </Label>
                    <Input
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        type="password"
                        onChange={handleInput}
                        value={value.newPassword}
                    />
                </FormGroup>
                {/* Confirm New Password */}
                <FormGroup>
                    <Label for="bikash_number" className="fw-medium mt-2">
                        Confirmed New Password
                    </Label>
                    <Input
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        placeholder="Confirmed New Password"
                        type="password"
                        onChange={handleInput}
                        value={value.confirmNewPassword}
                    />
                </FormGroup>

                {/* button */}
                <Button color='primary' onClick={handleClick}>Update Password</Button>
            </Form>
        </Row>
    </div>
  )
}

export default FormPassword