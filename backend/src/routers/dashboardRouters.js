import express from 'express'
import * as sensorController from '../controllers/sensorControllers.js'
import * as empController from '../controllers/empControllers.js'

const router = express.Router()

// GETS

router.get('/sensor_data', sensorController.getSensorData)

router.get('/sensor_data/all', sensorController.getAllSensorData)

router.get('/employee_data', empController.getEmployeeData)

router.get('/employee_data/search', empController.searchEmployee)

router.get('/interval_data', sensorController.getDatainRange)

// POSTS

router.post('/add_sensor_data', sensorController.addSensorData)

router.post('/add_employee', empController.addEmployee)

// PUTS

router.put('/employee_data/:id', empController.updateEmployee)

router.put("/update_employee_readings", empController.updateEmployeeReadings)

// DELETES

router.delete('/employee_data/:id', empController.removeEmployee)


export default router