import React from 'react'
import Layout from './components/Layout'
import Main from './components/Main'
import Records from './components/Records'
import AllData from './components/AllData'
import { EmployeeProvider } from './components/contexts/EmployeeContext'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <main>
      <EmployeeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="records" element={<Records />} />
              <Route path="all" element={<AllData />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </EmployeeProvider>
    </main>
  )
}

export default App