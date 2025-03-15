import React from 'react'

function AddEmpModal({handleAddEmployee}) {
  return (
    <dialog id="addModal" className="modal">
        <div className="modal-box bg-background text-black border-black border-1">
          <h3 className="font-bold text-lg mb-5">Add Employee</h3>

          <label className="input input-bordered bg-background my-1 border-black"> Name
            <input type="text" className="grow" id='add_emp_name'/>
          </label>

          <label className="input input-bordered bg-background my-1 border-black"> Employee ID
            <input type="text" className="grow" id='add_emp_id'/>
          </label>

          <label className="input input-bordered bg-background my-1 border-black"> Device ID
            <input type="text" className="grow" id='add_device_id'/>
          </label>

          <label className="input input-bordered bg-background my-1 border-black"> Employee Gender
            <input type="text" className="grow" id='add_emp_gender'/>
          </label>

          <label className="input input-bordered bg-background my-1 border-black"> Employee Age
            <input type="number" min="0" className="grow" id='add_emp_age'/>
          </label>
          
        
          <div className="modal-action justify-start">
            <form method="dialog">
            <button className='btn rounded-xl bg-darkblue hover:bg-blue_green mr-2' onClick={() => handleAddEmployee()}>Confirm</button>
              <button className="btn rounded-xl bg-darkblue hover:bg-blue_green">Close</button>
            </form>
          </div>
        </div>
      </dialog>
  )
}

export default AddEmpModal