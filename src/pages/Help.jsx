import React from 'react'
import { useNavigate } from 'react-router-dom'
import Chatbot from '../components/Chatbot'

const Help = () => {
    const navigate=useNavigate()

    const Click=()=>{
        navigate('/home')
    }

  return (
    <div>
        {/* <h1>Here we will built chat bot to solve queries</h1> */}
        <Chatbot />
        <div className='p-6'>
            <button className='bg-blue-600 text-white p-2 rounded' onClick={Click}  >
                Go back 
            </button>
        </div>
    </div>
  )
}

export default Help