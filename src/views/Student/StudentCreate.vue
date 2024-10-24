<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import StudentFields from './StudentFields.vue'
import StudentIndex from './StudentIndex.vue'
const formData = reactive({
  name: '',
  email: '',
  birthdate: ''
})
const router = useRouter()
const addStudent = async () => {
  axios
    .post(`/api/students`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(function (response) {
      if (response.status === 201) {
        Toastify({ text: 'Student saved.' }).showToast()
        router.push('/students')
      }
    })
    .catch(function (error) {
      Toastify({ text: error }).showToast()
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
          <StudentFields :formData="formData" />
          <div class="mb-3">
            <button type="submit" class="btn btn-primary me-2">Save</button>
            <RouterLink :to="{ name: 'StudentIndex' }" class="btn btn-secondary">Cancel</RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
