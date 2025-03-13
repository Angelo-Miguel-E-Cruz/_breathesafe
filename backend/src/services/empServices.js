import { query } from "../../index.js";

// GETS

export const fetchEmployeeData = async() => {
  try {
    const sql = 'SELECT * FROM employees_tb ORDER BY id ASC'
    const {rows} = await query(sql, [])
    return rows 
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const fetchUserData = async() => {
  try {
    const sql = 'SELECT user_id, user_name, user_role FROM users ORDER BY user_role, user_name ASC'
    const {rows} = await query(sql, [])
    return rows 
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const searchEmployee = async(searchTerm) => {
  try {
    const {rows} = await query(
      `SELECT * FROM employees_tb WHERE emp_name ILIKE $1 OR emp_id ILIKE $1 OR device_id ILIKE $1 ORDER BY id ASC`,
      [`%${searchTerm}%`])
    return rows
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const employeeExists = async(emp_name) => {
  try {
    const sql = 'SELECT COUNT(*) FROM employees_tb WHERE emp_name = $1'
    const {rows} = await query(sql, [emp_name])
    return rows 
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const userExists = async(emp_name) => {
  try {
    const sql = 'SELECT COUNT(*) FROM users WHERE user_name = $1 AND user_role = $2'
    const {rows} = await query(sql, [emp_name, 'User'])
    return rows 
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

// POSTS

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

// PUTS

export const updateEmployeeReadings = async(empID, pm25, pm10, pm25Level, pm10Level, latest_time) => {
  try {
    const sql = `UPDATE employees_tb 
                SET latest_25 = $1, latest_10 = $2, latest_aqi_25 = $3, latest_aqi_10 = $4, latest_time = $5
                WHERE emp_id = $6`
  
    const {rows} = await query(sql, [pm25, pm10, pm25Level, pm10Level, latest_time, empID])
    return rows 
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const updateEmployeeData = async(empID, emp_name, emp_id, device_id, emp_gender, emp_age) => {
  try {
    const sql = `UPDATE employees_tb 
                SET emp_name = $1, emp_id = $2, device_id = $3, emp_gender = $4, emp_age = $5
                WHERE id = $6`
  
    const {rows} = await query(sql, [emp_name, emp_id, device_id, emp_gender, Number(emp_age), empID])
    return rows 
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

// DELETES

export const removeEmployee = async(id) => {
  try {
    const {rowCount} = await query(
      'DELETE FROM employees_tb WHERE id = $1',
      [id])
    return rowCount > 0
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const removeUser = async(id) => {
  try {
    const {rowCount} = await query(
      'DELETE FROM users WHERE id = $1',
      [id])
    return rowCount > 0
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}