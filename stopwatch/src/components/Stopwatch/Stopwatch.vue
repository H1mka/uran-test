<template>
  <div class="stopwatch-item">
    <div class="stopwatch-body">
      <div class="stopwatch-time">
        {{ time }}
      </div>
      <div class="stopwatch-points">
        <StopwatchPoints v-model="timerPoints" />
      </div>
    </div>
    <div class="stopwatch-actions">
      <button @click="handleTimer">
        {{ isRunning ? 'Stop' : 'Start' }}
      </button>
      <button @click="handleReset">Reset</button>
      <button @click="createPoint" :disabled="!isRunning">Add lap</button>
    </div>
  </div>
</template>

<script>
import StopwatchPoints from './StopwatchPoints.vue'
import AppIconButton from '../App/AppIconButton.vue'
import { v4 as uuidv4 } from 'uuid'
import { mdiPlay } from '@mdi/js'
import { useStopwatch } from '../../hooks'

export default {
  components: {
    StopwatchPoints,
    AppIconButton,
  },
  data() {
    return {
      icons: {
        mdiPlay,
      },
      timerPoints: [],
    }
  },
  methods: {
    handleTimer() {
      if (this.isRunning) this.stopTimer()
      else this.startTimer()
    },
    handleReset() {
      this.resetTimer()
      this.timerPoints = []
    },
    createPoint() {
      if (!this.isRunning) return

      this.timerPoints.unshift({
        id: uuidv4(),
        time: this.time,
      })
    },
  },
  computed: {
    time() {
      return `${this.hours}:${this.min}:${this.sec}:${this.millsec}`
    },
  },
  setup() {
    const {
      hours,
      min,
      sec,
      millsec,
      isRunning,
      startTimer,
      stopTimer,
      resetTimer,
    } = useStopwatch()
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
  },
}
</script>

<style lang="scss" scoped>
.stopwatch-item {
  max-width: 300px;
  width: 100%;
  padding: 16px;
  border: 2px solid black;
  border-radius: 12px;

  .stopwatch-time {
    font-size: 24px;
    text-align: center;
  }

  .stopwatch-actions {
    display: flex;
    justify-content: center;
    gap: 8px;
    button {
      padding: 10px 20px;
      font-size: 1em;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s;

      &:hover {
        background-color: #bdc3c7;
      }
    }
  }

  .stopwatch-points {
    padding: 0px 8px;
    margin-bottom: 16px;
    height: 200px;
    overflow-y: auto;
  }
}
</style>
