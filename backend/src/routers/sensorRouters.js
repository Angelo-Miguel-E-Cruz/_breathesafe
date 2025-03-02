import express from 'express'
import * as sensorController from '../controllers/sensorControllers.js'

const router = express.Router()

router.get('/sensor_data', sensorController.getSensorData)

router.get('/sensor_data/all', sensorController.getAllSensorData)

router.get('/employee_data', sensorController.getEmployeeData)

router.post('/add_sensor_data', sensorController.addSensorData)

router.post('/add_employee', sensorController.addEmployee)

router.put('/employee_data/:id', sensorController.updateEmployee)

router.put("/update_employee_readings", sensorController.updateEmployeeReadings)

router.delete('/employee_data/:id', sensorController.removeEmployee)

router.get('/employee_data/search', sensorController.searchEmployee)

export default router