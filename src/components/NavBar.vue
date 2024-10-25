<script setup>
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: 'home' }">My Company</RouterLink>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'home' }">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'about' }">About Us</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'PostIndex' }">Posts</RouterLink>
          </li>
          <li class="nav-item" v-if="authStore.user">
            <RouterLink class="nav-link" :to="{ name: 'StudentIndex' }">Students</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item dropdown" v-if="authStore.user">
            <a
              class="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Welcome, {{ authStore.user.name }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="userDropdown">
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'profile' }">Profile</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'changePassword' }">Change Password</RouterLink>
              </li>
              <li>
                <form @submit.prevent="authStore.logout">
                  <button type="submit" class="dropdown-item">Logout</button>
                </form>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-if="!authStore.user">
            <RouterLink class="nav-link" :to="{ name: 'login' }">Login</RouterLink>
          </li>
          <li class="nav-item" v-if="!authStore.user">
            <RouterLink class="nav-link" :to="{ name: 'register' }">Register</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>
