import React from 'react'

function EditUserModal({handleChangeFormData, handleUpdateEmpInfo, editEmp}) {
  return (
    <dialog id="editModal" className="modal">
      <div className="modal-box bg-background text-black border-black border-1">
        <h3 className="font-bold text-lg mb-5">Edit Employee Data</h3>

        <label className="input input-bordered bg-background my-1 border-black"> Employee Name
          <input type="text" className="grow" id='emp_name' value={editEmp?.emp_name || ""} onChange={handleChangeFormData} />
        </label>

        <label className="input input-bordered bg-background my-1 border-black"> Employee ID
          <input type="text" className="grow" id='emp_id' value={editEmp?.emp_id || ""} onChange={handleChangeFormData} />
        </label>

        <label className="input input-bordered bg-background my-1 border-black"> Device ID
          <input type="text" className="grow" id='device_id' value={editEmp?.device_id || ""} onChange={handleChangeFormData} />
        </label>

        <label className="input input-bordered bg-background my-1 border-black"> Employee Gender
          <input type="text" className="grow" id='emp_gender' value={editEmp?.emp_gender || ""} onChange={handleChangeFormData} />
        </label>

        <label className="input input-bordered bg-background my-1 border-black"> Employee Age
          <input type="number" min="0" className="grow" id='emp_age' value={editEmp?.emp_age || ""} onChange={handleChangeFormData} />
        </label>
      
        <div className="modal-action justify-start  ">
          <form method="dialog">
          <button className='btn rounded-xl bg-darkblue hover:bg-blue_green mr-2' onClick={() => handleUpdateEmpInfo(editEmp.id)}>Confirm</button>
            <button className="btn rounded-xl bg-darkblue hover:bg-blue_green">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default EditUserModal