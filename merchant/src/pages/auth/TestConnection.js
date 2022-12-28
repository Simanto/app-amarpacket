import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'

const TestConnection = () => {
    const {testConnection} = useAppContext();
    useEffect(() => {
        testConnection();
    }, [])

  return (
    <div>testing connection, check console log</div>
  )
}

export default TestConnection