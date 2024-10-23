<script setup>
import axios from 'axios'
import NavBar from './components/NavBar.vue'
import FooterView from './views/FooterView.vue'

import SpinnerView from './components/SpinnerView.vue'
import isLoading from './loadingState' // Import global loading state
// Set up Axios interceptors to manage the global loading state
axios.interceptors.request.use(
  (config) => {
    isLoading.value = true // Show the spinner when request is sent
    return config
  },
  (error) => {
    isLoading.value = false // Hide the spinner if request fails
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    isLoading.value = false // Hide the spinner when response is received
    return response
  },
  (error) => {
    isLoading.value = false // Hide the spinner on response error
    return Promise.reject(error)
  }
)
</script>

<template>
  <NavBar />
  <SpinnerView />
  <FooterView />
</template>
