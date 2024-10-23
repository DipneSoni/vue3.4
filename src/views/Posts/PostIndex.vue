<script setup>
import { usePostStore } from '@/stores/posts'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const posts = ref([])
const postStore = usePostStore()
onMounted(async () => {
  posts.value = await postStore.getPosts()
})
</script>
<template>
  <main>
    <div class="container pt-5">
      <RouterLink class="btn btn-dark float-end" :to="{ name: 'PostCreate' }"
        >Create Post</RouterLink
      >
      <div v-if="posts.length > 0">
        <div v-for="post in posts" :key="post.id">
          <div class="card-body pb-3">
            <h3>{{ post.title }}</h3>
            <p>
              <small class="text-secondary">Author {{ post.user.name }}</small>
            </p>
            <p>
              {{ post.body }}
              <RouterLink
                class="text-primary link-underline"
                :to="{ name: 'PostShow', params: { id: post.id } }"
                >Read more...</RouterLink
              >
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <h3>No post found</h3>
      </div>
    </div>
  </main>
</template>
