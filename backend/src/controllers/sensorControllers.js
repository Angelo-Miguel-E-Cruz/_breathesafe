import * as sensorService from '../services/sensorServices.js'

export const getSensorData = async (req, res) => {
  try{
    const { employeeID } = req.query
    console.log(employeeID)
    
    if (!employeeID) {
      return res.status(400).json({ message: "employeeId is required" });
    }
    const items = await sensorService.getSensorData(employeeID)
    res.status(200).json(items)
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const getEmployeeData = async (req, res) => {
  try{
    const items = await sensorService.fetchEmployeeData()
    res.status(200).json(items)
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const addSensorData = async (req, res) => {
  try {
    const { pm25, pm10, aqi_pm25, aqi_pm10, aqi_pm25_category, aqi_pm10_category, device_id } = req.body

    if (pm25 === undefined || pm10 === undefined) {
      return res.status(400).json({ message: "Missing sensor data" })
    }

    const result = await sensorService.addSensorData(pm25, pm10, aqi_pm25, aqi_pm10, aqi_pm25_category, aqi_pm10_category, device_id)
    res.status(201).json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
}

// TODO: FIX THIS

export const updateEmployee = async (req, res) => {
  console.log("!")
  try {
    const id = req.params.id
    const empData = req.body
    const updatedData = await sensorService.updateEmployeeData(id, empData)
    windows.confirm("Updated Successfully")

    if(!updatedData){
      return res.status(400).json({message: "ID not found"})
    }
    res.status(200).json(updatedData)
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}