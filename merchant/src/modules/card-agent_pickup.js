import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

const CardAgentPickup = () => {
  return (
    <Card>
        <CardHeader className='mt-2 d-flex flex-row justify-content-between'>
          <div className='card-delivery_merchant-info d-flex flex-column'>
            <h6>Merchant Name</h6>
            <p>Phone: <span className='fw-medium text-dark'>0123456789</span> </p>
          </div>
          <div>
            <a href="tel:0123456789" className='btn btn-md btn-primary ms-3'>Call</a>
          </div>
        </CardHeader>
        <CardBody>
            <p className='pb-1 mb-0'>Area: <span className='fw-medium text-dark'>Badda</span></p>
            <p className='pb-1 mb-0'>Address: <span className='fw-medium text-dark'>DIT Project, Merul Badda</span></p>
            <p className='pb-1 mb-0'>No. of Packets: <span className='fw-medium text-dark'>13</span></p>
        </CardBody>
    </Card>
  )
}

export default CardAgentPickup