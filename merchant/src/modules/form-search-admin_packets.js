import React, { useEffect, useState } from 'react'
import { Button, Col, FormGroup, Input, InputGroup, InputGroupText, Row } from 'reactstrap'
import { InputSelect } from '../elements'
import ReactDatePicker from 'react-datepicker'
import { useAppContext } from '../context/appContext'
import { deliveryStatusOptions } from '../assets/doc/options';
import moment from 'moment'

const FormSearchAdminPackets = () => {

    const {
        isLoading,
        search, 
        search_status, 
        search_start_date, 
        search_end_date, 
        search_delivery_agent, 
        search_pickup_agent,
        allAgent,
        handleChange
    } = useAppContext();

    const [startDate, setStartDate] = useState(null);
    const {selectedStatus, setSelectedStatus} = useState(null);
    const {selectedPickup, setSelectedPickup} = useState(null);
    const {selectedDelivery, setSelectedDelivery} = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleInput = (e) => {
        if(isLoading) return
        const { name, value } = e.target;
        handleChange({name, value})
    }

    const handleDateInput = (dates) => {
        const [start, end] = dates
        // console.log("dates", dates);
        setStartDate(start);
        setEndDate(end);

        if(start !== null && end !== null){
            handleChange({
                name: "search_start_date",
                value: moment(start).format("YYYY-MM-DD") || "",
            })
    
            handleChange({
                name: "search_end_date",
                value: moment(end).format("YYYY-MM-DD") || "",
            })
        } else {
            handleChange({
                name: "search_start_date",
                value: "",
            })
    
            handleChange({
                name: "search_end_date",
                value: "",
            })
        }

        
    }

    const handleSelect = (data,name) =>{
        // console.log(data, name);

        // Status
        if(name.name === "search_status" && data === null){
            handleChange({
                name: "search_status",
                value: ""
            })
        } else if (name.name === "search_status" && data !== null){
            handleChange({
                name: "search_status",
                value: data.value
            })
        }

        // Pickup Agent
        if(name.name === "search_pickup_agent" && data === null){
            handleChange({
                name: "search_pickup_agent",
                value: ""
            })
        } else if(name.name === "search_pickup_agent" && data !== null){
            handleChange({
                name: "search_pickup_agent",
                value: data.label
            })
        }

        // Delivery Agent
        if(name.name === "search_delivery_agent" && data === null){
            handleChange({
                name: "search_delivery_agent",
                value: ""
            })
        } else if(name.name === "search_delivery_agent" && data !== null){
            handleChange({
                name: "search_delivery_agent",
                value: data.label
            })
        }
    }

    useEffect(() => {
        // Set Selected: Status
        if(deliveryStatusOptions){
            deliveryStatusOptions.forEach((item)=>{
                if(item.value === search_status){
                    setSelectedStatus(item);
                }
            })
        }

        // Set Selected: Delivery & Pickup
        if(allAgent){
            allAgent.forEach((item)=>{
                if(search_pickup_agent){
                    if(item.value === search_pickup_agent){
                        setSelectedPickup(item);
                    }
                }

                if(search_delivery_agent){
                    if(item.value === search_delivery_agent){
                        setSelectedDelivery(item);
                    }
                }
            })
        }

    }, [])
    

  return (
    <FormGroup>
        <div className='d-flex m-2 mb-0'>
        {/* Global Search */}
        <Col>
            <InputGroup>
                <InputGroupText>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="#76746D" />
                    </svg>
                </InputGroupText>
                <Input
                    id="search"
                    name="search"
                    placeholder="Search"
                    type="text"
                    value={search}
                    onChange={handleInput}
                />
            </InputGroup>
        </Col>
        {/* End Global Search */}

        {/* Date Range */}
        <Col>
        <ReactDatePicker
            className='form-control'
            selectsRange={true}
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            placeholderText="start date - end date"
            onChange={handleDateInput}
            monthsShown={2}
            dateFormat="dd-MM-yyyy"
            maxDate={new Date()}
            isClearable      
        />
        </Col>
        {/* End Date Range */}
        
        {/* Packet Staus */}
        <Col>
            <InputSelect name="search_status" options={deliveryStatusOptions} value={selectedStatus} defaultValue={selectedStatus} placeholder="by Status" handleChange={handleSelect} />
        </Col>
        {/* End Packet Status */}

        {/* Pickup Agent */}
        <Col>
            <InputSelect name="search_pickup_agent" placeholder="Pickup Agent" value={selectedPickup} defaultValue={selectedPickup} options={allAgent} handleChange={handleSelect} />
        </Col>
        {/* End Pickup Agent */}

        {/* Delivery Agent */}
        <Col>
            <InputSelect name="search_delivery_agent" placeholder="Delivery Agent" value={selectedDelivery} defaultValue={selectedDelivery} options={allAgent} handleChange={handleSelect} />
        </Col>
        {/* End Delivery Agent */}
        {/* Delivery Agent */}
        {/* <Col>
            <Button block color="primary" onClick={null}>
                Search
            </Button>
        </Col> */}
        {/* End Delivery Agent */}
        </div>
    </FormGroup>
  )
}

export default FormSearchAdminPackets