<template>
  <ul>
    <li v-for="(point, index) in pointsList" :key="point.id">
      <span>{{ prepareIndex(pointsList.length - index) }}</span>
      <span>{{ point.time }}</span>
      <AppIconButton
        :icon="icons['mdiDeleteOutline']"
        :width="24"
        :height="24"
        fill="#e74c3c"
        @click="deletePoint(point.id)"
      />
    </li>
  </ul>
</template>

<script>
import AppIconButton from '../App/AppIconButton.vue'
import { mdiDeleteOutline } from '@mdi/js'

export default {
  components: {
    AppIconButton,
  },
  props: {
    modelValue: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      icons: {
        mdiDeleteOutline,
      },
    }
  },
  computed: {
    pointsList: {
      get() {
        return this.modelValue
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue)
      },
    },
  },
  methods: {
    prepareIndex(index) {
      return index >= 10 ? index : '0' + index
    },
    deletePoint(id) {
      this.pointsList = this.pointsList.filter((item) => item.id !== id)
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  li {
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  button {
    background-color: #e74c3c;
    border-radius: 100%;
    border: 1px solid #e74c3c;
    cursor: pointer;
  }
}
</style>
