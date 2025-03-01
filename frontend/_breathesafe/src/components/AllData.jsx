import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SensorChart from './SensorChart'
import Table from './Table'

function AllData() {
  const [pm25ConData, setPm25ConData] = useState(null)
  const [pm10ConData, setPm10ConData] = useState(null)
  const [pm25AQIData, setPm25AQIData] = useState(null)
  const [pm10AQIData, setPm10AQIData] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://breath-o9r9.onrender.com/api/sensor_data/all`)
        const sensorData = response.data
        
        const con25ChartData = sensorData.reduce((acc, { id, emp_name, pm25, timestamp }) => {
          acc.push({
            id,
            pm25,
            emp_name,
            timestamp: formatTimestamp(timestamp),
          })
          /*if (!acc[id]) {
            acc[id] = {
              emp_name: emp_name,
              id: id,
              records: []
            };
          }
          acc[id].records.push({
            pm25: pm25,
            timestamp: timestamp
          });*/
          return acc
        }, [])
        
        /*const trimmedData = Object.keys(con25ChartData).reduce((acc, id) => {
          acc[id] = {
            ...con25ChartData[id],
            records: con25ChartData[id].records.slice(-20) 
          };
          return acc;
        }, {})*/

        console.log(con25ChartData)
        //setPm25ConData(trimmedData)
        
      } catch (error) {
        console.log(error.message) 
      }
    }
    fetchData
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)

  })

  return (
    <div className='absolute inset-0 bg-background h-screen pt-27 overflow-x-auto w-full'>
      <div className='grid grid-cols-2 gap-4 pr-4 max-lg:grid-cols-1'>
        <div className='grid grid-rows-4 gap-4 pr-4 max-lg:grid-cols-1'>
          <div className='bg-red-500'>1</div>
          <div className='bg-green-500'>2</div>
          <div className='bg-blue-500'>3</div>
          <div className='bg-yellow-500'>4</div>
        </div>
        <div className='grid grid-rows-4 gap-4 pr-4 max-lg:grid-cols-1'>
          <div className='bg-pink-500'>5</div>
          <div className='bg-orange-500'>6</div>
          <div className='bg-emerald-950'>7</div>
          <div className='bg-cyan-500'>8</div>
        </div>
      </div>
    </div>
  )
}

export default AllData