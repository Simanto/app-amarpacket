import { Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row, Col, Button } from "reactstrap"
import validator from "validator";

// Import: Elements
import {Alert, InputSelect, Loading} from '../elements'

// Impprt : Assets
import { IconPhone, IconUser } from "../assets/images";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const FormPacket = () =>{
    const [selectedArea, setSelectedArea ] = useState();

    const {
        isLoading,
        isEditing,
        showAlert,
        handleChange,
        addPakcet,
        dispatch,
        areaList,
        editPacket,

        // Packet Data
        packet_customerName, 
        packet_customerPhone, 
        packet_customerArea, 
        packet_customerAddress, 
        packet_merchantInvoice,
        packet_collectionAmount,
        packet_costPrice,
        packet_weight,
        packet_delivery_charge,
        packet_specialInstruction,
        packet_base_charge
    } = useAppContext();
    
    

    const handleInput = (e) =>{
        const { name, value } = e.target;
        handleChange({name, value})

        if(e.target.name === "packet_collectionAmount" || e.target.name === "packet_weight"){
            let weightCharge = 0;
            let charge = parseInt(packet_base_charge);

            if(!packet_weight){
                weightCharge = 10;
            }

            if( packet_weight < 1 || packet_weight < 3){
                weightCharge = (packet_weight * 10);
            }

            if(packet_weight>=3){
                weightCharge = 30+((packet_weight-3)* 20);
            }

            const calcdelivercharge = charge+weightCharge;
        }
    };
    
    
    const handleSelect = (value) =>{
        const selectValue = value.label
        handleChange({
            name: "packet_customerArea",
            value: selectValue
        })
    }

    const handleClick = async e  => {
        e.preventDefault();

        if(!packet_customerName){
            dispatch({type:"ERROR", payload: {msg:"Please provide customer name."}});
            return
        } else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(!packet_customerPhone ){
            dispatch({type:"ERROR", payload: {msg:"Please provide customer phone number."}});
            return
        } else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(!packet_customerArea){
            dispatch({type:"ERROR", payload: {msg:"Please select an area."}});
            return
        } else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(!packet_customerAddress){
            dispatch({type:"ERROR", payload: {msg:"Please provide address."}});
            return
        } else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(!packet_collectionAmount){
            dispatch({type:"ERROR", payload: {msg:"Please provide collection amount."}});
            return
        } else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(!packet_costPrice ){
            dispatch({type:"ERROR", payload: {msg:"Please provide cost price of the product."}});
            return
        } else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(!validator.isMobilePhone(packet_customerPhone,["bn-BD"])){
            dispatch({type:"ERROR", payload: {msg:"Please provide valid Phone Number"}});
            return
        }else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(!validator.isNumeric(packet_collectionAmount.toString(), { min: 0 })){
            dispatch({type:"ERROR", payload: {msg:"Price can't be less then 0"}});
            return
        }else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(!validator.isNumeric(packet_costPrice.toString(), { min: 0 })){
            dispatch({type:"ERROR", payload: {msg:"Price can't be less then 0"}});
            return
        }else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(!validator.isNumeric(packet_weight.toString(),{ min: 0.01 , max: 15 })){
            dispatch({type:"ERROR", payload: {msg:"Weight must be 1 to 15kg"}});
            return
        } else{
            dispatch({type:"CLEAR_ALERT"})
        }

        if(isEditing){
            editPacket();
        } else {
            addPakcet();
        }
        
    };
    
    useEffect(() => {
        areaList.forEach(function(item){
            if(item.label === packet_customerArea){
                setSelectedArea(item);
            }
        })

        // Calc Delivery Charge
        let charge =  parseInt(packet_base_charge);
        let weightCharge = 0;

        if(!packet_weight){
            weightCharge = 10;
        }

        if( packet_weight < 1 || packet_weight < 3){
            weightCharge = (packet_weight * 10);
        }

        if(packet_weight>=3){
            weightCharge = 30+((packet_weight-3)* 20);
        }

        const calcdeliverycharge = charge+weightCharge;

        handleChange({
            name: "packet_delivery_charge",
            value: calcdeliverycharge
        })

    },[areaList])


    return(
        <div className="app-inner_body pt-3">
            {isLoading ? 
                <Loading />
            :
                <Form className="d-flex flex-column">
                    {/* Error */}
                    {showAlert &&
                        <div className="mb-4">
                            <Alert />
                        </div>
                    }
                    {/* Error: end */}

                    {/* Cutomer Details */}
                    <div className="card p-4">
                        
                        {/* Card: Header */}
                        <div className="card-header_overline">
                            <h6 className="text-overline">Customer Detials</h6>
                        </div>
                        {/* Card: End */}

                        <Row className="mt-3">
                            <Col>
                                <FormGroup>
                                    <Label for="customerName" className="fw-medium">
                                        Customer Name
                                    </Label>
                                    <InputGroup>

                                        <InputGroupText>
                                            <img src={IconUser} alt='customer name' />
                                        </InputGroupText>

                                        <Input
                                            id="packet_customerName"
                                            name="packet_customerName"
                                            placeholder="Enter customer name"
                                            type="text"
                                            onChange={handleInput}
                                            value={packet_customerName}
                                        >
                                        </Input>

                                    </InputGroup>
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup>
                                    <Label for="customerPhone" className="fw-medium">
                                        Phone Number
                                    </Label>
                                    <InputGroup>

                                        <InputGroupText>
                                            <img src={IconPhone} alt='customer name' />
                                        </InputGroupText>

                                        <Input
                                            id="packet_customerPhone"
                                            name="packet_customerPhone"
                                            placeholder="Enter phone number"
                                            type="phone"
                                            onChange={handleInput}
                                            value={packet_customerPhone}
                                        >
                                        </Input>
                                        
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>

                        {/* Area & Address */}
                        <Row className="mt-1">
                            <Col>
                                <FormGroup>
                                    <Label for="Phone" className="fw-medium">
                                        Area
                                    </Label>

                                    <InputSelect options={areaList} name="packet_customerArea" value={selectedArea} defaultValue={selectedArea} placeholder="Select or Search Area" handleChange={handleSelect} />
                                
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Phone" className="fw-medium">
                                        Address
                                    </Label>
                                    <Input 
                                        id="packet_customerAddress" 
                                        name="packet_customerAddress" 
                                        placeholder="Enter your address" 
                                        type="textarea"
                                        onChange={handleInput}
                                        value={packet_customerAddress}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        {/* End: Area and Address */}
                    </div>
                    {/* end */}

                    {/* Product Details */}
                    <div className="card p-4 mt-4">
                        
                        {/* Card: Header */}
                        <div className="card-header_overline">
                            <h6 className="text-overline">Product Detials</h6>
                        </div>
                        {/* Card: End */}
                        {/* Weight and Order ID */}
                        <Row className="mt-3">
                            <Col>
                                <FormGroup>
                                    <Label for="Invoice ID" className="fw-medium">
                                        Order ID
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <svg width="24" height="24" viewBox="0 0 24 24" >
                                                <path d="M20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22ZM19 20V4H5V20H19ZM8 7H16V9H8V7ZM8 11H16V13H8V11ZM8 15H16V17H8V15Z" />
                                            </svg>
                                        </InputGroupText>

                                        <Input
                                            id="packet_merchantInvoice"
                                            name="packet_merchantInvoice"
                                            placeholder="Enter Invoice or Order ID"
                                            type="text"
                                            onChange={handleInput}
                                            value={packet_merchantInvoice}
                                        >
                                        </Input>

                                    </InputGroup>
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup>
                                    <Label for="Amount to collect" className="fw-medium">
                                        Weight
                                    </Label>
                                    <InputGroup>

                                        <InputGroupText className="fw-medium">
                                            kg
                                        </InputGroupText>

                                        <Input
                                            id="packet_weight"
                                            name="packet_weight"
                                            placeholder="weight"
                                            type="number"
                                            onChange={handleInput}
                                            value={packet_weight}
                                        >
                                        </Input>

                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>

                        {/* Product Price */}
                        <Row className="mt-3">
                            <Col>
                                <FormGroup>
                                    <Label for="Amount to collect" className="fw-medium">
                                        Amount to collect
                                    </Label>
                                    <InputGroup>

                                        <InputGroupText>
                                            <svg width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M2.99998 2.99998H21C21.1336 2.99114 21.2675 3.01094 21.3929 3.05807C21.5182 3.1052 21.632 3.17856 21.7267 3.27324C21.8214 3.36793 21.8947 3.48174 21.9419 3.60708C21.989 3.73241 22.0088 3.86637 22 3.99998V20C22.0088 20.1336 21.989 20.2675 21.9419 20.3929C21.8947 20.5182 21.8214 20.632 21.7267 20.7267C21.632 20.8214 21.5182 20.8947 21.3929 20.9419C21.2675 20.989 21.1336 21.0088 21 21H2.99998C2.86637 21.0088 2.73241 20.989 2.60708 20.9419C2.48174 20.8947 2.36793 20.8214 2.27324 20.7267C2.17856 20.632 2.1052 20.5182 2.05807 20.3929C2.01094 20.2675 1.99114 20.1336 1.99998 20V3.99998C1.99114 3.86637 2.01094 3.73241 2.05807 3.60708C2.1052 3.48174 2.17856 3.36793 2.27324 3.27324C2.36793 3.17856 2.48174 3.1052 2.60708 3.05807C2.73241 3.01094 2.86637 2.99114 2.99998 2.99998V2.99998ZM3.99998 4.99998V19H20V4.99998H3.99998ZM13.8 11.9C13.5875 11.9207 13.3824 11.9891 13.2 12.1L12.3 10.5C12.7614 10.157 13.3254 9.98078 13.9 9.99998C14.2545 9.98299 14.6086 10.042 14.9385 10.1731C15.2684 10.3042 15.5665 10.5043 15.8127 10.76C16.0589 11.0157 16.2476 11.321 16.3662 11.6556C16.4847 11.9902 16.5303 12.3463 16.5 12.7C16.5 15.1 15.2 17.2 12.2 17.2C10.3 17.2 8.79998 16.3 8.79998 14.3V12H7.49998V10.4H8.79998V9.79998C8.79998 8.99998 8.59998 8.69998 7.99998 8.69998H7.49998V6.89998H8.19998C10.1 6.89998 10.9 7.89998 10.9 9.79998V10.5H11.7V12H10.9V14.3C10.9 15.1 11.5 15.4 12.2 15.4C13.7 15.4 14.5 14.3 14.5 12.8C14.5 12.2 14.2 11.9 13.8 11.9Z" />
                                            </svg>
                                        </InputGroupText>

                                        <Input
                                            id="packet_collectionAmount"
                                            name="packet_collectionAmount"
                                            placeholder="Amount to collect"
                                            type="text"
                                            onChange={handleInput}
                                            value={packet_collectionAmount}
                                        >
                                        </Input>

                                    </InputGroup>
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup>
                                    <Label for="Invoice ID" className="fw-medium">
                                        Product Cost Price
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <svg width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M2.99998 2.99998H21C21.1336 2.99114 21.2675 3.01094 21.3929 3.05807C21.5182 3.1052 21.632 3.17856 21.7267 3.27324C21.8214 3.36793 21.8947 3.48174 21.9419 3.60708C21.989 3.73241 22.0088 3.86637 22 3.99998V20C22.0088 20.1336 21.989 20.2675 21.9419 20.3929C21.8947 20.5182 21.8214 20.632 21.7267 20.7267C21.632 20.8214 21.5182 20.8947 21.3929 20.9419C21.2675 20.989 21.1336 21.0088 21 21H2.99998C2.86637 21.0088 2.73241 20.989 2.60708 20.9419C2.48174 20.8947 2.36793 20.8214 2.27324 20.7267C2.17856 20.632 2.1052 20.5182 2.05807 20.3929C2.01094 20.2675 1.99114 20.1336 1.99998 20V3.99998C1.99114 3.86637 2.01094 3.73241 2.05807 3.60708C2.1052 3.48174 2.17856 3.36793 2.27324 3.27324C2.36793 3.17856 2.48174 3.1052 2.60708 3.05807C2.73241 3.01094 2.86637 2.99114 2.99998 2.99998V2.99998ZM3.99998 4.99998V19H20V4.99998H3.99998ZM13.8 11.9C13.5875 11.9207 13.3824 11.9891 13.2 12.1L12.3 10.5C12.7614 10.157 13.3254 9.98078 13.9 9.99998C14.2545 9.98299 14.6086 10.042 14.9385 10.1731C15.2684 10.3042 15.5665 10.5043 15.8127 10.76C16.0589 11.0157 16.2476 11.321 16.3662 11.6556C16.4847 11.9902 16.5303 12.3463 16.5 12.7C16.5 15.1 15.2 17.2 12.2 17.2C10.3 17.2 8.79998 16.3 8.79998 14.3V12H7.49998V10.4H8.79998V9.79998C8.79998 8.99998 8.59998 8.69998 7.99998 8.69998H7.49998V6.89998H8.19998C10.1 6.89998 10.9 7.89998 10.9 9.79998V10.5H11.7V12H10.9V14.3C10.9 15.1 11.5 15.4 12.2 15.4C13.7 15.4 14.5 14.3 14.5 12.8C14.5 12.2 14.2 11.9 13.8 11.9Z" />
                                            </svg>
                                        </InputGroupText>

                                        <Input
                                            id="packet_costPrice"
                                            name="packet_costPrice"
                                            placeholder="Cost price"
                                            type="text"
                                            onChange={handleInput}
                                            value={packet_costPrice}
                                        >
                                        </Input>

                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col>
                                <FormGroup>
                                    <Label for="Note" className="fw-medium">
                                        Special Instruction
                                    </Label>
                                    <Input 
                                        id="packet_specialInstruction" 
                                        name="packet_specialInstruction" 
                                        placeholder="Enter special instruction if you have any" 
                                        type="textarea"
                                        onChange={handleInput}
                                        value={packet_specialInstruction}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                    </div>
                    {/* end */}

                    {/* Button */}
                    <div className="mt-4">
                        <Button disabled={isLoading} className="text-uppercase fw-medium" color="primary" block onClick={handleClick}>
                            {isEditing ? 
                               "Update Packet"
                            : 
                                "Add Packet"
                            }
                        </Button>
                    </div>
                </Form>
            }
        </div>
    )
}

export default FormPacket