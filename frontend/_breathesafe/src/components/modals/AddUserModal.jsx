import React, { useState } from 'react'

function AddUserModal({handleSubmitUser}) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <dialog id="usersModal" className="modal gap-2">
      <div className="bg-white rounded-2xl p-4 border border-black">
        <fieldset className="fieldset w-xs p-4 rounded-box pt-2">
          
          <h1 className='font-bold text-2xl'>Add User</h1>

          <label className="fieldset-label">Name</label>
          <input type="text" id='user_name' className="input text-black bg-base-200" placeholder="Name" />

          <label className="fieldset-label">Password</label>
          <input type={showPassword ? "text" : "password"} id='user_password' className="input text-black bg-base-200" placeholder="Password" />

          <label className="fieldset-label mt-2">
            <input type="checkbox" className="checkbox rounded-none" onChange={() => setShowPassword(!showPassword)}/>
            Show Password
          </label>
          
          <label className="fieldset-label">Role</label>
          <select defaultValue="User" className="select bg-base-200" id='user_role'>
            <option>User</option>
            <option>Admin</option>
          </select>
        </fieldset>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-success mr-2" onClick={()=> handleSubmitUser()}>Submit</button>
            <button className="btn btn-error">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default AddUserModal