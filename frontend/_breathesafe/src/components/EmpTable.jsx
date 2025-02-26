import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdRemoveRedEye , MdEdit , MdPerson } from "react-icons/md"
import { useEmployee } from './contexts/EmployeeContext'
import { Link } from 'react-router-dom'

function EmpTable() {

  const [chartData, setChartData] = useState(null)
  const [editEmp, setEditEmp] = useState(null)
  const { setSelectedEmployee } = useEmployee()

  
  const editData = (item) => {
    setEditEmp(item)
    document.getElementById('editModal').showModal()
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setEditEmp((prevItem) => ({
      ...prevItem,
      [id]: value,
    }))
  }

  const handleSelect = (employeeId) => {
    setSelectedEmployee(employeeId)
  }

  const handleUpdate = async(id) => {
    try {
      await axios.put(`https://breath-o9r9.onrender.com/api/employee_data/${id}`, editEmp)
      window.confirm("Update Successful")
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await axios.get('https://breath-o9r9.onrender.com/api/employee_data')
     
        const chartData = response.data.reduce((acc, { id, emp_id, device_id, emp_name, emp_gender, emp_age, latest_25, latest_10, latest_aqi_25, latest_aqi_10, latest_time }) => {
          acc.push({
            id,
            emp_id, 
            device_id, 
            emp_name, 
            emp_gender, 
            emp_age, 
            latest_25, 
            latest_10, 
            latest_aqi_25, 
            latest_aqi_10,
            timestamp: latest_time,
          })
          return acc
        }, [])

        setChartData(chartData)

      }catch (error) {
        console.log(error.message) 
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <div className='mx-5'>
        <div className="card card-border bg-skyblue w-full text-black shadow-black/50 shadow-md mt-25">
          <div className="card-body">
            <div className="h-90 overflow-x-auto w-full">
              <table className="table table-pin-rows w-screen">
                <thead>
                  <tr className='shadow-black/50 shadow-sm w-fit text-white bg-blue_green text-center'>
                    <th>Select Employee</th>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>Device ID</th>
                    <th>Employee Age</th>
                    <th>Employee Gender</th>
                    <th>Latest PM 2.5 Reading</th>
                    <th>Latest PM 10 Reading</th>
                    <th>Latest PM 2.5 AQI Level</th>
                    <th>Latest PM 10 AQI Level</th>
                    <th>Timestamp</th>
                    <th>View/Edit Data</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData && Object.keys(chartData).length > 0 ? (
                    Object.keys(chartData).map((key) => {
                      const item = chartData[key]
                      return (
                        <tr key={key} className='text-center w-fit even:bg-blue_green/30'>
                          <td>
                          <Link to='/' className='btn btn-ghost text-black font-bold text-3xl hover:bg-transparent transition duration-300 ease-in-out' onClick={() => handleSelect(item.emp_id)}><MdPerson  /></Link>
                          </td>
                          <td>{item.emp_name}</td>
                          <td>{item.emp_id}</td>
                          <td>{item.device_id}</td>
                          <td>{item.emp_age}</td>
                          <td>{item.emp_gender}</td>
                          <td>{item.latest_25} µg/m³</td>
                          <td>{item.latest_10} µg/m³</td>
                          <td>{item.latest_aqi_25}</td>
                          <td>{item.latest_aqi_10}</td>
                          <td>{item.timestamp}</td>
                          <td className='flex align-middle gap-1'>
                              <button className='btn btn-ghost text-black font-bold text-2xl hover:bg-transparent transition duration-300 ease-in-out' onClick={() => editData(item)}><MdEdit /></button>
                              <button className='btn btn-ghost text-black font-bold text-2xl hover:bg-transparent transition duration-300 ease-in-out' ><MdRemoveRedEye  /></button>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <dialog id="editModal" className="modal">
        <div className="modal-box bg-background text-black border-black border-1">
          <h3 className="font-bold text-lg mb-5">Edit Employee Data</h3>

          <label className="input input-bordered bg-background my-1 border-black"> Employee Name
            <input type="text" className="grow" id='emp_name' value={editEmp?.emp_name || ""} onChange={handleChange} />
          </label>
 
          <label className="input input-bordered bg-background my-1 border-black"> Employee ID
            <input type="text" className="grow" id='emp_id' value={editEmp?.emp_id || ""} onChange={handleChange} />
          </label>

          <label className="input input-bordered bg-background my-1 border-black"> Device ID
            <input type="text" className="grow" id='device_id' value={editEmp?.device_id || ""} onChange={handleChange} />
          </label>

          <label className="input input-bordered bg-background my-1 border-black"> Employee Gender
            <input type="text" className="grow" id='emp_gender' value={editEmp?.emp_gender || ""} onChange={handleChange} />
          </label>

          <label className="input input-bordered bg-background my-1 border-black"> Employee Age
            <input type="number" min="0" className="grow" id='emp_age' value={editEmp?.emp_age || ""} onChange={handleChange} />
          </label>
        
          <div className="modal-action justify-start  ">
            <form method="dialog">
            <button className='btn rounded-xl bg-darkblue hover:bg-blue_green mr-2' onClick={() => handleUpdate(editEmp.id)}>Confirm</button>
              <button className="btn rounded-xl bg-darkblue hover:bg-blue_green">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default EmpTable