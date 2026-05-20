<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");

const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  try {
    await auth.login({
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
          <label for="email">Email</label>
          <input type="email" placeholder="Enter your email address" v-model="email">
        </section>

        <section class="form-section">
          <label for="password">Password</label>
          <input type="password" placeholder="Enter password" v-model="password">
        </section>

        <button>Log In</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
  
</style>