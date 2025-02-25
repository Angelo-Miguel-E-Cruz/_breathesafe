import React from 'react'
import clsx from 'clsx'

function AlertMsg({latestVal, message}) {
  const time = message.slice(0,8)
  const newMessage = message.slice(9)
  return (
    <p className='text-lightgrey'>
      {time}
      <span className={clsx('card card-border border-0 inline-block mb-2 ml-2 pl-2 w-[82%] text-black',
        {
          'bg-green-600/50': latestVal === "Good",
          'bg-amber-300/50' : latestVal === "Moderate",
          'bg-orange-600/50' : latestVal === "Unhealthy for Sensitive Groups",
          'bg-red-700/50' : latestVal === "Unhealthy",
          'bg-pink-900/50' : latestVal === "Very Unhealthy",
          'bg-red-950/50' : latestVal === "Hazardous"
        }
      )}>
        <span>{newMessage}</span>
      </span>
    </p>
    
  )
}

export default AlertMsg