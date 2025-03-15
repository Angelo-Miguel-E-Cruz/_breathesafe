import { query } from '../../index.js'

// SQL to check if user exists
export const checkExists = async (name) => {
  try {
    const sql = `SELECT user_password, user_role, emp_id FROM users 
                JOIN employees_tb ON users.user_id = employees_tb.user_id
                WHERE user_name = $1`
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