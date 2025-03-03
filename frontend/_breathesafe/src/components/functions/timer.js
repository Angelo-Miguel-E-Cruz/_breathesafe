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

export const onTimerEnd = () => {
  
}
