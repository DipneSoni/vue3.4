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
        Swal.fire(res.data.message)
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
        const confirm = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0B5ED7',
          cancelButtonColor: '#BC2D3B',
          confirmButtonText: 'Yes, delete it!'
        })
        if (confirm.value) {
          const authStore = useAuthStore()
          if (authStore.user.id === post.user_id) {
            const res = await axios.delete(`/api/posts/${post.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            Swal.fire(res.data.message)
          }
          this.router.push({ name: 'PostIndex' })
        }
        //console.log(res.data.data)
        //return res.data.data
      } catch (errors) {
        if (errors.response.data.errors) {
          this.errors = errors.response.data.errors
        }
        Swal.fire(res)
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
          Swal.fire(res.data.message)
          //console.log(res.data)
        }
      } catch (errors) {
        this.errors = errors.response.data.errors
      }
    }
  }
})
