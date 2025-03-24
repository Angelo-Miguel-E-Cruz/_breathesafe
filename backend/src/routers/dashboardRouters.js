import express from 'express'
import * as sensorController from '../controllers/sensorControllers.js'
import * as empController from '../controllers/empControllers.js'

const router = express.Router()

// GETS

// SENSORS

router.get('/sensor_data', sensorController.getSensorData)

router.get('/sensor_data/all', sensorController.getAllSensorData)

router.get('/range', sensorController.getDatainRange)

router.get('/5m_avg', sensorController.get5mAvg)

router.get('/sensor_data/graph', sensorController.getRTGraph)

router.get('/5m_avg/graph', sensorController.get5mGraph)

// EMPLOYEES & USERS

router.get('/employee_data', empController.getEmployeeData)

router.get('/employee_data/search', empController.searchEmployee)

router.get('/users', empController.getUserData)

router.get('/users/search', empController.searchUser)

// POSTS

// SENSORS

router.post('/add_sensor_data', sensorController.addSensorData)

router.post('/5m_avg/add', sensorController.add5mAverage)

// EMPLOYEES & USERS

router.post('/employee_data/add', empController.addEmployee)

// PUTS

router.put('/employee_data/:id', empController.updateEmployee)

router.put("/update_employee_data", empController.updateEmployeeReadings)

router.put('/users/:id', empController.updateUser)

// DELETES

router.delete('/employee_data/:id', empController.removeEmployee)

router.delete('/users/:id', empController.removeUser)


export default router