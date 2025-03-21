import React from 'react'

function Table({ tableData, title, type, specimen }) {

  const newTableData = [...tableData].reverse()

  return (
    <div className="card card-border border-lightblack bg-skyblue w-full shadow-black/50 shadow-md">
      <div className="card-body">
        <h1 className='text-lightgrey font-bold self-center text-[23px] text-center'>{title}</h1>
        <div className="h-65 overflow-x-auto w-full">
          <table className="table table-pin-rows">
            <thead>
              <tr className='w-100 bg-blue_green text-center text-white'>
                <th>Time</th>
                <th>{specimen}</th>
              </tr>
            </thead>
            <tbody>
              {newTableData && Object.keys(newTableData).length > 0 ? (
                Object.keys(newTableData).map((key) => {
                  const item = newTableData[key];
                  return (
                    <tr key={key} className='even:bg-blue_green/10 text-center text-xs text-black'>
                      <th>{item.timestamp}</th>
                      <td>
                        {type === "concentration"
                          ? specimen === "PM 2.5"
                            ? item.pm25
                            : item.pm10
                          : specimen === "PM 2.5"
                            ? item.aqi_pm25
                            : item.aqi_pm10}
                      </td>

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