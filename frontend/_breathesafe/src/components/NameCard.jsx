import React from 'react'

function NameCard({ employeeName }) {
  return (
    <div className="ml-4 mb-2 card card-border w-fit bg-skyblue shadow-black/50 shadow-md">
      <div className="card-body p-4">
        <h1 className='text-lightgrey text-2xl font-bold'>Current Employee: {employeeName}</h1>
      </div>
    </div>
  )
}

export default NameCard