import React from 'react'
import { CardAgentPickup } from '../../modules'

const AgentPickup = () => {
  return (
    <div>
        <div className='top-bar p-3 bg-primary shadow-sm'>
            <h3 className='mb-0'>Assigned Pickup's</h3>
        </div>
        <div className='app-body p-3 mt-3 pt-5 pb-5'>
          <CardAgentPickup />
        </div>
    </div>
  )
}

export default AgentPickup