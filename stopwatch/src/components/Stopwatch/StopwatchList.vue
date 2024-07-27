<template>
  <div class="stopwatch-wrapper">
    <div class="add-button-wrapper">
      <button class="add-button" @click="addStopwatch">Add Stopwatch</button>
    </div>
    <div class="stopwatch-list">
      <Stopwatch
        v-for="item in list"
        ref="stopwatches"
        :key="item.id"
        @mouseenter="handleMouseEnter"
      />
    </div>
  </div>
</template>

<script>
import AppIconButton from '../App/AppIconButton.vue'
import Stopwatch from './Stopwatch.vue'
import { mdiPlus } from '@mdi/js'
import { v4 as uuidv4 } from 'uuid'

export default {
  components: {
    Stopwatch,
    AppIconButton,
  },
  data() {
    return {
      list: [
        {
          id: uuidv4(),
        },
      ],
      lastStopwatchRef: null,
      icons: {
        mdiPlus,
      },
    }
  },
  created() {
    window.addEventListener('keypress', this.handleKeyPress)
  },
  beforeUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress)
  },
  methods: {
    addStopwatch() {
      this.list.push({
        id: uuidv4(),
      })
    },
    handleKeyPress(event) {
      if (!this.lastStopwatchRef || typeof this.lastStopwatchRef !== 'object')
        return
      const { handleTimer, createPoint, handleReset } = this.lastStopwatchRef

      switch (event.code) {
        case 'KeyS':
          if (typeof handleTimer === 'function') handleTimer()
          break
        case 'KeyL':
          if (typeof createPoint === 'function') createPoint()
          break
        case 'KeyR':
          if (typeof handleReset === 'function') handleReset()
          break
      }
    },
    handleMouseEnter(event) {
      // find stopwatch where was mouse
      const stopwatch = this.$refs.stopwatches.find((ref) => {
        return ref.$el.contains(event.target)
      })
      this.lastStopwatchRef = stopwatch
    },
  },
}
</script>

<style lang="scss" scoped>
.add-button-wrapper {
  text-align: center;
  .add-button {
    width: 400px;
    padding: 10px 20px;
    margin-bottom: 20px;
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

.stopwatch-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
