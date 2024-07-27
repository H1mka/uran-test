import { ref } from 'vue'
import { formatTime } from '../helpers/formatTime'

const useStopwatch = () => {
  const hours = ref('00')
  const min = ref('00')
  const sec = ref('00')
  const millsec = ref('00')
  const isRunning = ref(false)
  let interval = null
  let difference = 0
  let startTime = null

  const startTimer = () => {
    isRunning.value = true
    startTime = new Date().getTime() - difference
    interval = setInterval(getTime, 1)
  }

  const stopTimer = () => {
    isRunning.value = false
    clearInterval(interval)
  }

  const resetTimer = () => {
    isRunning.value = false
    clearInterval(interval)
    difference = 0
    hours.value = '00'
    min.value = '00'
    sec.value = '00'
    millsec.value = '00'
  }

  const getTime = () => {
    let updatedTime = new Date().getTime()
    difference = updatedTime - startTime

    let h = Math.floor((difference / (1000 * 60 * 60)) % 24)
    let m = Math.floor((difference / (1000 * 60)) % 60)
    let s = Math.floor((difference / 1000) % 60)
    let mlsec = (Math.floor(difference % 1000) / 10).toFixed(0)
    hours.value = formatTime(h)
    min.value = formatTime(m)
    sec.value = formatTime(s)
    millsec.value = formatTime(mlsec === '100' ? '99' : mlsec)
  }

  return {
    hours,
    min,
    sec,
    millsec,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  }
}

export default useStopwatch
