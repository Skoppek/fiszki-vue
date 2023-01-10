<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
import SignUpView from './views/SignUpView.vue'
import LoginView from './views/LoginView.vue'
import UserView from './views/UserView.vue'
</script>

<script>
export default {
  name: 'App',
  components: {
    HomeView,
    SignUpView,
    LoginView,
    UserView
  }
}
</script>

<template>
  <RouterView />
</template>

<style>

</style>
