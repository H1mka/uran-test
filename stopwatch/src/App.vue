<template>
  <div id="application-wrapper">
    <header></header>
    <main>
      <StopwatchList />
    </main>
    <footer></footer>
  </div>
</template>

<script>
// import Stopwatch from './components/Stopwatch/Stopwatch.vue'
import StopwatchList from './components/Stopwatch/StopwatchList.vue'

export default {
  components: { StopwatchList },
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
