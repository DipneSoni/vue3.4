<script setup>
import { reactive } from 'vue'
import { usePostStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'
import PostFields from './PostFields.vue'

const formData = reactive({
  title: '',
  body: ''
})
const { errors } = storeToRefs(usePostStore())
const { createPost } = usePostStore()
</script>
<template>
  <main>
    <div class="container pt-5 pb-5">
      <div class="card">
        <div class="card-header"><h2 class="mb-4">Create Post</h2></div>
        <div class="card-body">
          <form @submit.prevent="createPost(formData)">
            <PostFields :formData="formData" :errors="errors" />
            <button class="btn btn-primary">Create Post</button>
            <RouterLink :to="{ name: 'PostIndex' }" class="m-lg-2 btn btn-secondary"
              >Cancel</RouterLink
            >
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
