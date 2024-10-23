<script setup>
import { useAuthStore } from '@/stores/auth'
import { RouterLink, RouterView } from 'vue-router'
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
        </ul>
        <ul class="navbar-nav">
          <li class="text-center" v-if="authStore.user">
            <RouterLink class="nav-link active" :to="{ name: 'home' }"
              >Welcome, {{ authStore.user.name }}</RouterLink
            >
          </li>
          <li class="nav-item" v-if="authStore.user">
            <RouterLink class="nav-link" :to="{ name: 'StudentIndex' }">Students</RouterLink>
          </li>
          <li class="nav-item" v-if="authStore.user">
            <form @submit.prevent="authStore.logout">
              <button class="btn nav-link">Logout</button>
            </form>
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
