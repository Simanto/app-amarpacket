import React from 'react'
import { Card, CardHeader } from 'reactstrap'
import { CardAgentDelivery } from '../../modules'

const AgentDeliveries = () => {
  return (
    <div>
         <div className='top-bar p-3 bg-primary shadow'>
            <h3 className='mb-0'>Assigned Deliveries</h3>
        </div>
        <div className='app-body m-3'>
          <CardAgentDelivery />
        </div>
    </div>
  )
}

export default AgentDeliveries