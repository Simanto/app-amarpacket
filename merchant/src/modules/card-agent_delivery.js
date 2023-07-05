import React from 'react'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'

const CardAgentDelivery = ({items}) => {
  console.log(items)
  return (
    <Card className='mt-4'>
        <CardHeader className='mt-2'>
          <p>TID: <span className='fw-medium text-dark text-uppercase'>{items.packet_trackingID}</span></p>
          <div className='d-flex flex-row justify-content-between'>
            <div className='card-delivery_merchant-info d-flex flex-column'>
              <h6>{items.packet_merchant}</h6>
              <p>Phone: <span className='fw-medium text-dark'>{items.packet_merchant_phone}</span> </p>
            </div>
            <div>
              <a href={`tel:${items.packet_merchant_phone}`} className='btn btn-md btn-primary ms-3'>Call</a>
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
              <a href={`tel:${items.packet_customerPhone}`} className='btn btn-md btn-dark ms-3'>Call</a>
            </div>
          </div>
            {/* <p className='pb-1 mb-0'>Area: <span className='fw-medium text-dark'> {items.packet_customerArea} </span></p> */}
            <p className='pb-1 mb-0'>Address: <br /> <span className='fw-medium text-dark'> {items.packet_customerAddress} </span></p>
            <p className='pb-4 mb-0'>Notes: <span className='fw-medium text-dark'> {items.packet_note} </span></p>
            <div className='border-top border-bottom text-center pt-2 mb-3'>
              {/* <p className='pb-1 mb-0'>Collection Amount</p> */}
              <h3>tk. {items.packet_collectionAmount}</h3>
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
    </Card>
  )
}

export default CardAgentDelivery