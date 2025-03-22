import React, { useState } from 'react'
import axios from 'axios'
import { useEmployee } from './contexts/EmployeeContext'
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {

  const [inputs, setInputs] = useState({
    name: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)

  const { name, password } = inputs

  const { setSelectedEmployee } = useEmployee()

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    console.log()
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {

      const body = { name, password }

      const response = await axios.post(`https://breath-o9r9.onrender.com/auth/login`, body)

      const user = response.data

      if (response.status === 201) {
        window.localStorage.setItem("token", user.token)
        window.localStorage.setItem("role", user.role)
        if (user.role === "Admin") {
          setSelectedEmployee(1)
          window.location.href = "/admin";
        }
        else if (user.role === "User") {
          setSelectedEmployee(user.id)
          window.localStorage.setItem("employeeID", user.id)
          window.location.href = "/dashboard";
        }
      }

    } catch (error) {
      toast.error(error.response.data.message, { duration: 2500 })
      localStorage.removeItem("role")
      localStorage.removeItem("token")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden">
      <Toaster />
      <div className="absolute inset-0 left-[50%] translate-x-[-50%] z-10 w-[700px] h-full bg-linear-to-r from-darkblue from-40% via-darkblue/50 via-65% to-transparent to-80%">
      </div>

      {/* [radial-gradient(ellipse 158.87% 216.54% at 148.77% 59.82%, rgba(45, 45, 45, 0) 30%, rgba(45, 45, 45, 0) 50%, #2D2D2D 75%)] */}

      <div className="w-full h-full flex overflow-hidden relative">
        <img
          src="/loginlogo.png"
          alt="Breathesafe Logo"
          className="absolute top-0 left-0"
        />
        <div className="w-1/2 bg-darkblue text-white p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold">Hello, welcome.</h1>
          <p className="text-gray-400 mt-2">Please login your account.</p>

          <div className="input flex flex-col gap-0 mt-5 px-3 py-2 h-fit items-start bg-gray-700 rounded-md text-white border-none focus-within:outline-blue_green group">
            <p className="text-[10px] text-skyblue/85 group-focus-within:text-blue_green">Name</p>
            <input
              type="text"
              name='name'
              placeholder="Enter your name"
              className=" w-full border-none bg-transparent placeholder-gray-400 "
              onChange={e => onChange(e)}
            />
          </div>

          <div className="input flex flex-col gap-0 mt-3 px-3 py-2 h-fit items-start bg-gray-700 rounded-md text-white border-none focus-within:outline-blue_green group">
            <p className="text-[10px] text-skyblue/85 group-focus-within:text-blue_green">Password</p>
            <div className='flex items-center justify-between w-full'>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                placeholder="Enter your password"
                className="flex-1 border-none bg-transparent placeholder-gray-400 "
                onChange={e => onChange(e)} />
              <button className='text-skyblue/85 hover:text-blue_green' onClick={() => setShowPassword(!showPassword)}>
                {
                  !showPassword ? <IoMdEye /> : <IoMdEyeOff />
                }
              </button>
            </div>
          </div>

          <a href="#" className="text-sm text-gray-400 mt-2 underline">
            Forgot Password
          </a>
          <button className="mt-5 w-full min-w-[3rem] max-w-[20rem] bg-blue_green hover:bg-darkblue_green text-white font-semibold py-2 px-4 rounded-3xl"
            onClick={e => onSubmitForm(e)}>
            Submit
          </button>
        </div>

        <div className="w-2/3 relative">
          <img
            src="/login.png"
            alt="Factory Workers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>
      </div>
    </div>
  )
}

export default Login