import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdEdit , MdDeleteForever, MdSearch  } from "react-icons/md"
import EditEmpModal from './modals/EditEmpModal'

function UserData() {
  
  const [chartData, setChartData] = useState(null)
  const [firstData, setFirstData] = useState(null)
  const [editEmp, setEditEmp] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchData = async () => {
    try {
      const response = await axios.get('https://breath-o9r9.onrender.com/api/users')

      const chartData = response.data.result.reduce((acc, { user_id, user_name, user_role}) => {
        acc.push({
          id: user_id,
          name: user_name, 
          role: user_role
        })
        return acc
      }, [])

      setChartData(chartData)
      setFirstData(chartData)

    }catch (error) {
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

  const handleUpdateEmpInfo = async(id) => {
    try {
      await axios.put(`https://breath-o9r9.onrender.com/api/employee_data/${id}`, editEmp)
      window.confirm("Update Successful")
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddEmployee = async() => {

    const user_name_field = document.getElementById("add_user_name")
    const user_password_field = document.getElementById("add_user_password")
    const user_role_field = document.getElementById("add_user_role")
    
    const name = user_name_field.value
    const password = user_password_field.value
    const role = user_role_field.value

    const data = {name, password, role}

    try {
      await axios.post(`https://breath-o9r9.onrender.com/auth/register`, data)
      const confirm = window.confirm("Added Successfully!")
      fetchData()
    }catch (error) {
      window.alert("Error adding item: " + error)
      console.log(error)
    }
  }

  const handleRemoveUser = async (id) => {
    const confirmDelete = window.confirm("Delete this item?")
    if (confirmDelete){
      try {
        await axios.delete(`https://breath-o9r9.onrender.com/api/users/${id}`)
      }catch (error) {
        console.log(error)
      }
    }
    fetchData()
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
                  <tr className='shadow-black/50 shadow-sm w-fit text-white bg-blue_green text-center z-10'>
                    <th>User Name</th>
                    <th>User Role</th>
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
                          <td>{item.name}</td>
                          <td>{item.role}</td>
                          <td>
                              <button className='btn btn-ghost text-black font-bold text-2xl 
                                        hover:bg-transparent transition duration-300 ease-in-out' 
                                        onClick={() => openEditModal(item)}> <MdEdit/> </button>
                          </td>
                          <td>
                            <button className='btn btn-ghost text-black font-bold text-2xl 
                                    hover:bg-transparent transition duration-300 ease-in-out' 
                                    onClick={() => handleRemoveUser(item.id)}><MdDeleteForever /></button>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <button className='btn btn-warning' onClick={addEmployee}>Add Employee</button>

        <label className="input input-bordered border-black text-black bg-background shadow-black/50 shadow-sm
                          flex items-center gap-2 absolute top-23 right-0">
          <input type="search" className="grow" placeholder="Search" onChange={handleSearchChange} />
          <MdSearch />
        </label>
      </div>

      <EditEmpModal handleChangeFormData={handleChangeFormData} handleUpdateEmpInfo={handleUpdateEmpInfo} editEmp={editEmp} />

      <dialog id="addModal" className="modal">
        <div className="modal-box bg-background text-black border-black border-1">
          <h3 className="font-bold text-lg mb-5">Add User</h3>

          <label className="input input-bordered bg-background my-1 border-black"> Name
            <input type="text" className="grow" id='add_user_name'/>
          </label>

          <label className="input input-bordered bg-background my-1 border-black"> Password
            <input type={showPassword ? "text" : "password"} className="grow" id='add_user_password'/>
          </label>        
          
          <label className="fieldset-label my-1 text-black">
            <input type="checkbox" className="checkbox rounded-none text-black border-black" onChange={() => setShowPassword(!showPassword)}/>
            Show Password
          </label>

          <label className="input input-bordered bg-background my-1 border-black"> User Role
            <select defaultValue="User" className="select bg-transparent" id='add_user_role'>
              <option>User</option>
              <option>Admin</option>
            </select>
          </label>
          
          <div className="modal-action justify-start">
            <form method="dialog">
            <button className='btn rounded-xl bg-darkblue hover:bg-blue_green mr-2' onClick={() => handleAddEmployee()}>Confirm</button>
              <button className="btn rounded-xl bg-darkblue hover:bg-blue_green">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default UserData