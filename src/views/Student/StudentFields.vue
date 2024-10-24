<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  formData: Object
})
</script>
<template>
  <div class="form-floating mb-3">
    <input
      v-model="formData.name"
      type="text"
      class="form-control"
      id="name"
      placeholder="Enter name"
      required
    />
    <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
  </div>
  <div class="form-floating mb-3">
    <input
      v-model="formData.email"
      type="email"
      class="form-control"
      id="email"
      placeholder="Enter email"
      required
    />
    <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
  </div>
  <div class="form-floating mb-3">
    <input
      v-model="formData.birthdate"
      type="date"
      class="form-control"
      id="birthdate"
      placeholder="Enter birthdate"
      required
    />
    <label for="birthdate" class="form-label">Birthdate <span class="text-danger">*</span></label>
  </div>
</template>
