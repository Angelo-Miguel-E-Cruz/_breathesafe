import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

function AvgGraph({data}) {
  const transformData = (rawData) => {
    // Step 1: Extract all unique timestamps
    const uniqueTimestamps = [...new Set(rawData.map((item) => item.timestamp))].sort()

    // Step 2: Group data by emp_name
    const groupedData = {}
    rawData.forEach((item) => {
      if (!groupedData[item.emp_name]) {
        groupedData[item.emp_name] = {}
      }
      groupedData[item.emp_name][item.timestamp] = item.pm25
    })

    // Step 3: Ensure each employee has all timestamps, filling missing values with null
    const result = Object.keys(groupedData).map((emp_name) => ({
      emp_name,
      data: uniqueTimestamps.map((timestamp) => ({
        timestamp,
        pm25: groupedData[emp_name][timestamp] ?? null, // Fill missing timestamps with null
      })),
    }))

    console.log(result)
    return result
  }

  const chartData = transformData(data)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart>
        <XAxis dataKey="timestamp" />
        <YAxis domain={[0, 'dataMax']}/>
        <Tooltip />
        <Legend />

        {chartData.map((entry, index) => (
          <Line
            key={entry.name}
            type="monotone"
            dataKey="pm25" 
            data={entry.data}
            unit=" µg/m³"
            name={`${entry.name} PM 2.5 Concentration`} // Legend Name
            stroke={`hsl(${index * 60}, 70%, 50%)`} // Different colors
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default AvgGraph