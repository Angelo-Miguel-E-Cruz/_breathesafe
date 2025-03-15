import React, { useState } from 'react'

function AddUserModal({handleAddUser}) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <dialog id="addModal" className="modal">
      <div className="modal-box bg-background text-black border-black border-1">
        <h3 className="font-bold text-lg mb-5">Add User</h3>

        <label className="input input-bordered bg-background my-1 border-black"> Name
          <input type="text" className="grow" id='add_user_name'/>
        </label>

        <label className="input input-bordered bg-background my-1 border-black"> Password
          <input type={showPassword ? "text" : "password"} className="grow" id='add_user_password'/>
        </label>        
        
        <label className="fieldset-label my-1 text-black">
          <input type="checkbox" className="checkbox rounded-none text-black border-black" onChange={() => setShowPassword(!showPassword)}/>
          Show Password
        </label>

        <label className="input input-bordered bg-background my-1 border-black"> User Role
          <select defaultValue="User" className="select bg-transparent" id='add_user_role'>
            <option>User</option>
            <option>Admin</option>
          </select>
        </label>
        
        <div className="modal-action justify-start">
          <form method="dialog">
          <button className='btn rounded-xl bg-darkblue hover:bg-blue_green mr-2' onClick={() => handleAddUser()}>Confirm</button>
            <button className="btn rounded-xl bg-darkblue hover:bg-blue_green">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default AddUserModal