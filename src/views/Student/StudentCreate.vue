<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const birthdate = ref('')
const router = useRouter()
const addStudent = async () => {
  axios
    .post(`${import.meta.env.VITE_API_BASE_URL}/students`, {
      name: name.value,
      email: email.value,
      birthdate: birthdate.value
    })
    .then(function (response) {
      name.value = ''
      email.value = ''
      birthdate.value = ''
      if (response.status === 201) {
        alert('Student saved.')
        router.push('/students')
      }
    })
    .catch(function (error) {
      alert(error)
    })
}
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Add Student</h4>
      </div>
      <form @submit.prevent="addStudent">
        <div class="card-body">
          <div class="mb-3">
            <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="birthdate" class="form-label"
              >Birthdate <span class="text-danger">*</span></label
            >
            <input
              v-model="birthdate"
              type="date"
              class="form-control"
              id="birthdate"
              placeholder="Enter birthdate"
              required
            />
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary me-2">Save</button>
            <button
              type="button"
              @click="
                () => {
                  router.push('/students')
                }
              "
              class="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
