import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import sensorRouter from './src/routers/sensorRouters.js'
import env from 'dotenv'

const app = express()
const port = 5000

env.config()

app.use(cors({
  origin: "*"
}))
app.use(express.json())

const db = mysql.createConnection({
  host: process.env.MS_HOST,
  user: process.env.MS_USER,
  password: process.env.MS_PASSWORD,
  database: process.env.MS_DATABASE
})

db.connect((err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database!");
  }
});

app.use('/api', sensorRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

export const query = (text, params, callback) => { db.query(text, params, callback) }