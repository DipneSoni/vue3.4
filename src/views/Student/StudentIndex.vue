<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { formatDate } from "@/utils.js";

const students = ref([]); // Holds the list of students
const pagination = ref({});
const sortKey = ref("id");
const sortOrder = ref("DESC");
const search = ref("");

const searchBy = () => {
  //if (search.value != '') {
  sortKey.value = sortKey.value ?? "id";
  sortOrder.value = sortOrder.value ?? "DESC";
  fetchStudents(1, sortKey.value, sortOrder.value, search.value);
  //}
};

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "ASC" ? "DESC" : "ASC";
  } else {
    sortKey.value = key;
    sortOrder.value = "DESC";
  }
  fetchStudents(1, sortKey.value, sortOrder.value, search.value);
};

const fetchStudents = async (
  page = 1,
  sortKey = "id",
  sortOrder = "DESC",
  search = ""
) => {
  try {
    const response = await axios.get(
      `/api/students?page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    students.value = response.data.data; // student data
    pagination.value = response.data;
  } catch (err) {
    console.error("Facing error while fetching data: " + err);
  }
};
// Navigate to the previous or next page
const changePage = (url) => {
  const page = getPageIdFromUrl(url);
  fetchStudents(page);
};
onMounted(() => {
  fetchStudents();
});
const getPageIdFromUrl = (url) => {
  if (url) {
    const urlObject = new URL(url);
    return urlObject.searchParams.get("page");
  }
  return null;
};

const deleteStudent = async (studentId) => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0B5ED7",
    cancelButtonColor: "#BC2D3B",
    confirmButtonText: "Yes, delete it!",
  });
  if (confirm.value) {
    axios
      .delete(`/api/students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          Swal.fire("Student deleted.");
          fetchStudents();
        }
      })
      .catch((error) => {
        Swal.fire(error);
      });
  }
};
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
        <div class="row justify-content-end mb-3">
          <div class="col-auto">
            <div class="input-group">
              <input
                type="search"
                class="form-control mx-2"
                placeholder="Search"
                aria-label="Search"
                v-model="search"
              />
              <button class="btn btn-primary" type="button" @click="searchBy()">
                Search
              </button>
            </div>
          </div>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="text-primary" @click="sortBy('id')" style="cursor: pointer">
                Id
              </th>
              <th class="text-primary" @click="sortBy('name')" style="cursor: pointer">
                Name
              </th>
              <th class="text-primary" @click="sortBy('email')" style="cursor: pointer">
                Email
              </th>
              <th
                class="text-primary"
                @click="sortBy('birthdate')"
                style="cursor: pointer"
              >
                Birthdate
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="students.length > 0">
            <tr v-for="student in students" :key="student.id">
              <td>{{ student.id }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.email }}</td>
              <td>{{ formatDate(student.birthdate) }}</td>
              <td>
                <RouterLink
                  class="btn btn-success me-2"
                  :to="`/students/${student.id}/edit`"
                  >Edit</RouterLink
                >
                <button class="btn btn-danger" @click="deleteStudent(student.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="text-center align-middle" colspan="5">No students found.</td>
            </tr>
          </tbody>
        </table>
        <!-- Pagination Controls -->
        <nav aria-label="Page navigation" v-if="pagination.total > 10">
          <ul class="pagination justify-content-center">
            <li
              class="page-item"
              v-for="link in pagination.links"
              :key="link.label"
              :class="{ active: link.active, disabled: !link.url }"
            >
              <button
                class="page-link"
                v-if="link.url && !link.active"
                @click="changePage(link.url)"
                v-html="link.label"
              ></button>
              <span class="page-link" v-else v-html="link.label"> </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
