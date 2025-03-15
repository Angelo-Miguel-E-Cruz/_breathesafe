import React from 'react'

function EditUserModal({handleChangeFormData, handleUpdateUserInfo, editUser}) {

  console.log(editUser)

  return (
    <dialog id="editModal" className="modal">
      <div className="modal-box bg-background text-black border-black border-1">
        <h3 className="font-bold text-lg mb-5">Edit User Data</h3>

        <label className="input input-bordered bg-background my-1 border-black"> Name
          <input type="text" className="grow" id='user_name' value={editUser?.user_name || ""} onChange={handleChangeFormData} />
        </label>

        <label className="input input-bordered bg-background my-1 border-black"> User Role
          <select defaultValue={editUser?.user_role || ""} className="select bg-transparent" id='user_role' onChange={handleChangeFormData}>
            <option>User</option>
            <option>Admin</option>
          </select>
        </label>
      
        <div className="modal-action justify-start  ">
          <form method="dialog">
          <button className='btn rounded-xl bg-darkblue hover:bg-blue_green mr-2' onClick={() => handleUpdateUserInfo(editUser.user_id)}>Confirm</button>
            <button className="btn rounded-xl bg-darkblue hover:bg-blue_green">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default EditUserModal