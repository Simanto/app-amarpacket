import React, { useEffect, useState } from 'react'
import { Col, Form, FormGroup, Label,InputGroup, InputGroupText,Input, Row, Button } from 'reactstrap';
import { booleanOptions, roleOptions } from '../assets/doc/options';
import { IconPhone, IconUser } from '../assets/images';
import { useAppContext } from '../context/appContext';
import { Alert, InputSelect } from '../elements';
import validator from "validator";

const FormUserAdd = () => {
    const [userSelectedArea, setUserSelectedArea] = useState();
    const [userEcSelectedArea, setUserEcSelectedArea] = useState();
    const [userIsActive, setUserIsAvtive] = useState();
    const [userRole, setUserRole] = useState();

    const {
        showAlert,
        handleChange,
        setAreaList,
        areaList,
        isLoading,
        dispatch,
        isEditing,

        // User Data
        user_fullname,
        user_email,
        user_password,
        user_phone,
        user_designation,
        user_blood_group,
        user_employee_id,
        user_isActive,
        user_role,
        user_area,
        user_address,
        user_emergency_contact_name,
        user_emergency_contact_phone,
        user_emergency_contact_relation,
        user_emergency_contact_area,
        user_emergency_contact_address,

        // Update and add function
        editUser,
        adminAddUser,

    } = useAppContext();

    const handleInput = (e) =>{
        const { name, value } = e.target;
        handleChange({name, value})
    }
    const handleActive = (data) =>{
        handleChange({
            name: "user_isActive",
            value: data.value,
        })
    }
    const handleUserRole = (data) =>{
        handleChange({
            name: "user_role",
            value: data.value,
        });
    }
    const handleUserArea = (data) =>{
        handleChange({
            name: "user_area",
            value: data.label,
        })
    }

    const handleUserEcArea = (data) =>{
        handleChange({
            name: "user_emergency_contact_area",
            value: data.label,
        })
    }

    useEffect(() => {

        areaList.forEach(function(item){
            if(item.label === user_area){
                setUserSelectedArea(item);
            }
        })

        areaList.forEach(function(item){
            if(item.label === user_emergency_contact_area){
                setUserEcSelectedArea(item);
            }
        })

        booleanOptions.forEach(function(item){
            if(item.value === user_isActive){
                setUserIsAvtive(item);
            }
        })

        roleOptions.forEach((item) =>{
            if(item.value === user_role){
                setUserRole(item)
            }
        })

        setAreaList()


    }, [])


    const handleClick = () =>{
        if( !user_fullname,
            !user_email,
            !user_password,
            !user_phone,
            !user_designation,
            !user_blood_group,
            !user_employee_id,
            !user_isActive,
            !user_role,
            !user_area,
            !user_address,
            !user_emergency_contact_name,
            !user_emergency_contact_phone,
            !user_emergency_contact_relation,
            !user_emergency_contact_area,
            !user_emergency_contact_address
        ){
            dispatch({type: "ERROR", payload:{msg: "Please fill all the details"}})
            return
        }

        if(!validator.isEmail(user_email)){
            dispatch({type:"ERROR", payload: {msg:"Please provide valid Email address"}});
            return
        }

        if(!validator.isMobilePhone(user_phone,["bn-BD"])){
            dispatch({type:"ERROR", payload: {msg:"Please provide valid Phone Number"}});
            return
        }

        if(!validator.isMobilePhone(user_emergency_contact_phone,["bn-BD"])){
            dispatch({type:"ERROR", payload: {msg:"Please provide valid Phone Number for emergency contact"}});
            return
        }

        if(user_password.length < 6){
            dispatch({type:"ERROR", payload: {msg:"Password must be at least 6 character long"}});
            return
        }

        adminAddUser();
    }

    const handleUpdate = () =>{
        editUser();
    }

  return (
        <>
            {areaList &&
                <Form className="mb-5 pb-5">
                    {/* Error */}
                        {showAlert && 
                            <div className="p-0 mb-4">
                                <Alert />
                            </div>
                        }
                    {/* Error: end */}

                    {/* Profile Details */}
                    <div  className="p-4 card">
                        {/* Card: Header */}
                        <div className="card-header_overline">
                            <h6 className="text-overline">Profile Detials</h6>
                        </div>
                        {/* Card: End */}

                        {/* Row */}
                        <Row className="mt-3">
                            {/* Col: Profile Details - Full Name */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Full Name
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <img src={IconUser} alt="Name" />
                                        </InputGroupText>
                                        <Input
                                            id="user_fullname"
                                            name="user_fullname"
                                            placeholder="Enter your full name"
                                            type="text"
                                            onChange={handleInput} 
                                            value={user_fullname}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            {/* End */}
                            {/* Col: Profile Details - Phone */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Phone
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <img src={IconPhone} alt="Business Name" />
                                        </InputGroupText>
                                        <Input
                                            id="user_phone"
                                            name="user_phone"
                                            placeholder="Enter contact no."
                                            type="text"
                                            onChange={handleInput} 
                                            value={user_phone}
                                        />
                                    </InputGroup>
                                    {/* {errors.name && <span className="text-danger mt-1">{errors.name}</span>} */}
                                </FormGroup>
                            </Col>
                            {/* End */}
                        </Row>
                        {/* End */}

                        {/* Row */}
                        <Row className="mt-3">
                            {/* Col: Profile Details - Email */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Email
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='icon'>
                                                <path fill="none" d="M0 0h24v24H0z"/>
                                                <path d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm2 2h6v6H6V7zm2 2v2h2V9H8zm-2 6h12v2H6v-2zm8-8h4v2h-4V7zm0 4h4v2h-4v-2z" color='currentColor'/>
                                            </svg>
                                        </InputGroupText>
                                        <Input
                                            id="user_email"
                                            name="user_email"
                                            placeholder="Enter email address"
                                            type="text"
                                            onChange={handleInput} 
                                            value={user_email}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            {/* End */}
                            {/* Col: Profile Details - Password */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Password
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='icon'>
                                                <path fill="none" d="M0 0h24v24H0z"/>
                                                <path d="M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 1 1 14 0v1zM5 12v8h14v-8H5zm6 2h2v4h-2v-4zm6-4V9A5 5 0 0 0 7 9v1h10z" fill='currentColor'/>
                                            </svg>
                                        </InputGroupText>
                                        <Input
                                            id="user_password"
                                            name="user_password"
                                            placeholder="Enter password"
                                            type="text"
                                            onChange={handleInput} 
                                            value={user_password}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            {/* End */}
                        </Row>
                        {/* End */}

                        {/* Row */}
                        <Row className="mt-3">
                            {/* Col: Profile Details - Desgination */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Desgination
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='icon'>
                                                <path fill="none" d="M0 0h24v24H0z"/>
                                                <path d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm2 2h6v6H6V7zm2 2v2h2V9H8zm-2 6h12v2H6v-2zm8-8h4v2h-4V7zm0 4h4v2h-4v-2z" color='currentColor'/>
                                            </svg>
                                        </InputGroupText>
                                        <Input
                                            id="user_designation"
                                            name="user_designation"
                                            placeholder="Enter your full name"
                                            type="text"
                                            onChange={handleInput} 
                                            value={user_designation}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            {/* End */}
                            {/* Col: Profile Details - Blood Group */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Blood Group
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='icon'>
                                            <path fill="none" d="M0 0h24v24H0z"/>
                                            <path d="M12 3.1L7.05 8.05a7 7 0 1 0 9.9 0L12 3.1zm0-2.828l6.364 6.364a9 9 0 1 1-12.728 0L12 .272z" color='currentColor'/>
                                        </svg>
                                        </InputGroupText>
                                        <Input
                                            id="user_blood_group"
                                            name="user_blood_group"
                                            placeholder="Enter your full name"
                                            type="text"
                                            onChange={handleInput} 
                                            value={user_blood_group}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            {/* End */}
                        </Row>
                        {/* End */}

                        {/* Row */}
                        <Row className="mt-3">

                            {/* Col: Profile Details - Employee ID */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Employee id
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='icon'>
                                                <path fill="none" d="M0 0h24v24H0z"/>
                                                <path d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm2 2h6v6H6V7zm2 2v2h2V9H8zm-2 6h12v2H6v-2zm8-8h4v2h-4V7zm0 4h4v2h-4v-2z" color='currentColor'/>
                                            </svg>
                                        </InputGroupText>
                                        <Input
                                            id="user_employee_id"
                                            name="user_employee_id"
                                            placeholder="Enter your full name"
                                            type="text"
                                            onChange={handleInput} 
                                            value={user_employee_id}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            {/* End */}

                            {/* Col: Profile Details - isActive */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Active
                                    </Label>
                                    <InputSelect options={booleanOptions} name="user_isActive" value={userIsActive} defaultValue={userIsActive} placeholder="Select" handleChange={handleActive} />
                                    
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
                                        Role
                                    </Label>
                                    <InputSelect options={roleOptions} name="user_role" value={userRole} defaultValue={userRole} placeholder="Select role" handleChange={handleUserRole} />
                                </FormGroup>
                            </Col>
                            {/* End */}

                            {/* Col: Account Details - Owner Name */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Area
                                    </Label>
                                    <InputSelect options={areaList} name="user_area" value={userSelectedArea} defaultValue={userSelectedArea} placeholder="Select or Search Area" handleChange={handleUserArea} />
                                </FormGroup>
                            </Col>
                            {/* End */}
                        </Row>
                        {/* End */}

                        {/* Row */}
                        <Row className="mt-1">
                            {/* Address */}
                            <Col>
                                <FormGroup>
                                    <Label for="Phone" className="fw-medium">
                                        Address
                                    </Label>
                                    <Input 
                                        id="user_address" 
                                        name="user_address" 
                                        placeholder="Enter your address" 
                                        type="textarea"
                                        onChange={handleInput}
                                        value={user_address}
                                    />
                                </FormGroup>
                            </Col>
                            {/* end */}
                        </Row>
                        {/* End */}
                    </div>
                    {/* End */}

                    {/* Emegency Contact */}
                    <div md="6" className="mt-4 p-4 card">
                        {/* Card: Header */}
                        <div className="card-header_overline">
                            <h6 className="text-overline">Emergency Contact Detials</h6>
                        </div>
                        {/* Card: End */}

                         {/* Row */}
                         <Row className="mt-3">
                            {/* Col */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Name
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <img src={IconUser} alt="Name" />
                                        </InputGroupText>
                                        <Input
                                            id="user_emergency_contact_name"
                                            name="user_emergency_contact_name"
                                            placeholder="Enter your full name"
                                            type="text"
                                            onChange={handleInput} 
                                            value={user_emergency_contact_name}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            {/* End */}
                            {/* Col */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Phone
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <img src={IconPhone} alt="Business Name" />
                                        </InputGroupText>
                                        <Input
                                            id="user_emergency_contact_phone"
                                            name="user_emergency_contact_phone"
                                            placeholder="Enter your full name"
                                            type="text"
                                            onChange={handleInput} 
                                            value={user_emergency_contact_phone}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            {/* End */}
                        </Row>
                        {/* End */}

                        {/* Row */}
                        <Row className="mt-3">
                            {/* Col */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Relation
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <img src={IconUser} alt="Name" />
                                        </InputGroupText>
                                        <Input
                                            id="user_emergency_contact_relation"
                                            name="user_emergency_contact_relation"
                                            placeholder="Enter your full name"
                                            type="text"
                                            onChange={handleInput} 
                                            value={user_emergency_contact_relation}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            {/* End */}
                            {/* Col */}
                            <Col>
                                <FormGroup className="mb-0">
                                    <Label for="Email" className="fw-medium">
                                        Area
                                    </Label>
                                    <InputSelect options={areaList} name="user_emergency_contact_area" value={userEcSelectedArea} defaultValue={userEcSelectedArea} placeholder="Select or Search Area" handleChange={handleUserEcArea} />
                                </FormGroup>
                            </Col>
                            {/* End */}
                        </Row>
                        {/* End */}

                        {/* Row */}
                        <Row className="mt-1">
                            {/* Address */}
                            <Col>
                                <FormGroup>
                                    <Label for="Phone" className="fw-medium">
                                        Address
                                    </Label>
                                    <Input 
                                        id="user_emergency_contact_address" 
                                        name="user_emergency_contact_address" 
                                        placeholder="Enter your address" 
                                        type="textarea"
                                        onChange={handleInput}
                                        value={user_emergency_contact_address}
                                    />
                                </FormGroup>
                            </Col>
                            {/* end */}
                        </Row>
                        {/* End */}

                    </div>
                    {/* End */}

                    {/* Button */}
                    <div className="mt-4">
                    {isEditing && user_fullname? 
                        <Button   className="text-uppercase fw-medium" color="primary" block onClick={handleUpdate}>
                            Update User Details
                        </Button>
                        : 
                        <Button   className="text-uppercase fw-medium" color="primary" block onClick={handleClick}>
                            Add User
                        </Button>
                    }
                    </div>
                </Form>
            }
        </>
  )
}

export default FormUserAdd