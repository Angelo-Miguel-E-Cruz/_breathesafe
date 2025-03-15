import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

function AvgGraph({data, unit, specimen}) {
  const transformData = (rawData) => {
    
    const uniqueTimestamps = [...new Set(rawData.map((item) => item.timestamp))].sort()

    const groupedData = {}
    rawData.forEach((item) => {
      if (!groupedData[item.emp_name]) {
        groupedData[item.emp_name] = {}
      }
      groupedData[item.emp_name][item.timestamp] = 
      unit === "µg/m³" 
        ? (specimen === "2.5" ? item.pm25 : item.pm10) 
        : (specimen === "2.5" ? item.aqi_pm25 : item.aqi_pm10);
    
    })

    const result = Object.keys(groupedData).map((emp_name) => ({
      emp_name,
      data: uniqueTimestamps.map((timestamp) => ({
        timestamp,
        chartData: groupedData[emp_name][timestamp] ?? null,
      })),
    }))

    return result
  }

  const chartData = transformData(data)
  const referenceData = chartData[0]?.data.map((d) => ({ timestamp: d.timestamp })) || []

  console.log(chartData)
  console.log(referenceData)

  return (
    <div className="card card-border bg-skyblue w-full shadow-black/50 shadow-md">
      <div className="card-body p-4 pt-5">
        <h1 className='text-lightgrey font-bold self-center text-3xl'>
          {unit === "µg/m³" 
            ? (specimen === "2.5" ? "PM2.5 Concentration" :"PM10 Concentration") 
            : (specimen === "2.5" ? "PM2.5 AQI" :"PM10 AQI")}
        </h1>
        <div className='max-h-96 overflow-y-scroll'>
          <ResponsiveContainer width="100%" height={384}>
            <LineChart data={chartData}>
              <XAxis dataKey="timestamp" />
              <YAxis domain={[0, 'dataMax']} />
              <Tooltip contentStyle={{ color: "white", backgroundColor: "black" }} />
              <Legend />

              {chartData.map((entry, index) => (
                <Line 
                  connectNulls
                  key={entry.emp_name}
                  type="monotone"
                  dataKey="chartData" 
                  data={entry.data}
                  unit={unit === "µg/m³" ? ` ${unit}` : ""}
                  name={`${entry.emp_name}`}
                  stroke={`hsl(${index * 60}, 70%, 50%)`}
                  strokeWidth={2}
                  dot={{ stroke: 'black', strokeWidth: 1, r: 1 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default AvgGraph