import React from 'react'
import { Link } from 'react-router-dom'

const DeliveryDetails = () => {
  return (
    <div>
        {/* Header */}
        <div className='top-bar p-3 bg-primary shadow-sm '>
            <Link to={"/agent/deliveries/all"} className='d-flex align-items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='icon icon-24 me-2'><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
                <h3 className='mb-0'>Delivery Details</h3>
            </Link>
        </div>
    </div>
  )
}

export default DeliveryDetails