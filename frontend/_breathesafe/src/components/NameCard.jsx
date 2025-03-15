import React from 'react'
import { FaUserCircle } from "react-icons/fa"

function NameCard({ employeeName }) {
  
  const role  = window.localStorage.getItem("role")
  return (
    <>
    {
      role === "Admin" ? 
      <div className="mb-2 card card-border border-lightblack w-fit bg-skyblue shadow-black/50 shadow-md">
        <div className="card-body p-4">
          <h1 className='text-lightgrey text-3xl font-bold'> Current Employee: {employeeName} </h1>
        </div>
      </div> :
      <div className="mb-2 w-fit flex items-center space-x-2">
        <FaUserCircle className="text-lightgrey text-3xl" />
        <h1 className="text-lightgrey text-3xl font-bold">{employeeName}</h1>
      </div>
    
    }
    </>
  )
}

export default NameCard