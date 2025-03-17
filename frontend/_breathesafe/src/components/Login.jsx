import React, { useState } from 'react'
import axios from 'axios'
import { useEmployee } from './contexts/EmployeeContext'

const Login = () => {

  const [inputs, setInputs] = useState({
    name: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)

  const { name, password } = inputs

  const { setSelectedEmployee } = useEmployee()

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async(e) => {
    e.preventDefault()
    try {

      const body = { name, password }

      const response = await axios.post(`https://breath-o9r9.onrender.com/auth/login`, body)

      const user = response.data
      console.log(user)
      console.log(user.id)

      if (response.status === 201){
        window.localStorage.setItem("token", user.token)
        window.localStorage.setItem("role", user.role)
        if(user.role === "Admin"){
          setSelectedEmployee(1)
          window.location.href = "/admin";
        }
        else if(user.role === "User"){
          setSelectedEmployee(user.id)
          window.localStorage.setItem("employeeID", user.id)
          window.location.href = "/dashboard";
        }
      }

    } catch (error) {
      console.log(error.message)
      localStorage.removeItem("role")
      localStorage.removeItem("token")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300">
      <div className="w-[90%] max-w-[1000px] h-[600px] flex rounded-lg overflow-hidden shadow-lg">
        {/* Left Section (Dark Overlay) */}
        <div className="w-1/2 bg-gradient-to-r from-black to-gray-800 text-white p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold">Hello, welcome.</h1>
          <p className="text-gray-400 mt-2">Please login your account.</p>
          <input
            type="text"
            placeholder="Enter your name"
            className="mt-5 p-3 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none"
            onChange={e => onChange(e)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="mt-3 p-3 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none"
            onChange={e => onChange(e)}
          />
          <a href="#" className="text-sm text-gray-400 mt-2 hover:underline">
            Forgot Password
          </a>
          <button className="mt-5 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md">
            Submit
          </button>
        </div>

        {/* Right Section (Image with Overlay) */}
        <div className="w-1/2 relative">
          <img
            src="/login.png"
            alt="Factory Workers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>
      </div>
      {/* <div className='p-5 grid place-content-center'>
      <h1 className='font-bold text-4xl justify-self-center mt-35'>Login</h1>
      <form className='fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mt-5'>
        
        <label className="fieldset-label">Name</label>
        <input type="name" name='name' className="input" placeholder="Name"
        value={name} onChange={e => onChange(e)} />
        
        <label className="fieldset-label">Password</label>
        <input type={showPassword ? "text" : "password"} name="password"className="input" placeholder="Password"
        value={password} onChange={e => onChange(e)}/>

        <label className="fieldset-label mt-2">
          <input type="checkbox" className="checkbox rounded-none" onChange={() => setShowPassword(!showPassword)}/>
          Show Password
        </label>

        <a className='text-green-700 italic mt-2'>Forgot Password? Reset Here</a>

        <button className='btn btn-success mt-2' onClick={e => onSubmitForm(e)}>Submit</button>
      </form>
    </div> */}
    </div>
  )
}

export default Login