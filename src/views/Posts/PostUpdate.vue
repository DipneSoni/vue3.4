<script setup>
import { reactive, ref, onMounted } from 'vue'
import { usePostStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PostFields from './PostFields.vue'
const { errors } = storeToRefs(usePostStore())
const { getPost, updatePost } = usePostStore()
const { user } = storeToRefs(useAuthStore())
const route = useRoute()
const router = useRouter()
const post = ref(null)
const formData = reactive({
  title: '',
  body: ''
})
onMounted(async () => {
  post.value = await getPost(route.params.id)
  if (user.value.id === post.value.user_id) {
    formData.title = post.value.title
    formData.body = post.value.body
  } else {
    router.push({ name: 'PostIndex' })
  }
})
</script>
<template>
  <main>
    <div class="container pt-5 pb-5">
      <div class="card">
        <div class="card-header"><h2 class="mb-4">Edit Post</h2></div>
        <div class="card-body">
          <form @submit.prevent="updatePost(post, formData)">
            <PostFields :formData="formData" :errors="errors" />
            <button class="btn btn-primary">Update Post</button>
            <RouterLink :to="{ name: 'PostIndex' }" class="m-lg-2 btn btn-secondary"
              >Cancel</RouterLink
            >
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
