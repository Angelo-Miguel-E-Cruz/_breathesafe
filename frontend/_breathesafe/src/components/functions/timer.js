import axios from 'axios'

export const startLoopingCountdown = (durationInSeconds, callback) => {
  function runTimer() {
      let timeLeft = durationInSeconds

      const timer = setInterval(() => {
          const minutes = Math.floor(timeLeft / 60)
          const seconds = timeLeft % 60

          console.log(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)

          if (timeLeft <= 0) {
              clearInterval(timer)

              if (callback) callback(durationInSeconds)

              setTimeout(runTimer, 1000)
          } else {
              timeLeft--
          }
      }, 1000)
  }

  runTimer() 
}

export const onTimerEnd = async(durationInSeconds) => {
  const interval = durationInSeconds === 20 ? '5 minutes' : 
                  durationInSeconds === 3600 ? '1 hour' :  null

  if (!interval) return null

  try {
    console.log("interval: ", interval)  
    console.log("type: ", typeof(interval))  
    const response = await axios.get(`https://breath-o9r9.onrender.com/api/interval_data`,  {
      params: { interval }
    })
    const results = response.data.result
    
    console.log("first object: ", results[0])
    console.log("second object: ", results[1])

    results.forEach((sensor, index) => {
      console.log(`Device ${sensor.device_id}:`)
      console.log(`  - PM10 AQI: ${sensor.avg_aqi_pm10}`)
      console.log(`  - PM2.5 AQI: ${sensor.avg_aqi_pm25}`)
  })

  } catch (error) {
    console.log(error.message)
  }
}

// TODO: REMOVE LOGS WHEN FINISHED
const processResult = async (index, resultArray) => {
  if (index >= resultArray.length) {
    console.log("All items processed.")
    return
  }

  const singleArray = [resultArray[index]] 
  console.log(`Processing item ${index + 1}:`, singleArray)

  /*try {
    const response = await axios

    const data = await response.json()
    console.log(`API Response for item ${index + 1}:`, data)

  } catch (error) {
    console.error("API Error:", error)
  }*/
    processResult(index + 1, resultArray)
}

