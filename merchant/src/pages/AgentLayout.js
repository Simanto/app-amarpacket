import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import { NavBarBottom } from '../modules'


const AgentLayout = () => {
    useEffect(() => {
    }, [])
    
  return (
    <div className='app-min-height_100vh'>
        {/* Layout for Mobile only */}
        <div>
            <Outlet />
        </div>
        {/* Agent Navigation */}
        <div className='bar'>
            <NavBarBottom />
        </div>
    </div>
  )
}

export default AgentLayout