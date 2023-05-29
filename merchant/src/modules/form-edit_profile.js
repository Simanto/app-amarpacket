import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { Alert, InputSelect } from "../elements";
import { useAppContext } from "../context/appContext.js";

const FormMerchantProfile = () => {
    const [selectedArea, setSelectedArea ] = useState();

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
        areaList,
        handleChange,
        UpdateMerchant,

        // Merchant States
        merchant_name,
        merchant_email,
        merchant_fb_page,
        merchant_business_name,
        merchant_business_phone,
        merchant_pickup_area,
        merchant_pickup_address,
    } = useAppContext();

    
    
    const handleInput = (e) =>{
        const { name, value } = e.target;
        handleChange({name, value})
    };

    const handleSelect = (value) =>{
        const selectValue = value.label
        handleChange({
            name: "merchant_pickup_area",
            value: selectValue
        })
    }

    const handleClick = async e => {
        e.preventDefault();

        if( !merchant_name ||
            !merchant_email ||
            !merchant_fb_page ||
            !merchant_business_name ||
            !merchant_business_phone ||
            !merchant_pickup_area ||
            !merchant_pickup_address){
            dispatch({type:"ERROR", payload: {msg:"Please provide all details"}});
            setTimeout(() => {
                dispatch({type:"CLEAR_ALERT"})
            }, 5000);
            return
        }
        UpdateMerchant()
    };

    useEffect(() => {
        areaList.forEach(function(item){
            if(item.label === merchant_pickup_area){
                setSelectedArea(item);
            }
        })
    },[merchant_pickup_area])

    return(
        <div className="p-4">
            <Row>
                <Col>
                    <h6 className='fw-bold text-dark'>Profile</h6>
                </Col>
            </Row>
            <Row className="mt-2">
                <Form>
                     {/* Error */}
                    {showAlert && <Alert /> }
                    {/* Error: end */}
                    <FormGroup className="mb-4">
                        <Label for="bikash_number" className="fw-medium mt-2">
                        Owner Name
                        </Label>
                            <Input
                                id="merchant_name"
                                name="merchant_name"
                                placeholder="Enter owner name"
                                type="text"
                                onChange={handleInput}
                                value={merchant_name}
                            />
                    </FormGroup>

                    <FormGroup className="mb-4">
                        <Label for="branch" className="fw-medium">
                            Business Name 
                        </Label>
                            <Input
                                id="merchant_business_name"
                                name="merchant_business_name"
                                placeholder="Enter your email address"
                                type="text"
                                onChange={handleInput}
                                value={merchant_business_name}
                            />
                    </FormGroup>

                    <div className="w-100 d-flex justify-content-between">
                        <Col>
                            <FormGroup className="mb-4 me-2">
                                <Label for="branch" className="fw-medium">
                                    Email 
                                </Label>
                                    <Input
                                        id="merchant_email"
                                        name="merchant_email"
                                        placeholder="Enter your email address"
                                        type="text"
                                        onChange={handleInput}
                                        value={merchant_email}
                                    />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup className="mb-4 ms-2">
                                <Label for="branch" className="fw-medium">
                                    Phone 
                                </Label>
                                    <Input
                                        id="merchant_business_phone"
                                        name="merchant_business_phone"
                                        placeholder="Enter your email address"
                                        type="text"
                                        onChange={handleInput}
                                        value={merchant_business_phone}
                                    />
                            </FormGroup>
                        </Col>
                    </div>

                    <FormGroup className="mb-4">
                        <Label for="branch" className="fw-medium">
                            Facbook Page URL 
                        </Label>
                            <Input
                                id="merchant_fb_page"
                                name="merchant_fb_page"
                                placeholder="Enter your email address"
                                type="text"
                                onChange={handleInput}
                                value={merchant_fb_page}
                            />
                    </FormGroup>
                   

                    <FormGroup className="mb-4">
                        <Label for="branch" className="fw-medium">
                            Pickup Area
                        </Label>
                        <InputSelect options={areaList} name="user_isActive" value={selectedArea} defaultValue={selectedArea} placeholder="Select" handleChange={handleSelect} />
                    </FormGroup>

                    
                    <FormGroup className="mb-4">
                        <Label for="branch" className="fw-medium">
                            Address 
                        </Label>
                            <Input
                                id="merchant_pickup_address"
                                name="merchant_pickup_address"
                                placeholder="Enter your email address"
                                type="textarea"
                                onChange={handleInput}
                                value={merchant_pickup_address}
                            />
                    </FormGroup>




                    <Button className="text-uppercase fw-medium" color="primary" block onClick={handleClick}>Save</Button>
                </Form>
            </Row>
            
        </div>
    );
}

export default FormMerchantProfile