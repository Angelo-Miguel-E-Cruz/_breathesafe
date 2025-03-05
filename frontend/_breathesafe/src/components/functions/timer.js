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
  const interval = durationInSeconds === 300 ? '5 minutes' : 
                  durationInSeconds === 3600 ? '1 hour' :  null

  if (!interval) return null

  console.log(interval)
  try {
    const response = await axios.get(`https://breath-o9r9.onrender.com/api/interval_data`,  interval)
    console.log(response)
  } catch (error) {
    console.log(error.message)
  }
}
