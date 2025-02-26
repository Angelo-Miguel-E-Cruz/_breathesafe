import express from 'express'
import mysql from 'mysql2'
import pg from 'pg'
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

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
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

export const query = (text, params) => db.query(text, params)