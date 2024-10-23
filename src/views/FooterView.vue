<script setup>
import { ref } from 'vue'
const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <!-- Footer -->
  <footer class="bg-dark text-white py-4">
    <div class="container text-center">
      <p class="mb-0">© {{ currentYear }} My Company. All Rights Reserved.</p>
    </div>
  </footer>
</template>
