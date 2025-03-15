import express from 'express'
import * as sensorController from '../controllers/sensorControllers.js'
import * as empController from '../controllers/empControllers.js'

const router = express.Router()

// GETS

// SENSORS

router.get('/sensor_data', sensorController.getSensorData)

router.get('/sensor_data/all', sensorController.getAllSensorData)

router.get('/sensor_data/range', sensorController.getDatainRange)

router.get('/sensor_data/5m_avg', sensorController.get5mAvg)

router.get('/sensor_data/1hr_avg', sensorController.get1hrAvg)

router.get('/sensor_data/5m_avg/graph', sensorController.get5mGraph)

router.get('/sensor_data/1hr_avg/graph', sensorController.get1hrGraph)

// EMPLOYEES & USERS

router.get('/employee_data', empController.getEmployeeData)

router.get('/employee_data/search', empController.searchEmployee)

router.get('/users', empController.getUserData)

// POSTS

// SENSORS

router.post('/add_sensor_data', sensorController.addSensorData)

router.post('/sensor_data/5m_avg/add', sensorController.add5mAverage)

router.post('/sensor_data/1hr_avg/add', sensorController.add1hrAverage)

// EMPLOYEES & USERS

router.post('/employee_data/add', empController.addEmployee)

// PUTS

router.put('/employee_data/:id', empController.updateEmployee)

router.put("/employee_data/update", empController.updateEmployeeReadings)

// DELETES

router.delete('/employee_data/:id', empController.removeUser)

router.delete('/users/:id', empController.removeUser)


export default router