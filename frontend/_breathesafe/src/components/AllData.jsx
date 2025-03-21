import React, { useEffect, useState } from 'react'
import axios from 'axios'
import formatTimestamp from './functions/formatTimestamp'
import AvgTable from './AvgTable'
import toast, { Toaster } from 'react-hot-toast'

function AllData() {
  const [pm25ConData, setPm25ConData] = useState(null)
  const [pm10ConData, setPm10ConData] = useState(null)
  const [pm25AQIData, setPm25AQIData] = useState(null)
  const [pm10AQIData, setPm10AQIData] = useState(null)
  const [timestampValue, setTimestampValue] = useState("5 minutes")

  const setCharts = (sensorData) => {
    const con25ChartData = sensorData.reduce((acc, { device_id, emp_name, pm25, timestamp }) => {
      acc.push({
        id: device_id,
        pm25,
        emp_name,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(-20)
    }, [])

    setPm25ConData(con25ChartData)

    const aqi25ChartData = sensorData.reduce((acc, { device_id, emp_name, aqi_pm25, timestamp }) => {
      acc.push({
        id: device_id,
        aqi_pm25,
        emp_name,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(-20)
    }, [])

    setPm25AQIData(aqi25ChartData)

    const con10ChartData = sensorData.reduce((acc, { device_id, emp_name, pm10, timestamp }) => {
      acc.push({
        id: device_id,
        pm10,
        emp_name,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(-20)
    }, [])

    setPm10ConData(con10ChartData)

    const aqi10ChartData = sensorData.reduce((acc, { device_id, emp_name, aqi_pm10, timestamp }) => {
      acc.push({
        id: device_id,
        aqi_pm10,
        emp_name,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(-20)
    }, [])

    setPm10AQIData(aqi10ChartData)
  }

  const getTimestamp = () => {
    const timestampField = document.getElementById("time_select")
    const timestampVal = timestampField.value

    setTimestampValue(timestampVal)
  }

  const fetch5mAvg = async () => {
    try {
      const response = await axios.get(`https://breath-o9r9.onrender.com/api/5m_avg/graph`)
      const sensorData = response.data

      setCharts(sensorData)

    } catch (error) {
      toast.error("No data")
      console.log(error.message)
    }
  }

  const fetch1hrAvg = async () => {
    try {
      const response = await axios.get(`https://breath-o9r9.onrender.com/api/1hr_avg/graph`)
      const sensorData = response.data

      setCharts(sensorData)

    } catch (error) {
      toast.error("No data")
      console.log(error.message)
    }
  }

  useEffect(() => {
    getTimestamp()

    const timestampInterval = setInterval(getTimestamp, 500)

    return () => clearInterval(timestampInterval)
  }, [])

  useEffect(() => {

    const fetchSensorData = async () => {
      let sensorData = []
      switch (timestampValue) {
        case "5 Minutes":
          sensorData = await fetch5mAvg()
          break
        case "1 Hour":
          sensorData = await fetch1hrAvg()
          break
      }

      setCharts((sensorData))
    }

    fetchSensorData()
    const fetchInterval = setInterval(fetchSensorData, 5000)

    return () => clearInterval(fetchInterval)
  }, [timestampValue])


  return (
    <div className='absolute inset-0 bg-background h-screen pt-29 overflow-x-auto w-full'>
      <Toaster />
      <div className='flex mb-5 justify-end mx-[42px]' >
        <div className='align-self-center h-fit rounded-box border-lightblack border-1 bg-sky_blue text-black shadow-black/50 shadow-md max-lg:mr-4'>
          <select defaultValue="5 Minutes" className="select select-ghost h-10 w-38 bg-sky_blue focus:bg-transparent focus:text-black focus:rounded-box focus-within:outline-0" id='time_select'>
            <option className='text-black hover:bg-sky_blue'>5 Minutes</option>
            <option className='text-black hover:bg-sky_blue'>1 Hour</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 px-[42px] max-lg:grid-cols-1'>
        <div className='grid grid-rows-2 gap-4 max-lg:grid-cols-1'>
          <div>
            <AvgTable data={pm25ConData || []} unit="µg/m³" specimen="2.5" />
          </div>
          <div>
            <AvgTable data={pm10ConData || []} unit="µg/m³" specimen="10" />
          </div>
        </div>

        <div className='grid grid-rows-2 gap-4 max-lg:grid-cols-1'>
          <div>
            <AvgTable data={pm25AQIData || []} unit="" specimen="2.5" />
          </div>
          <div>
            <AvgTable data={pm10AQIData || []} unit="" specimen="10" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllData