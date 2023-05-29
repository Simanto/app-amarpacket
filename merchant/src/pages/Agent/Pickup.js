import React from 'react'
import { CardAgentPickup } from '../../modules'

const AgentPickup = () => {
  return (
    <div>
        <div className='top-bar p-3 bg-primary shadow'>
            <h3 className='mb-0'>Assigned Pickup's</h3>
        </div>
        <div className='app-body m-3'>
          <CardAgentPickup />
        </div>
    </div>
  )
}

export default AgentPickup