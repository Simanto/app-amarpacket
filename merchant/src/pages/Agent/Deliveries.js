import React, { useEffect } from 'react'
import { Card, CardHeader } from 'reactstrap'
import { useAppContext } from '../../context/appContext'
import { CardAgentDelivery } from '../../modules'

const AgentDeliveries = () => {
  const {getPacketAssignedForDeliveries, allPackets, isLoading} = useAppContext();
  useEffect(() => {
    getPacketAssignedForDeliveries()
  }, [])
  
  return (
    <div>
        <div className='top-bar p-3 bg-primary shadow'>
          <h3 className='mb-0'>Assigned Deliveries</h3>
        </div>
        {isLoading ? 
          "loading" 
          : 
          <div className='app-body p-3 pt-5 pb-5'>
            <div className='spacer mt-4'></div>
            {allPackets.map((data) =>
              {return(
                <CardAgentDelivery key={data._id} items={data} />
              )}
            )}
            <div className='spacer mb-5'></div>
          </div>
        }
        
    </div>
  )
}

export default AgentDeliveries