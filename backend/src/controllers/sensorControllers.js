import * as sensorService from '../services/sensorServices.js'

// GETS

export const getSensorData = async (req, res) => {
  try {
    const { employeeID } = req.query

    const items = await sensorService.getSensorData(employeeID)
    res.status(200).json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
}

export const getAllSensorData = async (req, res) => {
  try {
    const items = await sensorService.getAllSensorData()
    res.status(200).json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
}

export const getDatainRange = async (req, res) => {
  try {
    const interval = req.query.interval
    const items = await sensorService.getDatainRange(interval)
    res.status(200).json({ result: items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error", error: err.message })
  }
}

export const get5mAvg = async (req, res) => {
  try {
    const { employeeID } = req.query

    const items = await sensorService.get5mAvg(employeeID)
    res.status(200).json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
}

export const getRTGraph = async (req, res) => {
  try {
    const items = await sensorService.getRTGraph()
    res.status(200).json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
}

export const get5mGraph = async (req, res) => {
  try {
    const items = await sensorService.get5mGraph()
    res.status(200).json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
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

export const add5mAverage = async (req, res) => {
  try {
    let data = req.body
    console.log("data: ", data)

    if (!Array.isArray(data)) {
      data = [data];
    }

    for (const obj of data) {
      let { pm25, pm10, aqi_pm25, aqi_pm10, device_id } = obj;

      if (pm25 === undefined || pm10 === undefined) {
        return res.status(400).json({ message: "Missing sensor data" });
      }

      console.log(`Processing Device: ${device_id}, PM2.5: ${pm25}, PM10: ${pm10}, AQI_PM2.5: ${aqi_pm25}, AQI_PM10: ${aqi_pm10}`);

      await sensorService.add5mAverage(pm25, pm10, aqi_pm25, aqi_pm10, device_id);
    }

    res.status(201).json({ message: "Sakses" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error", error: err.message })
  }
}