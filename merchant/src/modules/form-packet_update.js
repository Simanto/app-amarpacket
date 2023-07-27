import React from 'react'
import { Button,ModalHeader,ModalBody,ModalFooter, Form, FormGroup,Input, InputGroup, InputGroupText, Label,Row,Col } from "reactstrap";
import { InputSelect, Loading } from '../elements';
import { deliveryStatusOptions, agentDeliveryStatusOptions } from '../assets/doc/options.js';
import { useState, useEffect} from 'react';
import { useAppContext } from '../context/appContext';
import { Alert } from "../elements";

const FormPacketUpdate = () => {
    const [selected, setSelected] = useState();
    const [pickupAgent, setPickupAgent] = useState();
    const [deliveryAgent, setDeliveryAgent] = useState();
    const [statusOptions, setStatusOptions] = useState();
    const {
        isLoading,
        handleChange,
        dispatch,
        showAlert,
        updatePacketStatus,

        // Agents
        allAgent,

        // Packet Data
        packet_status, 
        packet_status_message,
        packet_status_category,
        packet_trackingID,
        packet_pickup_agentID,
        packet_delivery_agentID,
        packet_pickup_agent_name,
        packet_delivery_agent_name,
        user
        
    } = useAppContext();

    useEffect(() => {
        let options = deliveryStatusOptions;

        if(user.role === "agent"){
            options = agentDeliveryStatusOptions;
        }

        options.forEach((item)=>{
            if(item.value === packet_status){
                setSelected(item);
            }
        })

        setStatusOptions(options);
        
    }, []);
    
    const handleSelect = (option) =>{
        
        setSelected(option)
        
        handleChange({
            name: "packet_status",
            value: option.value
        })

        handleChange({
            name: "packet_status_category",
            value: option.category
        })

        handleChange({
            name: "packet_status_message",
            value: option.message
        })

        handleChange({
            name: "packet_status_category",
            value: option.category
        })
    }

    const handleSelectPcikupAgent = (option) =>{
        console.log("pickupAgent", option);
        setPickupAgent(option);
        handleChange({
            name: "packet_pickup_agentID",
            value: option.value,
        })

        handleChange({
            name: "packet_status_message",
            value: `${option.label}, phone - ${option.phone}, is assigned to pickup your packets`,
        })

        handleChange({
            name: "packet_status_category",
            value: option.category
        })
    }

    const handleSelectDeliveryAgent = (option) =>{
        setDeliveryAgent(option);
        handleChange({
            name: "packet_delivery_agentID",
            value: option.value,
        })

        handleChange({
            name: "packet_status_message",
            value: `${option.label}, phone - ${option.phone}, is assigned to deliver your packet`,
        })
    }

    const handleSelectReturnAgent = (option) =>{
        setDeliveryAgent(option);
        handleChange({
            name: "packet_delivery_agentID",
            value: option.value,
        })

        handleChange({
            name: "packet_status_message",
            value: `${option.label}, phone - ${option.phone}, is assigned to return your packet`,
        })
    }

    const handleInput = (e) =>{
        const { name, value } = e.target;
        handleChange({name, value});
    }

    const handleUpdate = () =>{
        if(
            packet_status === "assigned-for-pickup" 
        ){
            if(!packet_pickup_agentID){
                dispatch({type:"ERROR", payload: {msg:"Please select a pcikup agent"}});
                return
            }
        }

        if(packet_status !== "assigned-for-pickup" ) {
            handleChange({
                name: "packet_pickup_agentID",
                value: "",
            })
        }

        if(
            packet_status === "assigned-for-delivery" ||
            packet_status === "assigned-for-return"
        ){
            if(!packet_delivery_agentID){
                dispatch({type:"ERROR", payload: {msg:"Please select a delivery agent"}});
                return
            }
        } else if(
            packet_status !== "assigned-for-delivery" ||
            packet_status !== "assigned-for-return"
        ){
            handleChange({
                name: "packet_delivery_agentID",
                value: "",
            })
        }

        updatePacketStatus();
    }

  return (
    <>
        {isLoading ? 
            <Loading />
            : 
            <div>
                <ModalHeader>Update Packet #<span className='text-uppercase'>{packet_trackingID}</span></ModalHeader>
                {/* Error */}
                {showAlert && 
                    <div className="p-3">
                            <Alert />
                    </div>
                }
                {/* Error: end */}
                <Form>
                    <ModalBody>
                        {/* Asign Pickup */}
                        <div className='p0'>
                                <Label for="Phone" className="fw-medium">
                                    Select Status
                                </Label>
                            <InputSelect options={statusOptions} name="packet_delivery_status" value={selected} defaultValue={selected} placeholder="Packet Status" handleChange={handleSelect}/>
                        </div>

                        {/* Status Message based on condition */}
                        {packet_status === "on-hold-at-hub" || packet_status === "partial-return" || packet_status === "canceled" || packet_status === "canceled" ?
                            <FormGroup className='mt-3'>
                                <Label for="Phone" className="fw-medium">
                                    Message
                                </Label>
                                <Input 
                                    id="packet_status_message" 
                                    name="packet_status_message" 
                                    placeholder="Enter proper reasons" 
                                    type="textarea"
                                    onChange={handleInput}
                                    value={packet_status_message}
                                />
                            </FormGroup>
                            :
                            null
                        }
                        {/* End */}

                        {/* Assigned For Pickup */}
                        {packet_status === "assigned-for-pickup" ?
                            <FormGroup className='mt-3'>
                                <Label>
                                    Assign Pickup Agent
                                </Label>
                                <InputSelect options={allAgent} name="packet_pcikup_agent" value={pickupAgent} defaultValue={pickupAgent} placeholder="Select Agent" handleChange={handleSelectPcikupAgent}/>
                            </FormGroup>
                            :
                            null
                        }

                         {/* Assigned For Delivery */}
                         {(packet_status === "assigned-for-delivery" && user.role !== 'agent') ?
                            <FormGroup className='mt-3'>
                                <Label>
                                    Assign Delivery Agent
                                </Label>
                                <InputSelect options={allAgent} name="packet_delivery_agent" value={deliveryAgent} defaultValue={deliveryAgent} placeholder="Select Agent" handleChange={handleSelectDeliveryAgent}/>
                            </FormGroup>
                            :
                            null
                         }

                         {/* Assigned For Return */}
                         {packet_status === "assigned-for-return" ?
                            <FormGroup className='mt-3'>
                                <Label>
                                    Assign Delivery Agent
                                </Label>
                                <InputSelect options={allAgent} name="packet_delivery_agent" value={deliveryAgent} defaultValue={deliveryAgent} placeholder="Select Agent" handleChange={handleSelectReturnAgent}/>
                            </FormGroup>
                            :
                            null
                         }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                    </ModalFooter>
                </Form>
            </div>
        }
    </>
  )
}

export default FormPacketUpdate