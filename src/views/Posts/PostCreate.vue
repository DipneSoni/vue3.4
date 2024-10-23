<script setup>
import { reactive } from 'vue'
import { usePostStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'

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
        <div class="card-header">Create Post</div>
        <div class="card-body">
          <form @submit.prevent="createPost(formData)">
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
            <button class="btn btn-primary">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
