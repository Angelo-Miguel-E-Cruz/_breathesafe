import React from 'react'

function AvgTable({data, unit, specimen}) {
  const transformToTableFormat = (rawData) => {

    const uniqueTimestamps = [...new Set(rawData.map((item) => item.timestamp))].sort()
  
    const uniqueEmployees = [...new Set(rawData.map((item) => item.emp_name))].sort()
  
    const tableData = uniqueTimestamps.map((timestamp) => {
      let row = { timestamp }
      uniqueEmployees.forEach((emp) => {
        
        const record = rawData.find((item) => item.emp_name === emp && item.timestamp === timestamp)
        row[emp] = record 
          ? (unit === "µg/m³" 
              ? (specimen === "2.5" ? record.pm25 : record.pm10) 
              : (specimen === "2.5" ? record.aqi_pm25 : record.aqi_pm10)
            ) 
          : null
      })
      return row
    }).reverse()
  
    return { tableData, uniqueEmployees }
  }

  const { tableData, uniqueEmployees } = transformToTableFormat(data)

  return (
    <div className="card card-border border-lightblack bg-skyblue w-full shadow-black/50 shadow-md">
      <div className="card-body p-4 pt-5">
        <h1 className='text-lightgrey font-bold self-center text-3xl'>
          {unit === "µg/m³" 
            ? (specimen === "2.5" ? "PM2.5 Concentration" :"PM10 Concentration") 
            : (specimen === "2.5" ? "PM2.5 AQI" :"PM10 AQI")}
        </h1>
        <div className='max-h-96 overflow-y-scroll'>
          <table className="table table-pin-rows">
            <thead>
              <tr className='w-100 bg-blue_green text-center text-white'>
                {uniqueEmployees.map((emp) => (
                  <th key={emp}>{emp}</th>
                ))}
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className='even:bg-blue_green/10 text-center text-black'>
                  {uniqueEmployees.map((emp) => (
                    <td key={emp}>{row[emp] !== null ? row[emp] : "null"}</td>
                  ))}
                  <td>{row.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AvgTable