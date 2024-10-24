<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import StudentFields from './StudentFields.vue'

const route = useRoute()
const router = useRouter()

const id = ref(route.params.id)
const formData = reactive({
  name: '',
  email: '',
  birthdate: ''
})

onMounted(() => {
  editStudent()
})
const editStudent = async () => {
  axios
    .get(`/api/students/${id.value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(function (response) {
      formData.name = response.data.name
      formData.email = response.data.email
      formData.birthdate = response.data.birthdate
    })
    .catch(function (error) {
      Toastify({ text: error }).showToast()
    })
}
const updateStudent = async () => {
  axios
    .put(`/api/students/${id.value}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(function (response) {
      if (response.status === 200) {
        router.push('/students')
        Toastify({ text: 'Student updated.' })
      }
    })
    .catch(function (error) {
      Toastify({ text: error })
    })
}
</script>

<template>
  <div class="continer">
    <div class="card">
      <div class="card-header">
        <h4>Edit Student</h4>
      </div>
      <form @submit.prevent="updateStudent">
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
