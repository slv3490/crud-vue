<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref("")
const email = ref("");
const password = ref("");

const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value
    })

    router.push({name: "dashboard"})
  } catch (error: any) {
    alert(error.message)
  }
}
</script>

<template>
  <main>
      <div class="form-container">
      <h3>Welcome Back!</h3>

      <form @submit.prevent="submit">
        <section class="form-section">
          <label for="name">Name</label>
          <input type="name" placeholder="Enter your name" v-model="name" id="name">
        </section>

        <section class="form-section">
          <label for="email">Email</label>
          <input type="email" placeholder="Enter your email address" v-model="email" id="email">
        </section>

        <section class="form-section">
          <label for="password">Password</label>
          <input type="password" placeholder="Enter password" v-model="password" id="password">
        </section>

        <button type="submit">Register</button>
      </form>
    </div>
  </main>
</template>

<style>

</style>
