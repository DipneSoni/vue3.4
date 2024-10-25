<script setup>
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { errors, user } = storeToRefs(useAuthStore())
const { updateProfile } = useAuthStore()
const formData = reactive({
  name: '',
  email: ''
})
onMounted(() => {
  errors.value = {}
  formData.name = user.value.name
  formData.email = user.value.email
})
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Profile</h4>
      </div>
      <form @submit.prevent="updateProfile(formData)">
        <div class="card-body">
          <div class="form-floating mb-3">
            <input
              v-model="formData.name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter name"
              required
            />
            <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
            <div class="text-danger" v-if="errors.name">{{ errors.name[0] }}</div>
          </div>
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
          <div class="mb-3">
            <button type="submit" class="btn btn-primary me-2">Update Profile</button>
            <RouterLink class="btn btn-secondary" :to="{ name: 'home' }">Cancel</RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
