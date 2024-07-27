<template>
  <div id="application-wrapper">
    <header></header>
    <main>
      <Posts />
    </main>
    <footer></footer>
  </div>
</template>

<script>
import Posts from './views/Posts.vue'
export default {
  components: {
    Posts,
  },
}
</script>

<style scoped></style>
