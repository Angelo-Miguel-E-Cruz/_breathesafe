import React from 'react'

function AvgTable({data, unit, specimen}) {
  const transformToTableFormat = (rawData) => {
    // Step 1: Get unique timestamps (sorted)
    const uniqueTimestamps = [...new Set(rawData.map((item) => item.timestamp))].sort();
  
    // Step 2: Get unique employee names (sorted for consistent order)
    const uniqueEmployees = [...new Set(rawData.map((item) => item.emp_name))].sort();
  
    // Step 3: Create table rows, filling missing values with null
    const tableData = uniqueTimestamps.map((timestamp) => {
      let row = { timestamp };
      uniqueEmployees.forEach((emp) => {
        // Find the record for this employee at this timestamp
        const record = rawData.find((item) => item.emp_name === emp && item.timestamp === timestamp);
        row[emp] = record ? record.pm25 : null;
      });
      return row;
    });

    console.log("tableData: ", tableData)
    console.log("uniqueEmployees: ", uniqueEmployees)
  
    return { tableData, uniqueEmployees };
  }

  const { tableData, uniqueEmployees } = transformToTableFormat(data)

  return (
    <div className="card card-border bg-skyblue w-full shadow-black/50 shadow-md">
      <div className="card-body p-2 pt-5">
        <table className="table table-pin-rows">
          <thead>
            <tr className='shadow-black/50 shadow-sm w-100 bg-blue_green text-center text-white'>
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
  )
}

export default AvgTable