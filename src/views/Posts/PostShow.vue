<script setup>
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/posts'
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
      <div v-if="post">
        <div class="card-body pb-5">
          <h3>{{ post.title }}</h3>
          <p>
            <small>Author {{ post.user.name }}</small>
          </p>
          <p>{{ post.body }}</p>
          <div class="d-flex">
            <div>
              <RouterLink class="btn btn-secondary mx-2" :to="{ name: 'PostIndex' }"
                >Back</RouterLink
              >
            </div>
            <div class="d-flex" v-if="authStore.user && authStore.user.id === post.user_id">
              <form @submit.prevent="deletePost(post)">
                <button class="btn btn-danger">Delete</button>
              </form>
              <RouterLink
                class="btn btn-primary mx-2"
                :to="{ name: 'PostUpdate', params: { id: post.id } }"
                >Edit</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h3 class="d-flex text-center justify-content-center pb-5">No post found</h3>
      </div>
    </div>
  </main>
</template>
