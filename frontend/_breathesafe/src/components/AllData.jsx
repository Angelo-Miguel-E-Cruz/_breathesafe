import React, { useEffect, useState } from 'react'
import axios from 'axios'
import formatTimestamp from './functions/formatTimestamp'
import AvgGraph from './AvgGraph'

function AllData() {
  const [pm25ConData, setPm25ConData] = useState(null)
  const [pm10ConData, setPm10ConData] = useState(null)
  const [pm25AQIData, setPm25AQIData] = useState(null)
  const [pm10AQIData, setPm10AQIData] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://breath-o9r9.onrender.com/api/5m_avg/graph`)
        const sensorData = response.data
        
        setCharts(sensorData)
        
      } catch (error) {
        console.log(error.message) 
      }
    }
    fetchData
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)

  })

  const setCharts = (sensorData) => {
    const con25ChartData = sensorData.reduce((acc, { device_id, emp_name, pm25, timestamp }) => {
      acc.push({
        id: device_id,
        pm25,
        emp_name,
        timestamp: formatTimestamp(timestamp),
      })
      return acc
    }, [])

    setPm25ConData(con25ChartData)
    
    const aqi25ChartData = sensorData.reduce((acc, { device_id, emp_name, aqi_pm25, timestamp }) => {
      acc.push({
        id: device_id,
        aqi_pm25,
        emp_name,
        timestamp: formatTimestamp(timestamp),
      })
      return acc
    }, [])

    setPm25AQIData(aqi25ChartData)
    
    const con10ChartData = sensorData.reduce((acc, { device_id, emp_name, pm10, timestamp }) => {
      acc.push({
        id: device_id,
        pm10,
        emp_name,
        timestamp: formatTimestamp(timestamp),
      })
      return acc
    }, [])

    setPm10ConData(con10ChartData)
    
    const aqi10ChartData = sensorData.reduce((acc, { device_id, emp_name, aqi_pm10, timestamp }) => {
      acc.push({
        id: device_id,
        aqi_pm10,
        emp_name,
        timestamp: formatTimestamp(timestamp),
      })
      return acc
    }, [])

    setPm10AQIData(aqi10ChartData)
  }

  return (
    <div className='absolute inset-0 bg-background h-screen pt-29 overflow-x-auto w-full'>
      <div className='grid grid-cols-2 gap-4 px-4 max-lg:grid-cols-1'>
        <div className='grid grid-rows-4 gap-4 max-lg:grid-cols-1'>
          <div className='border-red-500 border-1'>
            <AvgGraph data={pm25ConData || []} />
          </div>
          <div className='border-green-500 border-1'>2</div>
          <div className='border-blue-500 border-1'>3</div>
          <div className='border-yellow-500 border-1'>4</div>
        </div>
        <div className='grid grid-rows-4 gap-4 max-lg:grid-cols-1'>
          <div className='border-pink-500 border-1'>5</div>
          <div className='border-orange-500 border-1'>6</div>
          <div className='border-emerald-950 border-1'>7</div>
          <div className='border-cyan-500 border-1'>8</div>
        </div>
      </div>
    </div>
  )
}

export default AllData