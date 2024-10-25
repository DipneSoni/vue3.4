<script setup>
import { usePostStore } from '@/stores/posts'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { formatDate } from '@/utils.js'
const posts = ref([])
const pagination = ref({})
const postStore = usePostStore()
const search = ref('')
const getPosts = async (pageUrl = '/api/posts') => {
  try {
    const res = await postStore.getPosts(pageUrl)
    posts.value = res.data
    pagination.value = res
    console.log(pagination.value)
  } catch (error) {
    console.error(error)
  }
}
const searchBy = () => {
  getPosts(`/api/posts?search=${search.value}`)
}
onMounted(async () => {
  getPosts()
})
const truncatedBody = (body) => {
  return body.length > 30 ? body.substring(0, 30) + '...' : body
}
</script>
<template>
  <main>
    <div class="container pt-5">
      <!-- Heading for the Posts Section -->
      <h2 class="mb-4">Posts</h2>

      <!-- Create Post Button -->
      <RouterLink class="btn btn-dark float-end mb-3" :to="{ name: 'PostCreate' }"
        >Create Post</RouterLink
      >

      <!-- Search Bar -->
      <div class="row justify-content-end mb-3">
        <div class="col-auto">
          <div class="input-group">
            <input
              type="search"
              class="form-control mx-2"
              placeholder="Search"
              aria-label="Search"
              v-model="search"
            />
            <button class="btn btn-primary" type="button" @click="searchBy()">Search</button>
          </div>
        </div>
      </div>

      <!-- Post Listings -->
      <div v-if="posts.length > 0" class="row">
        <div v-for="post in posts" :key="post.id" class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">{{ post.title }}</h3>
              <p class="card-text">
                <small class="text-secondary">Author: {{ post.user.name }}</small>
              </p>
              <p class="card-text">
                <small class="text-secondary"
                  >Published on: {{ formatDate(post.created_at) }}</small
                >
              </p>
              <p class="card-text">
                {{ truncatedBody(post.body) }}
                <RouterLink
                  class="text-primary link-underline"
                  :to="{ name: 'PostShow', params: { id: post.id } }"
                >
                  Read more...
                </RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- No Posts Found Message -->
      <div v-else>
        <h3>No posts found</h3>
      </div>

      <!-- Pagination Controls (only render if pagination is available) -->
      <nav aria-label="Page navigation" v-if="pagination.total > 9">
        <ul class="pagination justify-content-center">
          <li
            class="page-item"
            v-for="link in pagination.links"
            :key="link.label"
            :class="{ active: link.active, disabled: !link.url }"
          >
            <button
              class="page-link"
              v-if="link.url && !link.active"
              @click="getPosts(link.url)"
              v-html="link.label"
            ></button>
            <span class="page-link" v-else v-html="link.label"> </span>
          </li>
        </ul>
      </nav>
    </div>
  </main>
</template>
