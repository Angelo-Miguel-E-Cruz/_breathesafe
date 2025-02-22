import express from 'express'
import * as sensorController from '../controllers/sensorControllers.js'

const router = express.Router()

router.get('/sensor_data', sensorController.getSensorData)

router.get('/employee_data', sensorController.getEmployeeData)

router.post('/add_sensor_data', sensorController.addSensorData)

router.put('/employee_data/:id', sensorController.updateEmployee)

export default router