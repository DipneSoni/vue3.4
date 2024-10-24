<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  formData: Object,
  errors: Object
})
</script>
<template>
  <div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="title"
        placeholder="Post title"
        v-model="formData.title"
        required
      />
      <label for="title">Title <span class="text-danger">*</span></label>
      <p v-if="errors.title" class="text-danger">{{ errors.title[0] }}</p>
    </div>
    <div class="form-floating mb-3">
      <textarea
        class="form-control"
        id="body"
        placeholder="Post body"
        v-model="formData.body"
        required
        style="height: 200px"
      ></textarea>
      <label for="body">Body <span class="text-danger">*</span></label>
      <p v-if="errors.body" class="text-danger">{{ errors.body[0] }}</p>
    </div>
  </div>
</template>
