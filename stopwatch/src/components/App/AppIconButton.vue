<template>
  <svg :width="width" :height="height" viewBox="0 0 24 24">
    <path :d="icon" :fill="fill" />
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
      default: '',
    },
    width: {
      type: Number,
      default: 32,
    },
    height: {
      type: Number,
      default: 32,
    },
    fill: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style scoped>
svg {
  cursor: pointer;
}
</style>
