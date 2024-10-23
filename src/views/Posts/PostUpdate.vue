<script setup>
import { reactive, ref, onMounted } from 'vue'
import { usePostStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
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
        <div class="card-header">Update Post</div>
        <div class="card-body">
          <form @submit.prevent="updatePost(post, formData)">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Post title"
                v-model="formData.title"
                required
              />
              <label for="floatingInput">Title <span class="text-danger">*</span></label>
              <p v-if="errors.title" class="text-danger">{{ errors.title[0] }}</p>
            </div>
            <div class="form-floating mb-3">
              <textarea
                class="form-control"
                id="body"
                placeholder="Post body"
                v-model="formData.body"
                required
              ></textarea>
              <label for="body">Body <span class="text-danger">*</span></label>
              <p v-if="errors.body" class="text-danger">{{ errors.body[0] }}</p>
            </div>
            <button class="btn btn-primary">Update Post</button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
