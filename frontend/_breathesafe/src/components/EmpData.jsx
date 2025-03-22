import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdEdit, MdDeleteForever, MdSearch } from "react-icons/md"
import EditEmpModal from './modals/EditEmpModal'
import AddEmpModal from './modals/AddEmpModal'

function EmpData() {

  const [chartData, setChartData] = useState(null)
  const [firstData, setFirstData] = useState(null)
  const [editEmp, setEditEmp] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchData = async () => {
    try {
      const response = await axios.get('https://breath-o9r9.onrender.com/api/employee_data')

      const chartData = response.data.reduce((acc, { id, emp_id, device_id, emp_name, emp_gender, emp_age }) => {
        acc.push({
          id,
          emp_id,
          device_id,
          emp_name,
          emp_gender,
          emp_age,
        })
        return acc
      }, [])

      setChartData(chartData)
      setFirstData(chartData)

    } catch (error) {
      console.log(error.message)
    }
  }

  const addEmployee = () => {
    document.getElementById('addModal').showModal()
  }

  const openEditModal = (item) => {
    setEditEmp(item)
    document.getElementById('editModal').showModal()
  }

  const handleChangeFormData = (e) => {
    const { id, value } = e.target
    setEditEmp((prevItem) => ({
      ...prevItem,
      [id]: value,
    }))
  }

  const handleUpdateEmpInfo = async (id) => {
    try {
      await axios.put(`https://breath-o9r9.onrender.com/api/employee_data/${id}`, editEmp)
      window.confirm("Update Successful")
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddEmployee = async () => {

    const emp_name_field = document.getElementById("add_emp_name")
    const emp_id_field = document.getElementById("add_emp_id")
    const device_id_field = document.getElementById("add_device_id")
    const emp_gender_field = document.getElementById("add_emp_gender")
    const emp_age_field = document.getElementById("add_emp_age")

    const emp_name = emp_name_field.value
    const emp_id = emp_id_field.value
    const device_id = device_id_field.value
    const emp_gender = emp_gender_field.value
    const emp_age = emp_age_field.value

    const data = { emp_name, emp_id, device_id, emp_gender, emp_age }

    console.log(data)

    try {
      await axios.post(`https://breath-o9r9.onrender.com/api/employee_data/add`, data)
      const confirm = window.confirm("Added Successfully!")
      fetchData()
    } catch (error) {
      window.alert("Error adding item: " + error)
      console.log(error)
    }
  }

  const handleRemoveEmployee = async (id) => {
    const confirmDelete = window.confirm("Remove Employee?")
    if (confirmDelete) {
      try {
        await axios.delete(`https://breath-o9r9.onrender.com/api/employee_data/${id}`)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
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
      <div className='mx-5 px-[42px] pt-25 relative'>

        <div className="card card-border border-lightblack bg-skyblue w-full text-black shadow-black/50 shadow-md mt-10">
          <div className="card-body">
            <div className="h-100 overflow-x-auto w-full">
              <table className="table table-pin-rows w-screen">
                <thead>
                  <tr className='w-fit text-white bg-blue_green text-center'>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>Device ID</th>
                    <th>Employee Age</th>
                    <th>Employee Gender</th>
                    <th>Edit Data</th>
                    <th>Remove Employee</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData && Object.keys(chartData).length > 0 ? (
                    Object.keys(chartData).map((key) => {
                      const item = chartData[key]
                      return (
                        <tr key={key} className='text-center even:bg-blue_green/30'>
                          <td>{item.emp_name}</td>
                          <td>{item.emp_id}</td>
                          <td>{item.device_id}</td>
                          <td>{item.emp_age}</td>
                          <td>{item.emp_gender}</td>
                          <td>
                            <button className='btn btn-ghost text-black font-bold text-2xl 
                                        hover:bg-transparent transition duration-300 ease-in-out'
                              onClick={() => openEditModal(item)}> <MdEdit /> </button>
                          </td>
                          <td>
                            <button className='btn btn-ghost text-black font-bold text-2xl 
                                    hover:bg-transparent transition duration-300 ease-in-out'
                              onClick={() => handleRemoveEmployee(item.device_id)}><MdDeleteForever /></button>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>


        <div className='flex justify-end'>
          <button className='btn btn-warning' onClick={addUser}>Add User</button>
        </div>


        <label className="input input-bordered border-black text-black bg-background shadow-black/50 shadow-sm
                          flex w-38 items-center gap-2 absolute top-23 right-[42px]">
          <input type="search" className="grow" placeholder="Search" onChange={handleSearchChange} />
          <MdSearch />
        </label>
      </div>

      <EditEmpModal handleChangeFormData={handleChangeFormData} handleUpdateEmpInfo={handleUpdateEmpInfo} editEmp={editEmp} />

      <AddEmpModal handleAddEmployee={handleAddEmployee} />
    </div>
  )
}

export default EmpData