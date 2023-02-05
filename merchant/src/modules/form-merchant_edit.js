import { useEffect, useState } from "react";
import { Col, Form, FormGroup, Label,InputGroup, InputGroupText,Input, Row, Button } from "reactstrap"
import { booleanOptions, deliveryStatusOptions } from "../assets/doc/options";
import { IconEmail, IconPhone, IconShop, IconShoppingBag, IconUser } from "../assets/images";
import { useAppContext } from "../context/appContext";
import { Alert, InputSelect, InputSelectArea } from "../elements";



export const FormEditMerchant = () =>{
    const [verification, setVerification] = useState();
    const [selectedArea, setSelectedArea] = useState();
    const [lists, setLists] = useState(null);

    const {
        showAlert,
        handleChange,
        setAreaList,
        areaList,
        isLoading,
        UpdateMerchant,

        // Merchant Data
        merchant_name,
        merchant_email,
        merchant_isVerified,
        merchantID,
        merchant_business_name,
        merchant_business_phone,
        merchant_product_type,
        merchant_base_charge,
        merchant_pickup_area,
        merchant_pickup_address,
        merchant_fb_page,
        merchant_notes,
    } = useAppContext();


    const handleInput = (e) =>{
        const { name, value } = e.target;
        handleChange({name, value})
    }

    const handleVerification = (data) =>{
        handleChange({
            name: "merchant_isVerified",
            value: data.value
        })
    }

    const handleArea = (data) =>{
        handleChange({
            name: "merchant_pickup_area",
            value: data.label
        })
    }
 
    useEffect(() => {
        booleanOptions.forEach(function(item){
            if(item.value === merchant_isVerified){
                setVerification(item);
            }
        })

        areaList.forEach(function(item){
            if(item.label === merchant_pickup_area){
                setSelectedArea(item);
            }
        })

        setAreaList()


    }, [merchant_isVerified, merchant_pickup_area])
    

    const handleClick = () =>{
        UpdateMerchant();
    }

    return(
        <>
            <Form className="mb-5 pb-5">
                {/* Error */}
                {showAlert && 
                    <Row className="justify-content-center mb-4">
                            <Alert />
                    </Row>
                }
                {/* Error: end */}
                {/* Account Details */}
                <div md="6" className="p-4 card">
                    {/* Card: Header */}
                    <div className="card-header_overline">
                        <h6 className="text-overline">Account Detials</h6>
                    </div>
                    {/* Card: End */}

                    {/* Row */}
                    <Row className="mt-3">
                        {/* Col: Account Details - Owner Name */}
                        <Col>
                            <FormGroup className="mb-0">
                                <Label for="Email" className="fw-medium">
                                    Owners Name
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <img src={IconUser} alt="Name" />
                                    </InputGroupText>
                                    <Input
                                        id="merchant_name"
                                        name="merchant_name"
                                        placeholder="Enter your full name"
                                        type="text"
                                        onChange={handleInput} 
                                        value={merchant_name}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        {/* End */}
                        {/* Col: Account Details - Owner Name */}
                        <Col>
                            <FormGroup className="mb-0">
                                <Label for="Email" className="fw-medium">
                                    Business Name
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <img src={IconShop} alt="Business Name" />
                                    </InputGroupText>
                                    <Input
                                        id="merchant_business_name"
                                        name="merchant_business_name"
                                        placeholder="Enter your full name"
                                        type="text"
                                        onChange={handleInput} 
                                        value={merchant_business_name}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        {/* End */}
                    </Row>
                    {/* End */}

                    {/* Row */}
                    <Row className="mt-3">
                        {/* Col: Account Details - Owner Name */}
                        <Col>
                            <FormGroup className="mb-0">
                                <Label for="Email" className="fw-medium">
                                    Email
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <img src={IconEmail} alt="Name" />
                                    </InputGroupText>
                                    <Input
                                        id="merchant_email"
                                        name="merchant_email"
                                        placeholder="Enter your full name"
                                        type="text"
                                        onChange={handleInput} 
                                        value={merchant_email}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        {/* End */}
                        {/* Col: Account Details - Owner Name */}
                        <Col>
                            <FormGroup className="mb-0">
                                <Label for="Email" className="fw-medium">
                                    Phone Number
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <img src={IconPhone} alt="Business Name" />
                                    </InputGroupText>
                                    <Input
                                        id="merchant_business_phone"
                                        name="merchant_business_phone"
                                        placeholder="Enter your full name"
                                        type="text"
                                        onChange={handleInput} 
                                        value={merchant_business_phone}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        {/* End */}
                    </Row>
                    {/* End */}

                    {/* Row */}
                    <Row className="mt-3">
                        {/* Col: Account Details - Owner Name */}
                        <Col>
                            <FormGroup className="mb-0">
                                <Label for="Email" className="fw-medium">
                                    Product Type
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill="none" d="M0 0h24v24H0z"/><path d="M7 8V6a5 5 0 1 1 10 0v2h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3zm0 2H5v10h14V10h-2v2h-2v-2H9v2H7v-2zm2-2h6V6a3 3 0 0 0-6 0v2z" fill="currentColor"/>
                                        </svg>
                                    </InputGroupText>
                                    <Input
                                        id="merchant_product_type"
                                        name="merchant_product_type"
                                        placeholder="Enter type of product"
                                        type="text"
                                        onChange={handleInput} 
                                        value={merchant_product_type}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        {/* End */}
                        {/* Col: Account Details - Owner Name */}
                        <Col>
                            <FormGroup className="mb-0">
                                <Label for="Email" className="fw-medium">
                                    Verification
                                </Label>
                                <InputSelect options={booleanOptions} name="merchant_isVerified" value={verification} defaultValue={verification} placeholder="Select" handleChange={handleVerification} />
                            </FormGroup>
                        </Col>
                        {/* End */}
                    </Row>
                    {/* End */}
                    
                    {/* Row */}
                    <Row className="mt-3">
                        {/* Col: Account Details - Owner Name */}
                        <Col>
                            <FormGroup className="mb-0">
                                <Label for="Email" className="fw-medium">
                                    Base Charge
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill="none" d="M0 0h24v24H0z"/><path d="M7 8V6a5 5 0 1 1 10 0v2h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3zm0 2H5v10h14V10h-2v2h-2v-2H9v2H7v-2zm2-2h6V6a3 3 0 0 0-6 0v2z" fill="currentColor"/>
                                        </svg>
                                    </InputGroupText>
                                    <Input
                                        id="merchant_base_charge"
                                        name="merchant_base_charge"
                                        placeholder="Enter base charge, default is 50"
                                        type="text"
                                        onChange={handleInput} 
                                        value={merchant_base_charge}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        {/* End */}
                        {/* Col: Account Details - Owner Name */}
                        <Col>
                            <FormGroup className="mb-0">
                                <Label for="Email" className="fw-medium">
                                    Pickup Area
                                </Label>
                                <InputSelect options={areaList} name="pickup_area" value={selectedArea} defaultValue={selectedArea} placeholder="Select or Search Area" handleChange={handleArea} />
                            </FormGroup>
                        </Col>
                        {/* End */}
                    </Row>
                    {/* End */}

                    <Row className="mt-1">
                        {/* Address */}
                        <Col>
                            <FormGroup>
                                <Label for="Phone" className="fw-medium">
                                    Address
                                </Label>
                                <Input 
                                    id="merchant_pickup_address" 
                                    name="merchant_pickup_address" 
                                    placeholder="Enter your address" 
                                    type="textarea"
                                    onChange={handleInput}
                                    value={merchant_pickup_address}
                                />
                            </FormGroup>
                        </Col>
                        {/* end */}
                    </Row>

                    <Row className="mt-1">
                        {/* Address */}
                        <Col>
                            <FormGroup>
                                <Label for="Phone" className="fw-medium">
                                    Notes
                                </Label>
                                <Input 
                                    id="merchant_notes" 
                                    name="merchant_notes" 
                                    placeholder="Enter notes if any" 
                                    type="textarea"
                                    onChange={handleInput}
                                    value={merchant_notes}
                                />
                            </FormGroup>
                        </Col>
                        {/* end */}
                    </Row>
                </div>
                {/* End */}

                {/* Button */}
                <div className="mt-4">
                    <Button   className="text-uppercase fw-medium" color="primary" block onClick={handleClick}>
                        Update Details
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default FormEditMerchant