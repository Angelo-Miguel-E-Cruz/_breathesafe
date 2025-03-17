import React, { useState } from 'react'
import axios from 'axios'
import { useEmployee } from './contexts/EmployeeContext'
import { IoMdEye, IoMdEyeOff  } from "react-icons/io"

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
    <div className="flex justify-center items-center h-screen w-screen overflow-x-hidden">
      <div className="absolute inset-0 left-[73%] translate-x-[-73%] z-10 w-[700px] h-full origin-top-left rotate-[-9.11deg] bg-[radial-gradient(ellipse_158.87%_216.54%_at_148.77%_59.82%,_rgba(45,_45,_45,_0)30%,_rgba(45,_45,_45,_0)_50%,_#2D2D2D_75%)]" />

      <div className="w-full h-full flex overflow-hidden">
        {/* Left Section (Dark Overlay) */}
        <div className="w-1/2 bg-darkblue text-white p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold">Hello, welcome.</h1>
          <p className="text-gray-400 mt-2">Please login your account.</p>

          <div className="input flex flex-col gap-0 mt-5 px-3 py-2 h-fit items-start bg-gray-700 rounded-md text-white border-none focus-within:outline-blue_green group">
            <p className="text-[10px] text-skyblue/85 group-focus-within:text-blue_green">Name</p>
            <input
              type="text"
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
                placeholder="Enter your password"
                className="flex-1 border-none bg-transparent placeholder-gray-400 "
                onChange={e => onChange(e)}/>
              <button className='text-skyblue/85 hover:text-blue_green' onClick={() => setShowPassword(!showPassword)}>
                {
                  !showPassword ? <IoMdEye /> : <IoMdEyeOff/>
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

        {/* Right Section (Image with Overlay) */}
        <div className="w-2/3 relative">
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