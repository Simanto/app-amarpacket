import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { Alert } from "../elements";
import { useAppContext } from "../context/appContext.js";
import { GET_DATA_SUCESS } from "../context/actions";

const FormAddBank = () => {

    const [value, setValue] = useState({
        bank_name: "",
        branch_name: "",
        account_holder_name: "",
        account_number: ""
    })

    const {
        isLoading,
        showAlert,
        addPaymentMethodBank,
        dispatch,
        handleChange,
        merchant_bank_name,
        merchant_branch_name,
        merchant_account_holder_name,
        merchant_account_number,
    } = useAppContext();

    const handleInput = (e) =>{
        const {name,value} = e.target;
        handleChange({name,value})
    };

    const handleClick = async e => {
        e.preventDefault();

        if(!merchant_bank_name || !merchant_branch_name || !merchant_account_holder_name || !merchant_account_number){
            dispatch({type:"ERROR", payload: {msg:"Please provide all the details."}});
            return
        }

        addPaymentMethodBank();
    };

    return(
        <div className="p-4">
            <Row>
                <Col>
                    <h6 className='fw-bold text-dark'>Bank Account</h6>
                </Col>
            </Row>
            <Row className="mt-2">
                <Form>
                     {/* Error */}
                    {showAlert && <Alert /> }
                    {/* Error: end */}
                    <FormGroup className="mb-4">
                        <Label for="Bank Name" className="fw-medium mt-2">
                        Bank Name
                        </Label>
                            <Input
                                id="merchant_bank_name"
                                name="merchant_bank_name"
                                placeholder="Enter bank name"
                                type="text"
                                onChange={handleInput}
                                value={merchant_bank_name}
                            />
                    </FormGroup>

                    <FormGroup className="mb-4">
                        <Label for="branch" className="fw-medium">
                            Branch 
                        </Label>
                            <Input
                                id="merchant_branch_name"
                                name="merchant_branch_name"
                                placeholder="Enter branch name"
                                type="text"
                                onChange={handleInput}
                                value={merchant_branch_name}
                            />
                    </FormGroup>

                    <FormGroup className="mb-4">
                        <Label for="account_holder_name" className="fw-medium">
                            Account Holder Name 
                        </Label>
                            <Input
                                id="merchant_account_holder_name"
                                name="merchant_account_holder_name"
                                placeholder="Enter account holder name"
                                type="text"
                                onChange={handleInput}
                                value={merchant_account_holder_name}
                            />
                    </FormGroup>

                    <FormGroup className="mb-4">
                        <Label for="account_number" className="fw-medium">
                            Account Holder Number 
                        </Label>
                            <Input
                                id="merchant_account_number"
                                name="merchant_account_number"
                                placeholder="Enter account number"
                                type="text"
                                onChange={handleInput}
                                value={merchant_account_number}
                            />
                    </FormGroup>
                    <Button className="text-uppercase fw-medium" color="primary" block onClick={handleClick}>SAVE</Button>
                </Form>
            </Row>
            
        </div>
    );
}

export default FormAddBank