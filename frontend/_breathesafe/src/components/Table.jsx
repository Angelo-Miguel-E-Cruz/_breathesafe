import React from 'react'

function Table({tableData, title, type}) {

  const newTableData = [...tableData].reverse()

  return (
    <div className="card card-border bg-skyblue w-full shadow-black/50 shadow-md">
      <div className="card-body">
        <h1 className='text-lightgrey font-bold self-center text-3xl'>{title}</h1>
        <div className="h-65 overflow-x-auto">
          <table className="table table-pin-rows">
            <thead>
              <tr className='shadow-black/50 shadow-sm w-100 bg-blue_green text-center text-white'>
                <th>Time</th>
                <th>PM 2.5</th>
                <th>PM 10</th>
              </tr>
            </thead>
            <tbody>
              {newTableData && Object.keys(newTableData).length > 0 ? (
                Object.keys(newTableData).map((key) => {
                  const item = newTableData[key];
                  return (
                    <tr key={key} className='even:bg-blue_green/10 text-center text-xs text-black'>
                      <th>{item.timestamp}</th>
                      <td>{type === "concentration" ? item.pm25 : item.aqi_pm25}</td>
                      <td>{type === "concentration" ? item.pm10 : item.aqi_pm10}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-black">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table