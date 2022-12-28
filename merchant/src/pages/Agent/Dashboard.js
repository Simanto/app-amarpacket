import React from 'react'

const AgentDashboard = () => {
  return (
    <div>
        <div className='top-bar p-3 bg-primary shadow'>
            <h3 className='mb-0'>Dashboard</h3>
        </div>

        {/* earning card */}
        <div className='card m-3 mt-4'>
            <div className='card-header'>
                Earning of December (Demo)
            </div>
            <div className='card-body'>
                <div className='d-flex justify-content-between pb-2'>
                    <div>Total Deliveries</div>
                    <div className='fw-medium'>300</div>
                </div>
                <div className='d-flex justify-content-between pb-2'>
                    <div>Total Deliveries Commision</div>
                    <div className='fw-medium'>TK. 1800</div>
                </div>
                <div className='d-flex justify-content-between pb-2'>
                    <div>Total Pickup</div>
                    <div className='fw-medium'>120</div>
                </div>
                <div className='d-flex justify-content-between pb-2'>
                    <div>Total Pickup Commision</div>
                    <div className='fw-medium'>TK. 600</div>
                </div>
                <div className='d-flex justify-content-between border-top pt-2'>
                    <div>Total Commision</div>
                    <div className='fw-medium'>TK. 2400</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AgentDashboard