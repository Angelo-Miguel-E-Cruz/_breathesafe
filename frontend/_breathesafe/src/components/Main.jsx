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
  const [new25Alert, setNew25Alert] = useState(true)
  const [new10Alert, setNew10Alert] = useState(true)
  const [timestampValue, setTimestampValue] = useState("Real-Time")
  
  const role  = window.localStorage.getItem("role")

  const { selectedEmployee } = useEmployee()

  let selectedEmp = role === "User" ? window.localStorage.getItem("employeeID") : selectedEmployee
  
  const empSelected = selectedEmp;
  

  useEffect(() => {
    getTimestamp()

    const timestampInterval = setInterval(getTimestamp, 500)

    return () => clearInterval(timestampInterval)
  }, []) 

  useEffect(() => {

    const fetchSensorData = async () => {
      let sensorData = []
      switch (timestampValue){
        case "Real-Time":
          sensorData = await fetchData()
          if (sensorData.length > 0) setLatest(sensorData)
          break
        case "5 Minutes":
          sensorData = await fetchData()
          if (sensorData.length > 0) setLatest(sensorData)
          sensorData = await fetch5mAvg()
          break
        case "1 Hour":
          sensorData = await fetchData()
          if (sensorData.length > 0) setLatest(sensorData)
          sensorData = await fetch1hrAvg()
          break
      }
  
      if (sensorData){
        setEmployeeName(sensorData[0].emp_name)
      }

      setChartsData((sensorData))
    }

    fetchSensorData()
    const fetchInterval = setInterval(fetchSensorData, 5000)

    return () => clearInterval(fetchInterval)
  }, [timestampValue, selectedEmployee]) 

  useEffect(() => {
    if (sensorState.latestPM25.value || sensorState.latestPM10.value || sensorState.latestPM25Level.value || sensorState.latestPM10Level.value){
      updateEmployeeData();
    }
  }, [sensorState.latestPM25.value, sensorState.latestPM10.value, sensorState.latestPM25Level.value, sensorState.latestPM10Level.value])

  const fetch5mAvg = async () => {
    try {
      const response = await axios.get(`https://breath-o9r9.onrender.com/api/5m_avg?employeeID=${selectedEmployee}`)
      return response.data
    } catch (error) {
      console.log(error.message) 
    }
  }

  const fetch1hrAvg = async () => {
    try {
      const response = await axios.get(`https://breath-o9r9.onrender.com/api/sensor_data/1hr_avg?employeeID=${selectedEmployee}`)
      return response.data
    } catch (error) {
      console.log(error.message) 
    }
  }

  const fetchData = async () =>{
    try {
      const response = await axios.get(`https://breath-o9r9.onrender.com/api/sensor_data?employeeID=${empSelected}`)
      return response.data
    }catch (error) {
     console.log(error.message) 
    }
  }
  
  const updateEmployeeData = async() =>{
    try {
      const response = await axios.put(`https://breath-o9r9.onrender.com/api/update_employee_data`,{
        employeeId: empSelected,
        pm25: sensorState.latestPM25.value, 
        pm10: sensorState.latestPM10.value, 
        pm25Level: sensorState.latestPM25Level.value,
        pm10Level: sensorState.latestPM10Level.value,
        latest_time: formattedTime
      })
    } catch (error) {
      console.log(error)
      console.log(error.response)
      console.log(error.response.data)
      console.log(error.response.data.error)
    }
  }

  const setLatest = (sensorData) => {
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

    console.log("latest: ", latestReading.aqi_pm25_category)
    console.log("last: ", lastReading.aqi_pm25_category)

    //console.log(latestReading.aqi_pm25_category === lastReading.aqi_pm25_category ?
    //  "" : "latest 25: " + latestReading.aqi_pm25_category +" last 25: " + lastReading.aqi_pm25_category)

    //console.log(latestReading.aqi_pm10_category === lastReading.aqi_pm10_category ?
    //  "" : "latest 10: " + latestReading.aqi_pm10_category +" last 10: " + lastReading.aqi_pm10_category)

    if (latestReading.aqi_pm25_category === lastReading.aqi_pm25_category){
      console.log("setting 25 to false")
      setNew25Alert(false)
    } else {
      console.log("setting 25 to true")
      setNew25Alert(true)
    }
    if (latestReading.aqi_pm10_category === lastReading.aqi_pm10_category) setNew10Alert(false)
      else setNew10Alert(true)
  }

  const setChartsData = (sensorData) => {

    const pmChartData = sensorData.reduce((acc, { id, pm25, pm10, timestamp }) => {
      acc.unshift({
        id,
        pm25,
        pm10,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(0, 20)
    }, [])

    setPMChartData(pmChartData)

    const aqiChartData = sensorData.reduce((acc, { id, aqi_pm25, aqi_pm10, timestamp }) => {
      acc.unshift({
        id,
        aqi_pm25,
        aqi_pm10,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(0, 20)
    }, [])

    setAQIChartData(aqiChartData)
  }

  const getTimestamp = () => {
    const timestampField = document.getElementById("time_select")
    const timestampVal = timestampField.value

    setTimestampValue(timestampVal)
  }
  
  return (
    <div className='absolute inset-0 bg-background h-screen pt-27 overflow-x-auto w-full'>
      <div className='grid grid-cols-2'>
        <NameCard employeeName={employeeName}/>
        <div className='justify-self-end align-self-center h-fit rounded-box 
                    border-black border-1 bg-skyblue text-black shadow-black/50 shadow-md
                    max-lg:mr-4'>
          <select defaultValue="Real-Time" className="select select-ghost h-16 focus:bg-transparent focus:text-black focus:rounded-box" 
                  id='time_select'>
            <option className='text-black'>Real-Time</option>
            <option className='text-black'>5 Minutes</option>
            <option className='text-black'>1 Hour</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-[30%_35%_35%] gap-4 pr-4 max-lg:grid-cols-1 '>
        <div className='ml-4 grid grid-rows-[39%_61%] gap-2'>
          <div className='grid grid-rows-2 gap-2 max-lg:grid-rows-1 max-lg:grid-cols-2 max-lg:h-fit'>
            <SensorCard label="PM 2.5" value={sensorState.latestPM25.value} latestVal={sensorState.latestPM25Level.value}/>
            <SensorCard label="PM 10" value={sensorState.latestPM10.value} latestVal={sensorState.latestPM10Level.value}/>
          </div>
          <div className='grid grid-rows-2 max-lg:grid-rows-1 max-lg:grid-cols-2 max-lg:gap-2'>
            {/* TODO: ADD CHECK IF LEVEL CHANGED */}
            <Alerts latestVal={sensorState.latestPM25Level.value} sensorType="PM 2.5" willPrint={new25Alert} setPrint={setNew25Alert}/>
            <Alerts latestVal={sensorState.latestPM10Level.value} sensorType="PM 10" willPrint={new10Alert} setPrint={setNew10Alert}/>
          </div>
        </div>
        <div className='grid grid-rows-2 gap-2 max-lg:ml-4 max-lg:grid-rows-1 max-lg:grid-cols-2'>
          <SensorChart chartData={pmChartData} title="Concentration (µg/m³)" type="concentration"/>
          <SensorChart chartData={aqiChartData} title="Air Quality Index" type="aqi"/>
        </div>
        <div className='grid grid-rows-2 gap-2 max-lg:ml-4 max-lg:grid-rows-1 max-lg:grid-cols-2'>
          {pmChartData && <Table tableData={pmChartData} title="Concentration (µg/m³)" type="concentration"/>}
          {aqiChartData && <Table tableData={aqiChartData} title="Air Quality Index" type="aqi"/>}
        </div>
      </div>
    </div>
    
  )
}

export default Main