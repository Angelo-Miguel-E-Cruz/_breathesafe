import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

function AvgGraph({data, unit, specimen}) {
  const transformData = (rawData) => {
    // Step 1: Extract all unique timestamps
    const uniqueTimestamps = [...new Set(rawData.map((item) => item.timestamp))].sort()

    // Step 2: Group data by emp_name
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

    // Step 3: Ensure each employee has all timestamps, filling missing values with null
    const result = Object.keys(groupedData).map((emp_name) => ({
      emp_name,
      data: uniqueTimestamps.map((timestamp) => ({
        timestamp,
        chartData: groupedData[emp_name][timestamp] ?? null,
      })),
    }))

    console.log(result)
    return result
  }

  const chartData = transformData(data)
  const referenceData = chartData[0]?.data.map((d) => ({ timestamp: d.timestamp })) || []
  console.log(referenceData)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={referenceData}>
        <XAxis dataKey="timestamp" />
        <YAxis domain={[0, (dataMax) => dataMax + 1]} />
        <Tooltip contentStyle={{ color: "white", backgroundColor: "black" }} />
        <Legend />

        {chartData.map((entry, index) => (
          <Line 
            connectNulls
            key={entry.emp_name}
            type="monotone"
            dataKey="chartData" 
            data={entry.data}
            unit={unit === "µg/m³" ? unit : ""}
            name={`${entry.emp_name}`} // Legend Name
            stroke={`hsl(${index * 60}, 70%, 50%)`} // Different colors
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default AvgGraph