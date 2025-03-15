import * as empServices from '../services/empServices.js'

// GETS

export const getEmployeeData = async (req, res) => {
  try{
    const items = await empServices.fetchEmployeeData()
    res.status(200).json(items)
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const getUserData = async (req, res) => {
  try{
    const items = await empServices.fetchUserData()
    res.status(200).json({result: items})
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const searchEmployee = async (req, res) => {
  try{
    const searchTerm = req.query.q
    const employee = await empServices.searchEmployee(searchTerm)
    res.status(200).json(employee)
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const searchUser = async (req, res) => {
  try{
    const searchTerm = req.query.q
    const user = await empServices.searchUser(searchTerm)
    res.status(200).json(user)
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

// POSTS

export const addEmployee = async (req, res) => {
  try {
    const { emp_name, emp_id, device_id, emp_gender, emp_age } = req.body

    const doesExist = await empServices.employeeExists(emp_name)

    console.log(doesExist[0].count)

    if (Number(doesExist[0].count) !== 0){
      return res.status(400).json({message: "Employee already exists"})
    }

    const userExists = await empServices.userExists(emp_name)

    console.log(userExists[0].count)

    if (Number(userExists[0].count) === 0){
      return res.status(400).json({message: "Name not in user database. Add as user first"})
    }

    if (!emp_name || !emp_id || !device_id || !emp_gender || !emp_age){
      return res.status(400).json({message: "Missing Credentials"})
    }

    const result = await empServices.addEmployee(emp_name, emp_id, device_id, emp_gender, emp_age)
    res.status(201).json({result: result})
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
}

// PUTS

export const updateEmployeeReadings = async (req, res) => {
  try {
    const { employeeId, pm25, pm10, pm25Level, pm10Level, latest_time } = req.body

    console.log(latest_time)

    await empServices.updateEmployeeReadings(employeeId, pm25, pm10, pm25Level, pm10Level, latest_time)

    res.status(200).json({ message: "Employee readings updated successfully" })
  } catch (err) {
    res.status(500).json({ message: "Server Error" })
  }
}

export const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id
    const { emp_name, emp_id, device_id, emp_gender, emp_age } = req.body
    const updatedData = await empServices.updateEmployeeData(id, emp_name, emp_id, device_id, emp_gender, emp_age)

    if(!updatedData){
      return res.status(400).json({message: "ID not found"})
    }
    res.status(200).json(updatedData)
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id
    const { user_name, user_role } = req.body
    const updatedData = await empServices.updateUserData(id, user_name, user_role)

    if(!updatedData){
      return res.status(400).json({message: "ID not found"})
    }
    res.status(200).json(updatedData)
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

// DELETES

export const removeEmployee = async (req, res) => {
  try{
    const id = req.params.id
    const removedEmployee = await empServices.removeEmployee(id)
    if (!removedEmployee)
      return res.status(404).json({message: "ID not found"})
    res.status(200).send()
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const removeUser = async (req, res) => {
  try{
    const id = req.params.id
    const removedEmployee = await empServices.removeUser(id)
    if (!removedEmployee)
      return res.status(404).json({message: "ID not found"})
    res.status(200).send()
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}