<script setup>
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const { errors } = storeToRefs(useAuthStore())
const { resetPassword } = useAuthStore()
const route = useRoute()
const formData = reactive({
  email: '',
  password: '',
  password_confirmation: '',
  token: ''
})
onMounted(() => {
  errors.value = {}
  formData.email = route.query.email
  formData.token = route.query.token
})
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Reset Password</h4>
      </div>
      <form @submit.prevent="resetPassword(formData)">
        <div class="card-body">
          <div class="mb-3">
            <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
            <input
              v-model="formData.email"
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter email"
              required
            />
            <div class="text-danger" v-if="errors.email">{{ errors.email[0] }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label"
              >Password <span class="text-danger">*</span></label
            >
            <input
              v-model="formData.password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter password"
              required
            />
            <div class="text-danger" v-if="errors.password">{{ errors.password[0] }}</div>
          </div>
          <div class="mb-3">
            <label for="password_confirmation" class="form-label"
              >Password confirmation <span class="text-danger">*</span></label
            >
            <input
              v-model="formData.password_confirmation"
              type="password"
              class="form-control"
              id="password_confirmation"
              placeholder="Enter password confirmation"
              required
            />
            <div class="text-danger" v-if="errors.password_confirmation">
              {{ errors.password_confirmation[0] }}
            </div>
          </div>
          <input type="hidden" v-model="formData.token" />
          <div class="mb-3">
            <button type="submit" class="btn btn-primary me-2">Reset</button>
            <RouterLink :to="{ name: 'login' }" class="btn btn-secondary">Cancel</RouterLink>
            <RouterLink class="m-lg-2" :to="{ name: 'register' }">New?</RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
