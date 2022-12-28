import React from 'react'
import { Link } from 'react-router-dom'

// import {IllustationEror404} from '../../assets/images/index.js';
import { IllustationEror404 } from '../assets/images'

const Error = () => {
  return (
    <div className='w-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
        <div className='error error-illustration'>
            <img src={IllustationEror404} alt='' />
        </div>
        <div className='error-content text-center p-5'>
            <h2>opps! Page Not Found</h2>
            <p>we can not find the page you are looking for</p>
            <Link to={"/"} className='fw-medium'>Go Back to Home</Link>
        </div>
    </div>
  )
}

export default Error