import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

function AvgGraph({data}) {
  const groupedData = {}
  data.forEach((item) => {
    if (!groupedData[item.emp_name]) {
      groupedData[item.emp_name] = []
    }
    groupedData[item.emp_name].push(item)
  })

  console.log(groupedData)

  // Convert grouped data into array of series
  const series = Object.keys(groupedData).map((emp_name) => ({
    name: emp_name,
    data: groupedData[emp_name],
  }))

  console.log(series)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />

        {series.map((entry, index) => (
          <Line
            key={entry.name}
            type="monotone"
            dataKey="pm25"
            data={entry.data}
            name={entry.name} // Legend Name
            stroke={`hsl(${index * 60}, 70%, 50%)`} // Different colors
            dot={false} // Hide dots for cleaner lines
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default AvgGraph