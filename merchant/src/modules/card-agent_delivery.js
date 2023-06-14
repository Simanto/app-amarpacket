// import React from 'react'
import { Fragment, useState } from "react";
import { Badge, Button, Modal, Card, CardBody, CardHeader } from "reactstrap";
import { useAppContext } from "../context/appContext";
import FormPacketUpdate from "./form-packet_update";
import { text } from "express";

const CardAgentDelivery = ({items}) => {
  console.log(items)
  const {setEditPacket} = useAppContext();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleUpdtate = (id) =>{
    setEditPacket(id);
    toggle();
  }

  return (
    <Card className='mt-4' data-id={items._id}>
        <CardHeader className='mt-2'>
          <p>TID: <span className='fw-medium text-dark text-uppercase'>{items.packet_trackingID}</span></p>
          <div className='d-flex flex-row justify-content-between'>
            <div className='card-delivery_merchant-info d-flex flex-column'>
              <h6>{items.packet_merchant}</h6>
              {/* <p>Phone: <span className='fw-medium text-dark'>{items.packet_merchant_phone}</span> </p> */}
            </div>
            <div>
              {/* <p className={`text-${items.packet_status_category}`}>{items.packet_status}</p> */}
              {/* <a href={`tel:${items.packet_merchant_phone}`} className='btn btn-md btn-primary ms-3'>Call</a> */}
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className='d-flex flex-row justify-content-between'>
            <div className='card-delivery_merchant-info d-flex flex-column'>
              <p className='pb-1 mb-0'>Name: <span className='fw-medium text-dark'>{items.packet_customerName}</span></p>
              <p className='pb-1 mb-0'>Phone: <span className='fw-medium text-dark'> {items.packet_customerPhone} </span></p>
            </div>
            <div>
              <a href={`tel:${items.packet_customerPhone}`} className='btn btn-md btn-light ms-3'>Call</a>
            </div>
          </div>
            {/* <p className='pb-1 mb-0'>Area: <span className='fw-medium text-dark'> {items.packet_customerArea} </span></p> */}
            <p className='pb-1 mb-0'>Address: <br /> <span className='fw-medium text-dark'> {items.packet_customerAddress} </span></p>
            <p className='pb-4 mb-0'>Notes: <span className='fw-medium text-dark'> {items.packet_note} </span></p>
            <div className='border-top text-center pt-4 mb-2'>
              {/* <p className='pb-1 mb-0'>Collection Amount</p> */}
              <h2>TK. <strong>{items.packet_collectionAmount}</strong></h2>
            </div>

            {/* Buttons for updating packet status */}
            <div className='d-flex flex-row justify-content-between'>
              {/* {items.packet_status === "failed-to-deliver" &&
                <h3 className='text-danger text-uppercase fw-bolder'>Failed</h3>
              }

              {items.packet_status === "delivered" &&
                <h3 className='text-success text-uppercase fw-bolder'>Delivered</h3>
              } */}
               

              {/* <Button href="tel:0123456789" color='danger' className='me-2' block>Failed</Button> */}
              {/* <Button href="tel:0123456789" color='success' block>Delivered</Button> */}
            </div>
        </CardBody>
        <CardBody>
          <div class="d-flex flex-row justify-content-between">
            <a href={`tel:${items.packet_customerPhone}`} className='btn btn-md btn-success'>Accept</a>
            {/* <a href={`tel:${items.packet_customerPhone}`} className='btn btn-md btn-dark'>Done</a> */}
            <button className="action action-update" onClick={() => handleUpdtate(`${items.packetID}`)}>
              <span class="w-2">Update</span>
            </button>
          </div>
        </CardBody>

        <Modal isOpen={modal} toggle={toggle}>
          <FormPacketUpdate />
        </Modal>
    </Card>
  )
}

export default CardAgentDelivery