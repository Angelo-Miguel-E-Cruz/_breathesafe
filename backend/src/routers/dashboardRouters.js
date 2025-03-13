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

router.get('/5m_avg', sensorController.get5mAvg)

router.get('/1hr_avg', sensorController.get1hrAvg)

router.get('/5m_avg/graph', sensorController.get5mGraph)

router.get('/1hr_avg/graph', sensorController.get1hrGraph)

router.get('/users', empController.getUserData)

// POSTS

router.post('/add_sensor_data', sensorController.addSensorData)

router.post('/add_employee', empController.addEmployee)

router.post('/avg_5m', sensorController.add5mAverage)

router.post('/avg_1hr', sensorController.add1hrAverage)

// PUTS

router.put('/employee_data/:id', empController.updateEmployee)

router.put("/update_employee_readings", empController.updateEmployeeReadings)

// DELETES

router.delete('/employee_data/:id', empController.removeEmployee)

router.delete('/users/:id', empController.removeEmployee)


export default router