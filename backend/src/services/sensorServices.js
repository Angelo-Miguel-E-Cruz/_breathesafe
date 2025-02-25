import { query } from '../../index.js'

export const getSensorData = (employee_id) => {
  return new Promise((resolve, reject) => {
    query(`SELECT * FROM sensor_data
          JOIN employees_tb ON sensor_data.device_id = employees_tb.device_id
          WHERE employees_tb.emp_id = ?`, [employee_id], (err, results) => {
      if (err) {
        console.error("Database Query Error:", err)
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const fetchEmployeeData = async() => {
  return new Promise((resolve, reject) => {
    query('SELECT * FROM employees_tb', [], (err, results) => {
      if (err) {
        console.error("Database Query Error:", err)
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const addSensorData = (pm25, pm10, aqi_pm25, aqi_pm10, aqi_pm25_category, aqi_pm10_category, device_id) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO sensor_data (pm25, pm10, aqi_pm25, aqi_pm10, aqi_pm25_category, aqi_pm10_category, device_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`
    
    query(sql, [pm25, pm10, aqi_pm25, aqi_pm10, aqi_pm25_category, aqi_pm10_category, device_id], (err, result) => {
      if (err) {
        console.error("Database Insert Error:", err)
        reject(err)
      } else {
        resolve({ message: "Sensor data added successfully", result })
      }
    })
  })
}

export const updateEmployeeReadings = (employeeId, pm25, pm10, pm25Level, pm10Level, latest_time) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE employees_tb 
       SET latest_25 = ?, latest_10 = ?, latest_aqi_25 = ?, latest_aqi_10 = ?, latest_time = ?
       WHERE emp_id = ?`,
      [pm25, pm10, pm25Level, pm10Level, latest_time, employeeId],
      (err, results) => {
        if (err) {
          console.error("Database Update Error:", err)
          reject(err)
        } else {
          resolve(results)
        }
      }
    )
  })
}

export const updateEmployeeData = (empID, emp_name, emp_id, device_id, emp_gender, emp_age) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE employees_tb 
             SET emp_name = ?, emp_id = ?, device_id = ?, emp_gender = ?, emp_age = ?
             WHERE id = ?`

    query(sql, [emp_name, emp_id, device_id, emp_gender, emp_age, empID], (err, result) => {
      if (err) {
        console.error("Database Update Error:", err)
        reject(err)
      } else{
        resolve({message: "Edited successfully", result})
      }
    })
  })
}