<script setup>
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { errors } = storeToRefs(useAuthStore())
const { authenticate } = useAuthStore()
const { navigateToHome } = useAuthStore()
const formData = reactive({
  name: '',
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
        <h4>Register</h4>
      </div>
      <form @submit.prevent="authenticate('register', formData)">
        <div class="card-body">
          <div class="mb-3">
            <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
            <input
              v-model="formData.name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter name"
              required
            />
            <div class="text-danger" v-if="errors.name">{{ errors.name[0] }}</div>
          </div>
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
            <button type="submit" class="btn btn-primary me-2">Register</button>
            <button type="button" @click="navigateToHome()" class="btn btn-secondary">
              Cancel
            </button>
            <RouterLink class="m-lg-2" :to="{ name: 'login' }">Already register?</RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
