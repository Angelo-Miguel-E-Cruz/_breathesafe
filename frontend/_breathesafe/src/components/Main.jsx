import React, { useEffect, useReducer, useState } from 'react'
import SensorCard from './SensorCard'
import SensorChart from './SensorChart'
import NameCard from './NameCard'
import Table from './Table'
import Alerts from './Alerts'
import axios from 'axios'
import formatTimestamp from './functions/formatTimestamp'
import { useEmployee } from './contexts/EmployeeContext'
import { dataReducer, INITIAL_STATE } from './functions/dataReducer'

function Main() {

  const [sensorState, dispatch] = useReducer(dataReducer, INITIAL_STATE)
  const [pmChartData, setPMChartData] = useState(null)
  const [aqiChartData, setAQIChartData] = useState(null)
  const [employeeName, setEmployeeName] = useState("")
  const [formattedTime, setFormattedTime] = useState("")
  const { selectedEmployee, setSelectedEmployee } = useEmployee()

  useEffect(() => {
    const getFirst = async () => {
      try {
        const firstResponse = await axios.get(`https://breath-o9r9.onrender.com/api/sensor_data/all`)
        const firstData = firstResponse.data
        setSelectedEmployee(firstData[0].emp_id)
      } catch (error) {
        console.log(error.message) 
      }
    }
    getFirst
  }, [])

  useEffect(() => {

    const fetchData = async () =>{
      try {
        const response = await axios.get(`https://breath-o9r9.onrender.com/api/sensor_data?employeeID=${selectedEmployee}`)
        const sensorData = response.data
        
        setEmployeeName(sensorData[0].emp_name)

        if (sensorData.length > 0) {
          const latestReading = sensorData[sensorData.length - 1]
          setFormattedTime(formatTimestamp(latestReading.timestamp))
          dispatch({ type: "UPDATE", field: "latestPM25", value: latestReading.pm25, timestamp: latestReading.timestamp })
          dispatch({ type: "UPDATE", field: "latestPM10", value: latestReading.pm10, timestamp: latestReading.timestamp })
          dispatch({ type: "UPDATE", field: "latestPM25AQI", value: latestReading.aqi_pm25, timestamp: latestReading.timestamp })
          dispatch({ type: "UPDATE", field: "latestPM10AQI", value: latestReading.aqi_pm10, timestamp: latestReading.timestamp })
          dispatch({ type: "UPDATE", field: "latestPM25Level", value: latestReading.aqi_pm25_category, timestamp: latestReading.timestamp })
          dispatch({ type: "UPDATE", field: "latestPM10Level", value: latestReading.aqi_pm10_category, timestamp: latestReading.timestamp })
          const lastReading = sensorData[sensorData.length - 2]
          dispatch({ type: "UPDATE", field: "lastPM25Level", value: lastReading.aqi_pm25_category, timestamp: lastReading.timestamp })
          dispatch({ type: "UPDATE", field: "lastPM10Level", value: lastReading.aqi_pm10_category, timestamp: lastReading.timestamp })
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
  }, [selectedEmployee])

  useEffect(() => {
    if (sensorState.latestPM25.value || sensorState.latestPM10.value || sensorState.latestPM25Level.value || sensorState.latestPM10Level.value){
      updateEmployeeData();
    }
  }, [sensorState.latestPM25.value, sensorState.latestPM10.value, sensorState.latestPM25Level.value, sensorState.latestPM10Level.value])

  const updateEmployeeData = async() =>{
    try {
      const response = await axios.put(`https://breath-o9r9.onrender.com/api/update_employee_readings`,{
        employeeId: selectedEmployee,
        pm25: sensorState.latestPM25.value, 
        pm10: sensorState.latestPM10.value, 
        pm25Level: sensorState.latestPM25Level.value,
        pm10Level: sensorState.latestPM10Level.value,
        latest_time: formattedTime
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
    <div className='absolute inset-0 bg-background h-screen pt-27 overflow-x-auto w-full'>
      <NameCard employeeName={employeeName}/>
      <div className='grid grid-cols-[30%_35%_35%] gap-4 pr-4 max-lg:grid-cols-1'>
        <div className='ml-4 grid grid-rows-[39%_61%] gap-2'>
          <div className='grid grid-rows-2 gap-2'>
            <SensorCard label="PM 2.5" value={sensorState.latestPM25.value} latestVal={sensorState.latestPM25Level.value}/>
            <SensorCard label="PM 10" value={sensorState.latestPM10.value} latestVal={sensorState.latestPM10Level.value}/>
          </div>
          <div className='grid grid-rows-2'>
            {/* TODO: ADD CHECK IF LEVEL CHANGED */}
            <Alerts latestVal={sensorState.latestPM25Level.value} sensorType="PM 2.5"/>
            <Alerts latestVal={sensorState.latestPM10Level.value} sensorType="PM 10"/>
          </div>
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
    </div>
    
  )
}

export default Main