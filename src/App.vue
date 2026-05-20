<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore';

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()

  router.push({name: "login"})
}
</script>

<template>
  <div class="layout">
    <div class="bg-img"></div>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/" class="anchor-animation">Login</RouterLink>
          <p class="separation"> | </p>
          <RouterLink to="/register" class="anchor-animation">Register</RouterLink>
          <template v-if="auth.isAuthenticated">
            <p class="separation"> | </p>
            <RouterLink :to="{name: 'dashboard'}" class="anchor-animation">Dashboard</RouterLink>
            <p class="separation"> | </p>
            <button @click="logout" class="anchor-animation">Log out</button>
          </template>
        </nav>
      </div>
    </header>

      <RouterView />
  </div>
</template>

<style scoped>
button {
  font-size: 30px;
  font-weight: 100;
  padding: 3px 10px;
  margin: 0;
}
nav {
  display: flex;
  font-size: 30px;
  margin-top: 40px;
}
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  max-width: 1200px;
  text-align: center;
}
.bg-img {
  position: absolute;
  right: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("./fondocrudvuelaravel.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: -1;
}
.separation {
  margin: 0 20px;
  color: #005d3e;
}
.anchor-animation {
  position: relative;
  text-decoration: none;
}
.anchor-animation::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #00BD7E;
  transition: width 0.3s ease;
}

.router-link-exact-active::after {
  width: 100%;
}
</style>
