import React, { useState, useEffect } from 'react'
import Main from './components/Main'
import Records from './components/Records'
import AllData from './components/AllData'
import AccountSettings from './components/AccountSettings'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import { EmployeeProvider } from './components/contexts/EmployeeContext'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

function App() {
  
  const [isAuthenticated, setIsAuthenticated]  = useState()
  const role  = window.localStorage.getItem("role")

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    setIsAuthenticated(!!token)
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
              <Route path="/records" element={role === "Admin" ? <Records setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
              <Route path="/settings" element={role === "Admin" ? <AccountSettings setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
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