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
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    query(sql, [pm25, pm10, aqi_pm25, aqi_pm10, aqi_pm25_category, aqi_pm10_category, device_id], (err, result) => {
      if (err) {
        console.error("Database Insert Error:", err);
        reject(err);
      } else {
        resolve({ message: "Sensor data added successfully", result });
      }
    });
  });
}

// TODO: FIX THISS

export const updateEmployeeData = (empID, newData) => {
  const newEmpName = newData.emp_name
  const newEmpID = newData.emp_id
  const newDevID = newData.device_id
  const newGender = newData.gender
  const newAge = newData.age === "" ? 0 : Number(newData.age)
  console.log(newEmpName)

  return new Promise((resolve, reject) => {
    const sql = `UPDATE employees_tb 
             SET emp_name = ?, emp_id = ?, device_id = ?, gender = ?, age = ?
             WHERE id = ?`

    query(sql, [newEmpName, newEmpID, newDevID, newGender, newAge, empID], (err, result) => {
      if (err) {
        console.error("Database Update Error:", err)
        reject(err)
      } else{
        resolve({message: "Edited successfully", result})
      }
    })
  })
}