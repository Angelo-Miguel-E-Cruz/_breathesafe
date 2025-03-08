import React, { useEffect, useState } from 'react'
import AlertMsg from './AlertMsg'

function Alerts({latestVal, sensorType, willPrint, setPrint}) {
  const [alerts, setAlerts] = useState([])

  const latestval = latestVal === undefined ? "" : latestVal.toLowerCase()

  useEffect (() =>{
    console.log(sensorType + " will print?: " + willPrint)
    if(willPrint){
      const timer = setInterval(() => {
      
        const currTime = new Date()
  
        const formattedTime = formatTime(currTime)
  
        const newAlert = generateAlertMessage(latestval, formattedTime)
    
        setAlerts((prevAlerts) => {
          const updatedAlerts = [newAlert, ...prevAlerts]
          return updatedAlerts.slice(0, 5)
        })

        setPrint(false)
  
      }, 5000) 
    
      return () => clearInterval(timer)
    }
  }, [latestVal])

  const generateAlertMessage = (aqiLevel, timestamp) => {

    const messages = {
      "good": `${timestamp} Good Air Quality detected for ${sensorType}`,
      "moderate": `${timestamp} Moderate Air Quality detected for ${sensorType}`,
      "unhealthy for sensitive groups": `${timestamp} ${sensorType} Levels are Unhealthy for Sensitive Groups`,
      "unhealthy": `${timestamp} Unhealthy Air Quality detected for ${sensorType}`,
      "very unhealthy": `${timestamp} Very Unhealthy Air Quality detected for ${sensorType}`,
      "hazardous": `${timestamp} Hazardous Air Quality detected for ${sensorType}`,
    }

    return messages[aqiLevel] || `${timestamp} Unknown AQI Level for ${sensorType}`
  }

  const formatTime = (time) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: "2-digit",
      minute: "2-digit"
    }).format(time)
  }
  
  return (
    <div className="card card-border bg-skyblue w-full h-fit text-black shadow-black/50 shadow-md">
      <div className="card-body p-2">
        <h1 className='pl-5 font-bold text-2xl mt-2 text-lightgrey'>{sensorType} ALERTS</h1>
        <ul>
          {alerts.map((alerts, index) => (
            <li key={index} className="pl-5">
              <AlertMsg latestVal={latestVal} message={alerts}/> 
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Alerts