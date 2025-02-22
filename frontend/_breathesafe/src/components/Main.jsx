import React, { useEffect, useState } from 'react'
import SensorCard from './SensorCard'
import SensorChart from './SensorChart'
import NameCard from './NameCard'
import Table from './Table'
import Alerts from './Alerts'
import axios from 'axios'
import formatTimestamp from './functions/formatTimestamp'
import { useEmployee } from './contexts/EmployeeContext'

function Main() {

  const [latestPM25, setLatestPM25] = useState({})
  const [latestPM10, setLatestPM10] = useState({})
  const [latestPM25AQI, setLatestPM25AQI] = useState({})
  const [latestPM10AQI, setLatestPM10AQI] = useState({})
  const [latestPM25Level, setLatestPM25Level] = useState({})
  const [latestPM10Level, setLatestPM10Level] = useState({})
  const [pmChartData, setPMChartData] = useState(null)
  const [aqiChartData, setAQIChartData] = useState(null)
  const [employeeName, setEmployeeName] = useState("")
  const { selectedEmployee } = useEmployee()

  useEffect(() => {
    const fetchData = async () =>{
      try {
        console.log(selectedEmployee)
        const response = await axios.get(`http://localhost:5000/api/sensor_data?employeeID=${selectedEmployee}`)
        const sensorData = response.data
        setEmployeeName(sensorData[0].emp_name)

        if (sensorData.length > 0) {
          const latestReading = sensorData[sensorData.length - 1]

          setLatestPM25({ value: latestReading.pm25, timestamp: latestReading.timestamp })
          setLatestPM10({ value: latestReading.pm10, timestamp: latestReading.timestamp })
          
          setLatestPM25AQI({ value: latestReading.aqi_pm25, timestamp: latestReading.timestamp })
          setLatestPM10AQI({ value: latestReading.aqi_pm10, timestamp: latestReading.timestamp })

          setLatestPM25Level({ value: latestReading.aqi_pm25_category, timestamp: latestReading.timestamp })
          setLatestPM10Level({ value: latestReading.aqi_pm10_category, timestamp: latestReading.timestamp })
        }

        const pmChartData = sensorData.reduce((acc, { id, pm25, pm10, timestamp }) => {
          acc.push({
            id,
            pm25,
            pm10,
            timestamp: formatTimestamp(timestamp),
          })
          return acc
        }, [])

        setPMChartData(pmChartData)

        const aqiChartData = sensorData.reduce((acc, { id, aqi_pm25, aqi_pm10, timestamp }) => {
          acc.push({
            id,
            aqi_pm25,
            aqi_pm10,
            timestamp: formatTimestamp(timestamp),
          })
          return acc
        }, [])

        setAQIChartData(aqiChartData)

      }catch (error) {
       console.log(error.message) 
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [])
  
  return (
    <main className='absolute inset-0 bg-background h-screen pt-27 overflow-x-auto w-full'>
      <NameCard employeeName={employeeName}/>
      <div className='grid grid-cols-[30%_35%_35%] gap-4 pr-4 max-lg:grid-cols-1'>
        <div className='ml-4 grid grid-rows-[22.5%_22.5%_55%] gap-2'>
          <SensorCard label="PM 2.5" value={latestPM25.value} latestVal={latestPM25Level.value}/>
          <SensorCard label="PM 10" value={latestPM10.value} latestVal={latestPM10Level.value}/>
          <Alerts latestPM25={latestPM25Level.value} latestPM10={latestPM10Level.value}/>
        </div>
        <div className='grid grid-rows-2 gap-2 max-lg:ml-4'>
          <SensorChart chartData={pmChartData} title="Concentration (µg/m³)" type="concentration"/>
          <SensorChart chartData={aqiChartData} title="Air Quality Index" type="aqi"/>
        </div>
        <div className='grid grid-rows-2 gap-2 max-lg:ml-4'>
          {pmChartData && <Table tableData={pmChartData} title="Concentration (µg/m³)" type="concentration"/>}
          {aqiChartData && <Table tableData={aqiChartData} title="Air Quality Index" type="aqi"/>}
        </div>
      </div>
    </main>
    
  )
}

export default Main