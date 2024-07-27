<template>
  <div id="application-wrapper">
    <header></header>
    <main>
      <AuthForm />
    </main>
    <footer></footer>
  </div>
</template>

<script>
import AuthForm from './components/AuthForm.vue'
export default {
  components: {
    AuthForm,
  },
}
</script>

<style scoped></style>
