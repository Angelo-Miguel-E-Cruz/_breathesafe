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

              if (callback) callback()

              setTimeout(runTimer, 1000)
          } else {
              timeLeft--
          }
      }, 1000)
  }

  runTimer() 
}

export const onTimerEnd = async() => {
  const interval = durationInSeconds === 300 ? '5 minutes' : ''
  try {
    const response = await axios.get(`https://breath-o9r9.onrender.com/api/interval_data`,  interval)
    /*const pm25Array = data.map(item => parseFloat(item.pm25))
    const pm10Array = data.map(item => parseFloat(item.pm10))
    const aqiPm25Array = data.map(item => item.aqi_pm25)
    const aqiPm10Array = data.map(item => item.aqi_pm10)

    console.log("pm25Array:", pm25Array)
    console.log("pm10Array:", pm10Array)
    console.log("aqiPm25Array:", aqiPm25Array)
    console.log("aqiPm10Array:", aqiPm10Array)*/
  } catch (error) {
    console.log(error.message)
  }
}
