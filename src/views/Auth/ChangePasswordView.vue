<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { onMounted, reactive } from 'vue'
const { errors } = storeToRefs(useAuthStore())
const { changePassword } = useAuthStore()
const formData = reactive({
  old_password: '',
  password: '',
  password_confirmation: ''
})
onMounted(() => {
  errors.value = {}
})
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Change Password</h4>
      </div>
      <form @submit.prevent="changePassword(formData)">
        <div class="card-body">
          <div class="form-floating mb-3">
            <input
              v-model="formData.old_password"
              type="password"
              class="form-control"
              id="old_password"
              placeholder="Enter current password"
              required
            />
            <label for="old_password" class="form-label"
              >Old password <span class="text-danger">*</span></label
            >
            <div class="text-danger" v-if="errors.old_password">{{ errors.old_password[0] }}</div>
          </div>
          <div class="form-floating mb-3">
            <input
              v-model="formData.password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter new password"
              required
            />
            <label for="password" class="form-label"
              >New password <span class="text-danger">*</span></label
            >
            <div class="text-danger" v-if="errors.password">{{ errors.password[0] }}</div>
          </div>
          <div class="form-floating mb-3">
            <input
              v-model="formData.password_confirmation"
              type="password"
              class="form-control"
              id="password_confirmation"
              placeholder="Enter password confirmation"
              required
            />
            <label for="password_confirmation" class="form-label"
              >Password confirmation <span class="text-danger">*</span></label
            >
            <div class="text-danger" v-if="errors.password_confirmation">
              {{ errors.password_confirmation[0] }}
            </div>
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary me-2">Change Password</button>
            <RouterLink class="btn btn-secondary" :to="{ name: 'home' }">Cancel</RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
