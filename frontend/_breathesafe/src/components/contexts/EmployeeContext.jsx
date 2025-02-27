import { createContext, useState, useContext, useEffect } from "react"
import axios from 'axios'

const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {
  const [selectedEmployee, setSelectedEmployee] = useState("1") // TODO: CHANGE BASED ON COMPANY OR MAKE DYNAMIC

  // TODO: FIX THIS  to make dynamic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://breath-o9r9.onrender.com/api/sensor_data/all`)
        const firstData = response.data
        //setSelectedEmployee(firstData[0].emp_id)
      } catch (error) {
        console.log(error.message) 
      }
    }
    fetchData()
  })

  return (
    <EmployeeContext.Provider value={{ selectedEmployee, setSelectedEmployee }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployee = () => useContext(EmployeeContext)
