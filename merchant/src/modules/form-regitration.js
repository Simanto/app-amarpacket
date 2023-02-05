import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext.js";
import { Col, Form, Row, FormGroup, Input, InputGroup, InputGroupText, Label, Button } from "reactstrap";
import { Alert, InputSelect } from "../elements";
import validator from "validator";

// Impprt : Assets
import Email from "../assets/images/icon-email.svg";
import User from "../assets/images/icon-user.svg";
import Shop from "../assets/images/icon-shop.svg";
import Phone from "../assets/images/icon-phone.svg";
import Key from "../assets/images/icon-key.svg";


const initialState = {
    name: "",
    businessName: "",
    email: "",
    phone: "",
    area:"",
    address: "",
    fb: "",
    password: "",
    confirmPassword: "",
}



const FromRegistration = () => {
    const [value, setValue] = useState(initialState);
    const [selectedArea, setSelectedArea ] = useState();

    const {
        user,
        token,
        isLoading,
        showAlert,
        registerMerchant,
        dispatch,
        areaList
    } = useAppContext();
    
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setValue((prev) => ({...prev,[name]: value,}));
    };

    const handleSelect = (option) =>{
        setValue((prev) => ({
            ...prev,
            "area": option.label
        }));
        setSelectedArea(option)
    }
    const handleClick = async e => {

        e.preventDefault();

        const{
            name,
            businessName,
            email,
            phone,
            area,
            address,
            fb,
            password,
            confirmPassword,
        } = value
        if(
            !name || 
            !businessName ||
            !email ||
            !phone ||
            !area ||
            !address ||
            !password ||
            !confirmPassword
        ){
            // displayAlert();
            dispatch({type:"ERROR", payload: {msg:"Please provide all the details."}});
            return
        }
        
        if(!validator.isEmail(value.email)){
            dispatch({type:"ERROR", payload: {msg:"Please provide valid Email address"}});
            return
        }

        if(!validator.isMobilePhone(value.phone,["bn-BD"])){
            dispatch({type:"ERROR", payload: {msg:"Please provide valid Phone Number"}});
            return
        }

        if(value.password.length < 6){
            dispatch({type:"ERROR", payload: {msg:"Password must be at least 6 character long"}});
            return
        }

        if(value.password !== value.confirmPassword || value.confirmPassword !== value.password){
            dispatch({type:"ERROR", payload: {msg:"Password and Confirmed password does not match"}});
            return
        }
        
        dispatch({type: "CLEAR_ALERT"})

        const currentUser = {
            name,
            businessName,
            email,
            phone,
            area,
            address,
            fb,
            password,
            confirmPassword,
        }
        registerMerchant(currentUser);

    };

    useEffect(() =>{
        if(user && token){
            navigate("/dashboard")
        }
    },[user, token, navigate]);

    return(
        <Form className="mb-5 pb-5">
            {/* Error */}
            {showAlert && 
                <Row className="justify-content-center mt-4">
                    <Col md="6" className="p-0">
                        <Alert />
                    </Col>
                </Row>
            }
            {/* Error: end */}
            {/* Row: Account Details */}
            <Row className="justify-content-center mt-4">
                
                <Col md="6" className="p-4 card">
                    {/* Card: Header */}
                    <div className="card-header_overline">
                        <h6 className="text-overline">Account Detials</h6>
                    </div>
                    {/* Card: End */}

                    <Row className="mt-3">
                        {/* Col: Account Details - Owner Name */}
                        <Col xs="12" md="6">
                            <FormGroup className="mb-4">
                                <Label for="Email" className="fw-medium">
                                    Owners Name
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <img src={User} alt="Name" />
                                    </InputGroupText>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        type="text"
                                        onChange={handleChange} 
                                        value={value.name}
                                    />
                                </InputGroup>
                                {/* {errors.name && <span className="text-danger mt-1">{errors.name}</span>} */}
                            </FormGroup>
                        </Col>

                        {/* end of col */}

                        {/* Col: Account Details - Store Name */}
                        <Col xs="12" md="6">
                            <FormGroup className="mb-4">
                                <Label for="Store" className="fw-medium">
                                Name of Business
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <img src={Shop} alt="Business Name" />
                                    </InputGroupText>
                                    <Input
                                        id="business_name"
                                        name="businessName"
                                        placeholder="Enter business name"
                                        type="text"
                                        onChange={handleChange}
                                        value={value.businessName}
                                    />
                                </InputGroup>
                                {/* {errors.businessName && <span className="text-danger mt-1">{errors.businessName}</span>} */}
                            </FormGroup>
                        </Col>
                        {/* Col: End */}
                    </Row>
                    <Row>
                        {/* Col: Account Details - Email */}
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label for="Email" className="fw-medium">
                                Email
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <img src={Email} alt="Email" />
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
                                {/* {errors.email && <span className="text-danger mt-1">{errors.email}</span>} */}
                            </FormGroup>
                        </Col>
                        {/* End of Col */}

                        {/* Col: Account Details - Phone Number */}
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label for="Phone" className="fw-medium">
                                Phone Number
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <img src={Phone} alt="Phone" />
                                    </InputGroupText>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="Phone number"
                                        type="phone"
                                        onChange={handleChange}
                                        value={value.phone}
                                    />
                                </InputGroup>
                                {/* {errors.phone && <span className="text-danger mt-1">{errors.phone}</span>} */}
                            </FormGroup>
                        </Col>
                        {/* Col: End */}
                    </Row>

                     {/* Address */}
                     <Row>
                        <Col>
                        <FormGroup>
                                <Label for="address" className="fw-medium">
                                    Area
                                </Label>
                                <InputSelect options={areaList} name="packet_customerArea" value={selectedArea} defaultValue={selectedArea} placeholder="Select or Search Area" handleChange={handleSelect} />
                                
                            </FormGroup>
                            {/* {errors.address && <span className="text-danger mt-1">{errors.address}</span>} */}
                        </Col>
                    </Row>
                    {/* end */}

                    {/* Address */}
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="address" className="fw-medium">
                                    Address
                                </Label>
                                <Input 
                                    id="address" 
                                    name="address" 
                                    placeholder="Enter your address" 
                                    type="textarea"
                                    onChange={handleChange}
                                    value={value.address}
                                />
                            </FormGroup>
                            {/* {errors.address && <span className="text-danger mt-1">{errors.address}</span>} */}
                        </Col>
                    </Row>
                    {/* end */}

                    {/* fb */}
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="fb" className="fw-medium">
                                    Facebook Page URL
                                </Label>
                                <Input 
                                    id="fb" 
                                    name="fb" 
                                    placeholder="Enter your facebook page url" 
                                    type="text"
                                    onChange={handleChange}
                                    value={value.fb}
                                />
                            </FormGroup>
                            {/* {errors.address && <span className="text-danger mt-1">{errors.address}</span>} */}
                        </Col>
                    </Row>
                    {/* end */}
                </Col>
            </Row>
            {/* Row: End */}

            {/* Row: Create Password */}
            <Row className="justify-content-center mt-4">
                <Col md="6" className="p-4 card">
                    {/* Card: Header */}
                    <div className="card-header_overline">
                        <h6 className="text-overline">Create Password</h6>
                    </div>
                    {/* Card: End */}
                    <Row className="mt-3">
                        {/* Col: Password */}
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label for="Password" className="fw-medium">
                                    Password
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <img src={Key} alt="Key" />
                                    </InputGroupText>
                                    <Input
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        onChange={handleChange}
                                        value={value.password}
                                    />
                                </InputGroup>
                                {/* {errors.password && <span className="text-danger mt-1">{errors.password}</span>} */}
                            </FormGroup>
                        </Col>
                        {/* Col: End */}

                        {/* Col: Confirm Password */}
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label for="Confirm Password" className="fw-medium">
                                    Confirm Password
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        <img src={Key} alt="Key" />
                                    </InputGroupText>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Re-type password"
                                        type="password"
                                        onChange={handleChange}
                                        value={value.confirmPassword}
                                    />
                                </InputGroup>
                                {/* {errors.confirmPassword && <span className="text-danger mt-1">{errors.confirmPassword}</span>} */}
                            </FormGroup>
                        </Col>
                        {/* Col: End */}
                    </Row>
                </Col>
            </Row>
            {/* Row: End */}
            <Row className="justify-content-center mt-4">
                <Col md="6" className="p-0">
                    <Button   className="text-uppercase fw-medium" color="primary" block onClick={handleClick}>Create Account</Button>
                </Col>
            </Row>
            
        </Form>
    );
}

export default FromRegistration