import * as sensorService from '../services/sensorServices.js'

// GETS

export const getSensorData = async (req, res) => {
  try{
    const { employeeID } = req.query

    const items = await sensorService.getSensorData(employeeID)
    res.status(200).json(items)
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const getAllSensorData = async (req, res) => {
  try{
    const items = await sensorService.getAllSensorData()
    res.status(200).json(items)
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const getDatainRange = async (req, res) => {
  try{
    const interval = req.query.interval
    console.log("request: ", req.query)
    console.log("body: ", req.query.interval)
    console.log("interval: ", interval)
    const items = await sensorService.getDatainRange(interval)
    res.status(200).json({result: items, interval: interval, type: typeof(interval)})
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error", error: err.message})
  }
}

// POSTS

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