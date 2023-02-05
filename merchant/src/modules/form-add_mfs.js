import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { Alert } from "../elements";
import { useAppContext } from "../context/appContext.js";

const FormAddMFS = () => {

    const [value, setValue] = useState({
        bank_name: "",
        branch_name: "",
        account_holder_name: "",
        account_number: ""
    })

    const {
        isLoading,
        showAlert,
        dispatch,
        addPaymentMethodMFS,
        handleChange,
        merchant_bank_name,
        merchant_branch_name,
        merchant_account_holder_name,
        merchant_account_number,
        merchant_bikash_number,
        merchant_nagad_number,
    } = useAppContext();

    
    
    const handleInput = (e) =>{
        const {name,value} = e.target;
        handleChange({name,value})
    };

    const handleClick = async e => {
        e.preventDefault();

        if(!merchant_bikash_number && !merchant_nagad_number){
            dispatch({type:"ERROR", payload: {msg:"Please provide Bkash or Nagad phone number"}});
            setTimeout(() => {
                dispatch({type:"CLEAR_ALERT"})
            }, 5000);
            return
        } 

        addPaymentMethodMFS();
        
    };

    return(
        <div className="p-4">
            <Row>
                <Col>
                    <h6 className='fw-bold text-dark'>Bikash/Nagad Account</h6>
                </Col>
            </Row>
            <Row className="mt-2">
                <Form>
                     {/* Error */}
                    {showAlert && <Alert /> }
                    {/* Error: end */}
                    <FormGroup className="mb-4">
                        <Label for="bikash_number" className="fw-medium mt-2">
                        Bikash Phone Number
                        </Label>
                            <Input
                                id="merchant_bikash_number"
                                name="merchant_bikash_number"
                                placeholder="Enter bikash phone no."
                                type="text"
                                onChange={handleInput}
                                value={merchant_bikash_number}
                            />
                    </FormGroup>

                    <FormGroup className="mb-4">
                        <Label for="branch" className="fw-medium">
                            Nagad Phone Number 
                        </Label>
                            <Input
                                id="merchant_nagad_number"
                                name="merchant_nagad_number"
                                placeholder="Enter nagad phone no"
                                type="text"
                                onChange={handleInput}
                                value={merchant_nagad_number}
                            />
                    </FormGroup>
                    <Button className="text-uppercase fw-medium" color="primary" block onClick={handleClick}>Save</Button>
                </Form>
            </Row>
            
        </div>
    );
}

export default FormAddMFS