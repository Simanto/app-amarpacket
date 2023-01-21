import React from 'react'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'

const CardAgentDelivery = () => {
  return (
    <Card>
        <CardHeader className='mt-2'>
          <p>TID: <span className='fw-medium text-dark'>AP1234</span></p>
          <div className='d-flex flex-row justify-content-between'>
            <div className='card-delivery_merchant-info d-flex flex-column'>
              <h6>Merchant Name</h6>
              <p>Phone: <span className='fw-medium text-dark'>0123456789</span> </p>
            </div>
            <div>
              <a href="tel:0123456789" className='btn btn-md btn-primary ms-3'>Call</a>
            </div>
          </div>
        </CardHeader>
        <CardBody>
            <p className='pb-1 mb-0'>Name: <span className='fw-medium text-dark'>Kamrun Nahar</span></p>
            <p className='pb-1 mb-0'>Phone: <span className='fw-medium text-dark'>0123456789</span></p>
            <p className='pb-1 mb-0'>Area: <span className='fw-medium text-dark'>Badda</span></p>
            <p className='pb-1 mb-0'>Address: <span className='fw-medium text-dark'>DIT Project, Merul Badda</span></p>
            <p className='pb-4 mb-0'>Notes: <span className='fw-medium text-dark'>7 tar por nibe</span></p>
            <div className='border-top border-bottom text-center pt-2 mb-4'>
              <p className='pb-1 mb-0'>Collection Amount</p>
              <h4>tk. 3000</h4>
            </div>
            <Button href="tel:0123456789" color='primary' block>Call 0123456789</Button>
        </CardBody>
    </Card>
  )
}

export default CardAgentDelivery