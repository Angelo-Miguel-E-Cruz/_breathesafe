import React from 'react'
import clsx from 'clsx'

function AlertMsg({latestPM25, latestPM10}) {
  return (
    <span className={clsx('card card-border inline-block ml-2 pl-2 w-[82%] text-white shadow-black/50 shadow-md',
      {
        'bg-green-600/50': latestPM25 === "Good",
        'bg-amber-300/50' : latestPM25 === "Moderate",
        'bg-orange-600/50' : latestPM25 === "Unhealthy for Sensitive Groups",
        'bg-red-700/50' : latestPM25 === "Unhealthy",
        'bg-pink-900/50' : latestPM25 === "Very Unhealthy",
        'bg-red-950/50' : latestPM25 === "Hazardous"
      }
    )}>
      <p>{latestPM25} levels detected asdasdasda</p>
    </span>
  )
}

export default AlertMsg