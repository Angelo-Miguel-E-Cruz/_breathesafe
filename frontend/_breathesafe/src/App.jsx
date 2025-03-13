import React, { useState, useEffect } from 'react'
import Main from './components/Main'
import EmpTable from './components/EmpTable'
import AllData from './components/AllData'
import EmpData from './components/EmpData'
import UserData from './components/UserData'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import { EmployeeProvider } from './components/contexts/EmployeeContext'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import * as timer from './components/functions/timer'

function App() {
  
  const [isAuthenticated, setIsAuthenticated]  = useState()
  const role  = window.localStorage.getItem("role")

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    setIsAuthenticated(!!token)
    
    timer.startLoopingCountdown(300, timer.onTimerEnd) // Get 5 minutes average
    timer.startLoopingCountdown(3600, timer.onTimerEnd) // Get 1 hour average
  },[])

  return (
    <main>
      <EmployeeProvider>
        <BrowserRouter>
          <Routes>
            {!isAuthenticated && (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Navigate to="/" />} />
              </>
            )}

            <Route element={<ProtectedRoute setAuth={setIsAuthenticated} role={role}/>}>
              <Route path="/" element={role === "Admin" ? <Navigate to="/admin"/> : 
                                      <Navigate to="/dashboard"/>} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/admin" element={role === "Admin" ? <Main setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
              <Route path="/admin/all" element={role === "Admin" ? <AllData setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
              <Route path="/records" element={role === "Admin" ? <EmpTable setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
              <Route path="/employees" element={role === "Admin" ? <EmpData setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
              <Route path="/users" element={role === "Admin" ? <UserData setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
              <Route path="/dashboard" element={role === "User" ? <Main setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </EmployeeProvider>
    </main>
  )
}

export default App