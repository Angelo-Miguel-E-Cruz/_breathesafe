import { createContext, useState, useContext } from "react"

const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {
  const [selectedEmployee, setSelectedEmployee] = useState("1")

  return (
    <EmployeeContext.Provider value={{ selectedEmployee, setSelectedEmployee }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployee = () => useContext(EmployeeContext)
