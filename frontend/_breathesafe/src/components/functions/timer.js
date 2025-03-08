import axios from 'axios'

export const startLoopingCountdown = (durationInSeconds, callback) => {
  function runTimer() {
      let timeLeft = durationInSeconds

      const timer = setInterval(() => {
          const minutes = Math.floor(timeLeft / 60)
          const seconds = timeLeft % 60

          //console.log(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)

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
  const interval = durationInSeconds === 20 ? '5 minutes' : //set to 300
                  durationInSeconds === 3600 ? '1 hour' :  null

  if (!interval) return null

  try {
    const response = await axios.get(`https://breath-o9r9.onrender.com/api/interval_data`,  {
      params: { interval }
    })
    const results = response.data.result[0].result

    const formattedResults = results.map(({ 
      avg_pm25: pm25, 
      avg_pm10: pm10, 
      avg_aqi_pm25: aqi_pm25, 
      avg_aqi_pm10: aqi_pm10, 
      device_id 
    }) => ({
      pm25,
      pm10,
      aqi_pm25,
      aqi_pm10,
      device_id
    }))
  

  update5mAvg(formattedResults)

  } catch (error) {
    console.log(error.message)
  }
}

const update5mAvg = async(data) => {
  try {
    const result = await axios.post(`https://breath-o9r9.onrender.com/api/avg_5m`, data)
  } catch (error) {
    console.log(error)
  }
}

