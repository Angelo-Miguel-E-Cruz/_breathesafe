import React, { useEffect, useState } from 'react'
import axios from 'axios'
import clsx from 'clsx'
import { MdPerson, MdSearch  } from "react-icons/md"
import { useEmployee } from './contexts/EmployeeContext'
import { Link } from 'react-router-dom'

function EmpTable() {
  const [chartData, setChartData] = useState(null)
  const [firstData, setFirstData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { selectedEmployee, setSelectedEmployee } = useEmployee()

  const fetchData = async () => {
    try {
      const response = await axios.get('https://breath-o9r9.onrender.com/api/employee_data')
   
      const chartData = response.data.reduce((acc, { id, emp_id, device_id, emp_name, latest_25, latest_10, latest_aqi_25, latest_aqi_10, latest_time }) => {
        acc.push({
          id,
          emp_id, 
          device_id,
          emp_name, 
          latest_25, 
          latest_10, 
          latest_aqi_25, 
          latest_aqi_10,
          timestamp: latest_time,
        })
        return acc
      }, [])

      setChartData(chartData)
      setFirstData(chartData)

    }catch (error) {
      console.log(error.message) 
    }
  }

  const handleSelect = (employeeId) => {
    setSelectedEmployee(employeeId)
  }

  const handleSearchChange = (e) =>{
    setSearchTerm(e.target.value)
  }

  useEffect(() =>{
    fetchData()
  }, [])
  
  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        if (!searchTerm) {
          setChartData(firstData)
        } else {
          const response = await axios.get(
            `https://breath-o9r9.onrender.com/api/employee_data/search?q=${searchTerm}`
          )
          setChartData(response.data)
        }
      } catch (error) {
        console.error('Error fetching filtered data:', error)
      }
    }
  
    fetchFilteredData()
  }, [searchTerm])

  return (
    <div className='absolute inset-0 bg-background min-h-screen overflow-auto pt-5'>
      <div className='mx-5 pt-25 relative'>
        
        <div className="card card-border bg-skyblue w-full text-black shadow-black/50 shadow-md mt-10">
          <div className="card-body">
            <div className="h-100 overflow-x-auto w-full">
              <table className="table table-pin-rows w-screen">
                <thead>
                  <tr className='shadow-black/50 shadow-sm w-fit text-white bg-blue_green text-center'>
                    <th>Select Employee</th>
                    <th>Employee Name</th>
                    <th>Device ID</th>
                    <th>Latest PM 2.5 Reading</th>
                    <th>Latest PM 10 Reading</th>
                    <th>Latest PM 2.5 AQI Level</th>
                    <th>Latest PM 10 AQI Level</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData && Object.keys(chartData).length > 0 ? (
                    Object.keys(chartData).map((key) => {
                      const item = chartData[key]
                      return (
                        <tr key={key} className='text-center even:bg-blue_green/30'>
                          <td>
                            <Link to='/' className={clsx(`btn btn-ghost transition duration-300 ease-in-out w-12 p-0
                                          rounded-full bg-transparent border-black border-1 text-black text-3xl
                                          avatar before:w-[25%] before:h-[25%] before:right-[6%]`,
                                        {
                                          'avatar-online' : Number(selectedEmployee) === Number(item.id),
                                          'avatar-offline before:bg-grey' : Number(selectedEmployee) !== Number(item.id)
                                        })} 
                                          onClick={() => handleSelect(item.device_id)}>
                              <MdPerson/>
                            </Link>
                          </td>
                          <td>{item.emp_name}</td>
                          <td>{item.device_id}</td>
                          <td>{item.latest_25} µg/m³</td>
                          <td>{item.latest_10} µg/m³</td>
                          <td>{item.latest_aqi_25}</td>
                          <td>{item.latest_aqi_10}</td>
                          <td>{item.timestamp}</td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <label className="input input-bordered border-black text-black bg-background shadow-black/50 shadow-sm
                          flex items-center gap-2 absolute top-23 right-0">
          <input type="search" className="grow" placeholder="Search" onChange={handleSearchChange} />
          <MdSearch />
        </label>
      </div>
    </div>
  )
}

export default EmpTable