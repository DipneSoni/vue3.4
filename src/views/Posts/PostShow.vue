<script setup>
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/posts'
import { formatDate } from '@/utils'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const authStore = useAuthStore()
const route = useRoute()
const post = ref(null)
const { getPost, deletePost } = usePostStore()
onMounted(async () => {
  post.value = await getPost(route.params.id)
})
</script>
<template>
  <main>
    <div class="container pt-5">
      <h2 class="mb-4">Post Detail</h2>
      <div v-if="post" class="card mb-4">
        <div class="card-body">
          <h3 class="card-title">{{ post.title }}</h3>
          <p class="card-text">
            <small class="text-secondary">Author: {{ post.user.name }}</small>
          </p>
          <p class="card-text">
            <small class="text-secondary">Published on: {{ formatDate(post.created_at) }}</small>
          </p>
          <p class="card-text">{{ post.body }}</p>
          <div class="d-flex justify-content-between mt-4">
            <RouterLink class="btn btn-secondary" :to="{ name: 'PostIndex' }">Back</RouterLink>

            <div v-if="authStore.user && authStore.user.id === post.user_id" class="d-flex">
              <form @submit.prevent="deletePost(post)" class="me-2">
                <button type="submit" class="btn btn-danger">Delete</button>
              </form>
              <RouterLink
                class="btn btn-primary"
                :to="{ name: 'PostUpdate', params: { id: post.id } }"
                >Edit</RouterLink
              >
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <h3 class="text-center pb-5">No post found</h3>
      </div>
    </div>
  </main>
</template>
