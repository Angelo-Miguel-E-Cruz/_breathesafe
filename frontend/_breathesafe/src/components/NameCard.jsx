import React from 'react'
import { FaUserCircle } from "react-icons/fa"

function NameCard({ employeeName }) {
  
  return (
    <div className="w-fit flex items-center space-x-3">
      <FaUserCircle className="text-lightgrey text-3xl" />
      <h1 className="text-lightgrey text-3xl font-bold">{employeeName}</h1>
    </div>
  )
}

export default NameCard