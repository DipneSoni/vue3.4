<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const students = ref([]) // Holds the list of students
const currentPage = ref(1) // Current page number
const lastPage = ref(1) // Total number of pages
const nextPageUrl = ref(null) // Holds the next page URL
const prevPageUrl = ref(null) // Holds the previous page URL

const fetchStudents = async (page = 1) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/students?page=${page}`)
    students.value = response.data.data // student data
    currentPage.value = response.data.current_page // current page
    lastPage.value = response.data.last_page // total pages
    nextPageUrl.value = response.data.next_page_url // next page URL
    prevPageUrl.value = response.data.prev_page_url // previous page URL
  } catch (err) {
    console.error('Facing error while fetching data: ' + err)
  }
}
// Navigate to the previous or next page
const changePage = (page) => {
  fetchStudents(page)
}
onMounted(() => {
  fetchStudents()
})

const deleteStudent = (studentId) => {
  if (confirm('Are you sure you want to delete this student? This action cannot be undo.')) {
    axios
      .delete(`${import.meta.env.VITE_API_BASE_URL}/students/${studentId}`)
      .then((response) => {
        if (response.status === 204) {
          alert('Student deleted')
          fetchStudents()
        }
      })
      .catch((error) => {
        alert(error)
      })
  }
}
</script>

<template>
  <div class="continer">
    <div class="card">
      <div class="card-header">
        <h4>
          Students
          <RouterLink to="students/create" class="btn btn-primary float-end">
            Add Student
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Birthdate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="students.length > 0">
            <tr v-for="student in students" :key="student.id">
              <td>{{ student.id }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.birthdate }}</td>
              <td>
                <RouterLink class="btn btn-success me-2" :to="`/students/${student.id}/edit`"
                  >Edit</RouterLink
                >
                <button class="btn btn-danger" @click="deleteStudent(student.id)">Delete</button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="text-center align-middle" colspan="5">Loading...</td>
            </tr>
          </tbody>
        </table>
        <!-- Pagination Controls -->
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: !prevPageUrl }">
              <button
                class="page-link"
                @click="changePage(currentPage - 1)"
                :disabled="!prevPageUrl"
              >
                Previous
              </button>
            </li>
            <li
              v-for="page in lastPage"
              :key="page"
              class="page-item"
              :class="{ active: currentPage === page }"
            >
              <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: !nextPageUrl }">
              <button
                class="page-link"
                @click="changePage(currentPage + 1)"
                :disabled="!nextPageUrl"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
