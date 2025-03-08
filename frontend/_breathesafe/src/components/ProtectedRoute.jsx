import React from 'react'
import { Navigate } from 'react-router-dom'
import Layout from './Layout'

function ProtectedRoute({setAuth, role}) {
  const isAuthenticated  = !!window.localStorage.getItem("token")
  return isAuthenticated ? <Layout setAuth={setAuth} role={role}/> : <Navigate to="/login"/>
}

export default ProtectedRoute