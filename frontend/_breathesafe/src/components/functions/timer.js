import axios from 'axios'

export const startLoopingCountdown = (durationInSeconds, callback) => {
  function runTimer() {
    let timeLeft = durationInSeconds

    const timer = setInterval(() => {

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

export const onTimerEnd = async (durationInSeconds) => {
  const interval = durationInSeconds === 300 ? '5 minutes' : null

  if (!interval) return null

  try {
    const response = await axios.get(`https://breath-o9r9.onrender.com/api/range`, {
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

    durationInSeconds === 300 ? update5mAvg(formattedResults) : update1hrAvg(formattedResults)

  } catch (error) {
    console.log(error.message)
  }
}

const update5mAvg = async (data) => {
  try {
    const result = await axios.post(`https://breath-o9r9.onrender.com/api/5m_avg/add`, data)
  } catch (error) {
    console.log(error)
  }
}

