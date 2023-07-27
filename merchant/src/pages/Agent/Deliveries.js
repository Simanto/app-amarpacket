import React, { useEffect, useState } from 'react'
import { Card, CardHeader } from 'reactstrap'
import { useAppContext } from '../../context/appContext'
import { CardAgentDelivery } from '../../modules'
import { Link } from 'react-router-dom'

const AgentDeliveries = () => {
  const {getPacketAssignedForDeliveries, allPackets, isLoading, setEditPacket} = useAppContext();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  

  const handleUpdtate = (id) =>{
    setEditPacket(id);
    toggle();
  }

  useEffect(() => {
    getPacketAssignedForDeliveries()
  }, [])
  
  return (
    <div>
        <div className='top-bar p-3 bg-primary shadow-sm'>
          <h3 className='mb-0'>Assigned Deliveries</h3>
        </div>

        <div className='app-agent_body'>
          {isLoading ? 
            "loading" 
            : 
            <>
              {allPackets.map((data) =>
                {return(
                  <Link to={"/agent/deliveries/"+data.packetID} className='list-packet_small d-flex justify-content-between border-bottom p-4' key={data.packetID}>
                    <div>
                      <p className='txt-outline font-size_12 text-uppercase mb-1'>{data.packet_trackingID}</p>
                      <p className='fw-medium mb-1'>{data.packet_customerName}</p>
                      <p className='font-size_14 mb-1'>{data.packet_customerPhone}</p>
                      <p className='font-size_12 mb-0'>{data.packet_customerAddress}</p>
                    </div>
                    <div> > </div>
                  </Link>
                )}
              )}
            </>
          }
        </div>
        
        <div className='spacer mb-5'></div>
    </div>
  )
}

export default AgentDeliveries