import React, { useEffect, useReducer, useState } from 'react'
import SensorCard from './SensorCard'
import SensorChart from './SensorChart'
import NameCard from './NameCard'
import Table from './Table'
import axios from 'axios'
import formatTimestamp from './functions/formatTimestamp'
import { useEmployee } from './contexts/EmployeeContext'
import { dataReducer, INITIAL_STATE } from './functions/dataReducer'

function Main() {

  const [sensorState, dispatch] = useReducer(dataReducer, INITIAL_STATE)
  const [pmChartData, setPMChartData] = useState(null)
  const [aqiChartData, setAQIChartData] = useState(null)
  const [pm25TableData, setPM25TableData] = useState(null)
  const [aqi25TableData, setAQI25TableData] = useState(null)
  const [pm10TableData, setPM10TableData] = useState(null)
  const [aqi10TableData, setAQI10TableData] = useState(null)
  const [employeeName, setEmployeeName] = useState("")
  const [formattedTime, setFormattedTime] = useState("")
  const [timestampValue, setTimestampValue] = useState("Real-Time")

  const role = window.localStorage.getItem("role")

  const { selectedEmployee } = useEmployee()

  let selectedEmp = role === "User" ? window.localStorage.getItem("employeeID") : selectedEmployee

  const empSelected = selectedEmp

  useEffect(() => {
    getTimestamp()

    const timestampInterval = setInterval(getTimestamp, 500)

    return () => clearInterval(timestampInterval)
  }, [])

  useEffect(() => {

    const fetchSensorData = async () => {
      let sensorData = []
      switch (timestampValue) {
        case "Real-Time":
          sensorData = await fetchData()
          if (sensorData.length > 0) setLatest(sensorData)
          break
        case "5 Minutes":
          sensorData = await fetchData()
          if (sensorData.length > 0) setLatest(sensorData)
          sensorData = await fetch5mAvg()
          break
      }

      if (sensorData) {
        setEmployeeName(sensorData[0].emp_name)
      }

      setChartsData((sensorData))
    }

    fetchSensorData()
    const fetchInterval = setInterval(fetchSensorData, 5000)

    return () => clearInterval(fetchInterval)
  }, [timestampValue, selectedEmployee])

  useEffect(() => {
    if (sensorState.latestPM25.value || sensorState.latestPM10.value || sensorState.latestPM25Level.value || sensorState.latestPM10Level.value) {
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

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://breath-o9r9.onrender.com/api/sensor_data?employeeID=${empSelected}`)
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  const updateEmployeeData = async () => {
    try {
      const response = await axios.put(`https://breath-o9r9.onrender.com/api/update_employee_data`, {
        employeeId: empSelected,
        pm25: sensorState.latestPM25.value,
        pm10: sensorState.latestPM10.value,
        pm25Level: sensorState.latestPM25Level.value,
        pm10Level: sensorState.latestPM10Level.value,
        latest_time: formattedTime
      })
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const setLatest = (sensorData) => {
    const latestReading = sensorData[0]
    setFormattedTime(formatTimestamp(latestReading.timestamp))
    dispatch({ type: "UPDATE", field: "latestPM25", value: latestReading.pm25, timestamp: latestReading.timestamp })
    dispatch({ type: "UPDATE", field: "latestPM10", value: latestReading.pm10, timestamp: latestReading.timestamp })
    dispatch({ type: "UPDATE", field: "latestPM25AQI", value: latestReading.aqi_pm25, timestamp: latestReading.timestamp })
    dispatch({ type: "UPDATE", field: "latestPM10AQI", value: latestReading.aqi_pm10, timestamp: latestReading.timestamp })
    dispatch({ type: "UPDATE", field: "latestPM25Level", value: latestReading.aqi_pm25_category, timestamp: latestReading.timestamp })
    dispatch({ type: "UPDATE", field: "latestPM10Level", value: latestReading.aqi_pm10_category, timestamp: latestReading.timestamp })

    const lastReading = sensorData[1]
    dispatch({ type: "UPDATE", field: "lastPM25", value: lastReading.pm25, timestamp: lastReading.timestamp })
    dispatch({ type: "UPDATE", field: "lastPM10", value: lastReading.pm10, timestamp: lastReading.timestamp })
    dispatch({ type: "UPDATE", field: "lastPM25Level", value: lastReading.aqi_pm25_category, timestamp: lastReading.timestamp })
    dispatch({ type: "UPDATE", field: "lastPM10Level", value: lastReading.aqi_pm10_category, timestamp: lastReading.timestamp })
  }

  const setChartsData = (sensorData) => {

    const pmChartData = sensorData.reduce((acc, { id, pm25, pm10, aqi_pm25_category, aqi_pm10_category, timestamp }) => {
      acc.unshift({
        id,
        pm25,
        pm10,
        aqi_pm25_category,
        aqi_pm10_category,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(0, 20)
    }, [])

    setPMChartData(pmChartData)

    const pm25TableData = sensorData.reduce((acc, { id, pm25, aqi_pm25_category, timestamp }) => {
      acc.unshift({
        id,
        pm25,
        category: aqi_pm25_category,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(0, 20)
    }, [])

    setPM25TableData(pm25TableData)

    const pm10TableData = sensorData.reduce((acc, { id, pm10, aqi_pm10_category, timestamp }) => {
      acc.unshift({
        id,
        pm10,
        category: aqi_pm10_category,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(0, 20)
    }, [])

    setPM10TableData(pm10TableData)

    const aqiChartData = sensorData.reduce((acc, { id, aqi_pm25, aqi_pm10, aqi_pm25_category, aqi_pm10_category, timestamp }) => {
      acc.unshift({
        id,
        aqi_pm25,
        aqi_pm10,
        aqi_pm25_category,
        aqi_pm10_category,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(0, 20)
    }, [])

    setAQIChartData(aqiChartData)

    const aqi25TableData = sensorData.reduce((acc, { id, aqi_pm25, timestamp }) => {
      acc.unshift({
        id,
        aqi_pm25,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(0, 20)
    }, [])

    setAQI25TableData(aqi25TableData)

    const aqi10TableData = sensorData.reduce((acc, { id, aqi_pm10, timestamp }) => {
      acc.unshift({
        id,
        aqi_pm10,
        timestamp: formatTimestamp(timestamp),
      })
      return acc.slice(0, 20)
    }, [])

    setAQI10TableData(aqi10TableData)
  }

  const getTimestamp = () => {
    const timestampField = document.getElementById("time_select")
    const timestampVal = timestampField.value

    setTimestampValue(timestampVal)
  }

  return (
    <div className='absolute inset-0 bg-background h-screen pt-30 pb-4 px-[42px] overflow-y-scroll w-full'>
      <div className='grid grid-cols-2 mb-5' >
        <NameCard employeeName={employeeName} />
        <div className='justify-self-end align-self-center h-fit rounded-box border-lightblack border-1 bg-sky_blue text-black shadow-black/50 shadow-md max-lg:mr-4'>
          <select defaultValue="Real-Time" className="select select-ghost h-10 w-38 bg-sky_blue focus:bg-transparent focus:text-black focus:rounded-box focus-within:outline-0" id='time_select'>
            <option className='text-black mt-2.5 hover:bg-sky_blue'>Real-Time</option>
            <option className='text-black hover:bg-sky_blue'>5 Minutes</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-[55%_45%] gap-4 pr-4'>
        <div className='grid grid-rows-2 gap-4 max-lg:grid-rows-1 max-lg:grid-cols-2'>
          <SensorChart chartData={pmChartData} title="Concentration (µg/m³)" type="concentration" />
          <SensorChart chartData={aqiChartData} title="Air Quality Index" type="aqi" />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='grid grid-rows-[14%_43%_43%] gap-4'>
            <SensorCard label="PM 2.5" value={sensorState.latestPM25.value} latestVal={sensorState.latestPM25Level.value} latestReading={sensorState.latestPM25.value} lastReading={sensorState.lastPM25.value} />
            {pm25TableData && <Table tableData={pm25TableData} title="Concentration (µg/m³)" type="concentration" specimen="PM 2.5" />}
            {aqi25TableData && <Table tableData={aqi25TableData} title="Air Quality Index" type="aqi" specimen="PM 2.5" />}
          </div>

          <div className='grid grid-rows-[14%_43%_43%] gap-4'>
            <SensorCard label="PM 10" value={sensorState.latestPM10.value} latestVal={sensorState.latestPM10Level.value} latestReading={sensorState.latestPM10.value} lastReading={sensorState.lastPM10.value} />
            {pm10TableData && <Table tableData={pm10TableData} title="Concentration (µg/m³)" type="concentration" specimen="PM 10" />}
            {aqi10TableData && <Table tableData={aqi10TableData} title="Air Quality Index" type="aqi" specimen="PM 10" />}
          </div>
        </div>
      </div>
    </div>

  )
}

export default Main