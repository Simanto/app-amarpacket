import React from 'react'
import { Button } from 'reactstrap'
import { useAppContext } from '../../context/appContext'

const AgentProfile = () => {
  const {logOut} = useAppContext();
  const handleClick = () =>{
    logOut()
  }
  return (
    <div>
        <div className='top-bar p-3 bg-primary shadow'>
            <h3 className='mb-0'>Profile</h3>
        </div>
        <div className='app-body m-3'>
          <p>Details are coming soon</p>
          <Button color='primary' onClick={handleClick} block>Logout</Button>
        </div>
    </div>
  )
}

export default AgentProfile