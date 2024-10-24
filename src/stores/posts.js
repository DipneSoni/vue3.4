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
        const res = await axios.post(`/api/posts`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.router.push({ name: 'PostIndex' })
        Toastify({ text: res.data.message }).showToast()
      } catch (errors) {
        this.errors = errors.response.data.errors
      }
    },

    /** Get all posts */
    async getPosts(url) {
      try {
        const res = await axios.get(`${url}`)
        return res.data.data
      } catch (errors) {
        this.errors = errors.response.data.errors
      }
    },

    /** Get a post */
    async getPost(post) {
      try {
        const res = await axios.get(`/api/posts/${post}`)
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
            const res = await axios.delete(`/api/posts/${post.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            Toastify({ text: res.data.message }).showToast()
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
          const res = await axios.put(`/api/posts/${post.id}`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          this.router.push({ name: 'PostIndex' })
          Toastify({ text: res.data.message }).showToast()
          //console.log(res.data)
        }
      } catch (errors) {
        this.errors = errors.response.data.errors
      }
    }
  }
})
