<script setup>
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { errors } = storeToRefs(useAuthStore())
const { sendResetLinkEmail } = useAuthStore()

const formData = reactive({
  email: ''
})
onMounted(() => {
  errors.value = {}
})
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Forgot Password</h4>
      </div>
      <form @submit.prevent="sendResetLinkEmail(formData)">
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
            <button type="submit" class="btn btn-primary me-2">Send Me Reset Link Email</button>
            <RouterLink :to="{ name: 'login' }" class="btn btn-secondary">Cancel</RouterLink>
            <RouterLink class="m-lg-2" :to="{ name: 'register' }">New?</RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
