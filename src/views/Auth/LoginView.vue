<script setup>
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { errors } = storeToRefs(useAuthStore())
const { authenticate } = useAuthStore()
const formData = reactive({
  email: '',
  password: ''
})
onMounted(() => {
  errors.value = {}
})
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Login</h4>
      </div>
      <form @submit.prevent="authenticate('login', formData)">
        <div class="card-body">
          <div class="form-floating mb-3">
            <input
              v-model="formData.email"
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter email"
              required
            />
            <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
            <div class="text-danger" v-if="errors.email">{{ errors.email[0] }}</div>
          </div>
          <div class="form-floating mb-3">
            <input
              v-model="formData.password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter password"
              required
            />
            <label for="password" class="form-label"
              >Password <span class="text-danger">*</span></label
            >
            <div class="text-danger" v-if="errors.password">{{ errors.password[0] }}</div>
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary me-2">Login</button>
            <RouterLink class="btn btn-secondary" :to="{ name: 'home' }">Cancel</RouterLink>
            <RouterLink class="m-lg-2" :to="{ name: 'register' }">New?</RouterLink>
            <RouterLink class="m-lg-2" :to="{ name: 'ForgotPassword' }"
              >Forgot password?</RouterLink
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
