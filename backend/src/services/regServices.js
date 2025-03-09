import { query } from '../../index.js'

// SQL to check if user exists
export const checkExists = async (name) => {
  try {
    const sql = `SELECT * FROM users WHERE user_name = $1`
    const { rows } = await query(sql, [name])
    return rows
  } catch (error) {
    console.log(error.messsage)
    throw error
  }
}

// SQL to add new user to db
export const registerUser = async (name, password, role) => {
  try {
    const sql = `INSERT INTO users (user_name, user_password, user_role)
                VALUES ($1, $2, $3) RETURNING *`
    const { rows } = await query(sql, [name,  password, role])
    return rows
  } catch (error) {
    console.log(error.messsage)
    throw error
  }
}

// SQL to add new employee to db
export const addEmployee = async(emp_name, emp_id, device_id, emp_gender, emp_age) => {
  try {
    const sql = `INSERT INTO employees_tb (emp_name, emp_id, device_id, emp_gender, emp_age) 
                VALUES ($1, $2, $3, $4, $5)`
  
    const {rows} = await query(sql, [emp_name, emp_id, device_id, emp_gender, emp_age])
    return rows 
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}