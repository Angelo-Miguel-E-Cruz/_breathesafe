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
      
      if (response.status === 201){
        window.localStorage.setItem("token", user.token)
        window.localStorage.setItem("role", user.role)
        if(user.role === "Admin"){
          console.log("from login.jsx: ", user.role, typeof(user.role))
          setSelectedEmployee(1)
          window.location.href = "/admin";
        }
        else if(user.role === "User"){
          console.log("from login.jsx: ", user.role, typeof(user.role))
          console.log("employee id: ", user.id)
          setSelectedEmployee(user.id)
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
    <div className='p-5 grid place-content-center'>
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
    </div>
  )
}

export default Login