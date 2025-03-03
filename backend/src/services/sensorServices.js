import { query } from '../../index.js'


// GETS

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

export const getDatainRange = async (interval) => {
  try {
    const sql = `SELECT pm25, pm10, aqi_pm25, aqi_pm10
                FROM sensor_data 
                WHERE timestamp >= NOW() - INTERVAL $1 `
    const {rows} = await query(sql, [interval])
    return rows 
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

// POSTS

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