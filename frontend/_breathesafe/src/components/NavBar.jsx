import React, { useState } from 'react'
import Clock from './Clock'
import clsx from 'clsx'
import { NavLink, useLocation } from 'react-router-dom'
import { RiHome9Fill } from "react-icons/ri"
import { IoNewspaper, IoBarChartSharp } from "react-icons/io5"
import { RiSurgicalMaskFill } from "react-icons/ri"
import { GiHamburgerMenu } from "react-icons/gi"
import { MdManageAccounts, MdLogout, MdDashboard } from "react-icons/md"

function NavBar({ role, setAuth }) {
  const data = [
    { "id": 0, "PM25": "0.0 - 9.0", "PM10": "0 - 54", "AQI": "0 - 50", "Category": "Good" },
    { "id": 1, "PM25": "9.1 - 35.4", "PM10": "55 - 154", "AQI": "51 - 100", "Category": "Moderate" },
    { "id": 2, "PM25": "35.5 - 55.4", "PM10": "155 - 254", "AQI": "101 - 150", "Category": "Unhealthy for Sensitive Groups" },
    { "id": 3, "PM25": "55.5 - 125.4", "PM10": "255 - 354", "AQI": "151 - 200", "Category": "Unhealthy" },
    { "id": 4, "PM25": "125.5 - 225.4", "PM10": "355 - 424+", "AQI": "201 - 300", "Category": "Very Unhealthy" },
    { "id": 5, "PM25": "225.5+", "PM10": "425+", "AQI": "301+", "Category": "Hazardous" }
  ]

  const [isOpen, setIsOpen] = useState(false)

  const logOut = () => {
    localStorage.removeItem("role")
    localStorage.removeItem("token")
    localStorage.removeItem("employeeID")
    setAuth(false)
  }

  const location = useLocation()
  const dashboardIsActive = ["/admin", "/all"].includes(location.pathname)
  const optionsIsActive = ["/users", "/employees", "/records"].includes(location.pathname)

  console.log(dashboardIsActive)
  console.log(optionsIsActive)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex navbar pl-0 pt-0 sticky top-0 z-10 mt-1.5 mx-2.5 w-[98.5%] h-24 bg-darkblue text-white rounded-2xl shadow-black/50 shadow-md">
      <div className="navbar-start mt-2.5">
        <img src='longlogo.png' />
        <div className='flex flex-col pl-7'>
          <a className="font-bold text-2xl ml-2">Air Quality Monitor</a>
          <Clock />
        </div>

      </div>

      <div className="navbar-end">
        <div className='flex flex-row mr-1 items-center'>
          {/* Info Modal */}
          <div className="dropdown dropdown-end z-20">
            <div tabIndex={0} onClick={() => toggleModal()} role="button" className={clsx(`btn rounded-full w-8 h-8 text-lg center mr-[15px] shadow-black/50 shadow-md border-white border-2
            hover:bg-white hover:border-blue_green hover:text-blue_green transition duration-300 ease-in-out`,
              {
                'bg-blue_green': !isOpen,
                'bg-darkblue': isOpen
              })}>
              i
            </div>
            <div className="dropdown-content bg-darkblue border-black w-96 border-1 p-4">
              <h3 className="font-semibold text-[10px] text-white mb-5">Category</h3>
              <table className="table rounded-2xl">
                <thead>
                  <tr className='bg-blue_green font-semibold text-white text-center border-black border-0 border-b-1 text-[10px] px-3 py-2.5'>
                    <th className='px-3 py-2.5'>PM 2.5</th>
                    <th className='px-3 py-2.5'>PM 10</th>
                    <th className='px-3 py-2.5'>AQI</th>
                    <th className='px-3 py-2.5'>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}
                      className={`
                      ${item.Category === "Good" ? "bg-green-600" :
                          item.Category === "Moderate" ? "bg-amber-300" :
                            item.Category === "Unhealthy for Sensitive Groups" ? "bg-orange-600" :
                              item.Category === "Unhealthy" ? "bg-red-700" :
                                item.Category === "Very Unhealthy" ? "bg-pink-900" :
                                  item.Category === "Hazardous" ? "bg-red-950" :
                                    "bg-white"}
                      text-[10px] font-semibold
                    `}>
                      <td className='w-30 px-3 py-2.5 text-center'>{item.PM25}</td>
                      <td className='w-30 px-3 py-2.5 text-center'>{item.PM10}</td>
                      <td className='w-30 px-3 py-2.5 text-center'>{item.AQI}</td>
                      <td className='w-50 px-3 py-2.5 text-center'>{item.Category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dashboard/Home Button */}
          {role === "Admin" ?
            <div className="dropdown dropdown-end z-20">
              <div tabIndex={0} role="button" className={clsx('btn rounded-xl border-0 shadow-none mr-2 transition duration-300 ease-in-out', {
                'bg-blue_green': dashboardIsActive,
                'bg-darkblue': !dashboardIsActive
              })}>
                <MdDashboard /> Dashboard
              </div>
              <ul tabIndex={0}
                className="menu menu-sm dropdown-content bg-darkblue rounded-box z-1 mt-1 w-52 p-2 shadow-black/50 shadow-md">
                <li>
                  <NavLink to="/admin" className={({ isActive }) =>
                    isActive ? 'bg-blue_green' : 'bg-darkblue hover:bg-white/20'}>
                    <RiHome9Fill /> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/all" className={({ isActive }) =>
                    isActive ? 'bg-blue_green' : 'bg-darkblue hover:bg-white/20'}>
                    <IoBarChartSharp /> All Data
                  </NavLink>
                </li>
              </ul>
            </div>
            : <></>
          }

          {/* Options Button */}
          {role === "Admin" ?
            <div className="dropdown dropdown-end z-20">
              <div tabIndex={0} role="button" className={clsx('btn rounded-xl border-0 shadow-none mr-2 transition duration-300 ease-in-out', {
                'bg-blue_green': optionsIsActive,
                'bg-darkblue': !optionsIsActive
              })}>
                <GiHamburgerMenu /> Options
              </div>
              <ul tabIndex={0}
                className="menu menu-sm dropdown-content bg-darkblue rounded-box z-20 mt-1 w-52 p-2 shadow-black/50 shadow-md">
                <li>
                  <NavLink to="/records" className={({ isActive }) =>
                    isActive ? 'bg-blue_green' : 'bg-darkblue hover:bg-white/20'}>
                    <IoNewspaper /> Records
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/employees" className={({ isActive }) =>
                    isActive ? 'bg-blue_green' : 'bg-darkblue hover:bg-white/20'}>
                    <RiSurgicalMaskFill /> Manage Employees
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/users" className={({ isActive }) =>
                    isActive ? 'bg-blue_green' : 'bg-darkblue hover:bg-white/20'}>
                    <MdManageAccounts /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <button onClick={() => logOut()} className='bg-darkblue hover:bg-white/20'>
                    <MdLogout /> Logout
                  </button>
                </li>
              </ul>
            </div>
            :
            <button onClick={() => logOut()} className='btn rounded-xl mr-2 bg-blue_green shadow-black/50 shadow-md transition duration-300 ease-in-out hover:bg-darkblue_green'>
              <MdLogout /> Logout
            </button>
          }
        </div>
      </div>

      {/*<dialog id="aqi_info_modal" className="modal">
        
          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-xl bg-darkblue hover:bg-blue_green" onClick={() => setIsOpen(false)}>Close</button>
            </form>
          </div>
        </div>
      </dialog>*/}
    </div>
  )
}

export default NavBar