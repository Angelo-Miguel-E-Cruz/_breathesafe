import React from 'react'

function NameCard({ employeeName }) {
  
  const role  = window.localStorage.getItem("role")
  return (
    <div className="ml-4 mb-2 card card-border w-fit bg-skyblue shadow-black/50 shadow-md">
      <div className="card-body p-4">
        <h1 className='text-lightgrey text-2xl font-bold'>
          {role === "Admin" ? `Current Employee: ${employeeName}` : `Employee Name: ${employeeName}`}
          </h1>
      </div>
    </div>
  )
}

export default NameCard