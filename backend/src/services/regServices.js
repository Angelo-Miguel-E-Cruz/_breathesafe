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
export const registerUser = async (name, password, role, id) => {
  try {
    const sql = `INSERT INTO users (user_name, user_password, user_role, emp_id)
                VALUES ($1, $2, $3, $4) RETURNING *`
    const { rows } = await query(sql, [name,  password, role, id])
    return rows
  } catch (error) {
    console.log(error.messsage)
    throw error
  }
}