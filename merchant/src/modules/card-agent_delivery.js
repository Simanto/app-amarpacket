// import React from 'react'
import { Fragment, useState } from "react";
import { Alert, Button, Modal, Card, CardBody, CardHeader } from "reactstrap";
import { useAppContext } from "../context/appContext";
import FormPacketUpdate from "./form-packet_update";

const CardAgentDelivery = ({items}) => {
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
          <div className="d-flex justify-content-between">
            <p className="mb-1">Tracking ID:</p>
            <p className='fw-medium text-dark text-uppercase mb-1'>{items.packet_trackingID}</p>
          </div>

        </CardHeader>
        <CardBody>
          <div className='d-flex flex-row mb-2 justify-content-between'>
            <div className='card-delivery_merchant-info d-flex flex-column'>
              <p className='pb-1 mb-0 fw-medium text-dark font-size_14'>{items.packet_customerName}</p>
              <p className='pb-1 mb-0 fw-medium text-dark font-size_14'> {items.packet_customerPhone}</p>
              <p className='pb-1 mb-0 fw-medium text-dark font-size_14'>{items.packet_customerAddress}</p>
            </div>
            <div>
              <a href={`tel:${items.packet_customerPhone}`} className='btn btn-md btn-light ms-3'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon icon-24"><path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z" fill="currentColor"></path></svg>
              </a>
            </div>
          </div>
          
          <Alert className='mb-3 alert-warning font-size_14'>Notes: <span className='fw-medium text-dark'> {items.packet_note} </span></Alert>
          
          <div className='d-flex flex-row justify-content-between border-top pt-2'>
            <div className='card-delivery_merchant-info d-flex flex-column'>
              <h6>{items.packet_merchant}</h6>
              <p className='fw-medium'>{items.packet_merchant_phone}</p>
            </div>
            <div>
              {/* <p className={`font-size_12 text-${items.packet_status_category}`}>{items.packet_status}</p> */}
              <a href={`tel:${items.packet_merchant_phone}`} className='btn btn-md btn-primary ms-3'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon icon-24"><path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z" fill="currentColor"></path></svg>
              </a>
            </div>
          </div>
            {/* <p className='pb-1 mb-0'>Area: <span className='fw-medium text-dark'> {items.packet_customerArea} </span></p> */}
           
            
            <div className='border-top border-bottom text-center pt-4 pb-3'>
              <h2>TK. <strong>{items.packet_collectionAmount}</strong></h2>
            </div>

            {/* Buttons for updating packet status */}
            <div className='d-flex flex-row justify-content-between mt-2'>

              {items.packet_status === "out-for-delivery" ?
                <>
                  <Button href="tel:0123456789" color='danger' className='me-2' block>Failed</Button>
                  <Button href="tel:0123456789" color='success' block>Delivered</Button>
                </>
                :
                <>
                  <Button href="tel:0123456789" color='info' className='me-2' block>Drop</Button>
                  <Button href="tel:0123456789" color='success' block>Confirm</Button>
                </>
              }
            </div>
        </CardBody>

        <Modal isOpen={modal} toggle={toggle}>
          <FormPacketUpdate />
        </Modal>
    </Card>
  )
}

export default CardAgentDelivery