import React, { useEffect, useState } from 'react'
import AlertMsg from './AlertMsg';

function Alerts({latestPM25, latestPM10}) {

  const [time, setTime] = useState("")

  useEffect (() =>{
    const timer = setInterval(() => {
      const currTime = new Date()

      const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: "2-digit",
        minute: "2-digit"
      }).format(currTime);

      setTime(formattedTime)

      }, 1000); 
  
      return () => clearInterval(timer);
  }, [])
  
  return (
    <main>
      <div className="card card-border bg-skyblue w-full text-black shadow-black/50 shadow-md">
        <div className="card-body p-2">
          <h1 className='pl-5 font-bold text-2xl mt-2 text-lightgrey'>ALERTS</h1>
          <ul>
            <li className='pl-5'>
              <span>{time} <AlertMsg latestPM25={latestPM25} latestPM10={latestPM10}/></span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Alerts