import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const usePostStore = defineStore('postStore', {
  state: () => {
    return {
      errors: {}
    }
  },
  actions: {
    /** Create a post */
    async createPost(formData) {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/posts`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.router.push({ name: 'PostIndex' })
        //console.log(res.data)
      } catch (errors) {
        this.errors = errors.response.data.errors
      }
    },

    /** Get all posts */
    async getPosts() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts`)
        //console.log(res.data.data)
        return res.data.data
      } catch (errors) {
        this.errors = errors.response.data.errors
      }
    },

    /** Get a post */
    async getPost(post) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/${post}`)
        //console.log(res.data.data)
        return res.data.data
      } catch (errors) {
        this.errors = errors.response.data.errors
      }
    },

    /** Delete a post */
    async deletePost(post) {
      try {
        if (confirm('Are you sure, to delete this post?')) {
          const authStore = useAuthStore()
          if (authStore.user.id === post.user_id) {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/posts/${post.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
          }
          this.router.push({ name: 'PostIndex' })
        }
        //console.log(res.data.data)
        //return res.data.data
      } catch (errors) {
        this.errors = errors.response.data.errors
      }
    },

    /** Update a post */
    async updatePost(post, formData) {
      try {
        const authStore = useAuthStore()
        if (authStore.user.id === post.user_id) {
          await axios.put(`${import.meta.env.VITE_API_BASE_URL}/posts/${post.id}`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          this.router.push({ name: 'PostIndex' })
          //console.log(res.data)
        }
      } catch (errors) {
        this.errors = errors.response.data.errors
      }
    }
  }
})
