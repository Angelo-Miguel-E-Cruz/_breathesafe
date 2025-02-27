import { query } from '../../index.js'

export const getSensorData = async (empID) => {
  try {
    const sql = `SELECT * FROM sensor_data
                JOIN employees_tb ON sensor_data.device_id = employees_tb.device_id
                WHERE employees_tb.id = $1`
  
    const {rows} = await query(sql, [empID])
    return rows 
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const getAllSensorData = async() => {
  try {
    const sql = `SELECT * FROM sensor_data JOIN employees_tb 
                ON sensor_data.device_id = employees_tb.device_id`
    const {rows} = await query(sql, [])
    return rows 
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

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

export const addSensorData = async(pm25, pm10, aqi_pm25, aqi_pm10, aqi_pm25_category, aqi_pm10_category, device_id) => {
  try {
    const sql = `INSERT INTO sensor_data (pm25, pm10, aqi_pm25, aqi_pm10, aqi_pm25_category, aqi_pm10_category, device_id) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)`
  
    const {rows} = await query(sql, [pm25, pm10, aqi_pm25, aqi_pm10, aqi_pm25_category, aqi_pm10_category, device_id])
    return rows 
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

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