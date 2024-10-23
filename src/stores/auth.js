import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: null,
      errors: {}
    }
  },
  actions: {
    /** getUser */
    async getUser() {
      if (localStorage.getItem('token')) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          this.user = res.data
        } catch (error) {
          alert(error)
        }
      }
    },
    /** Login & Register */
    async authenticate(apiRoute, formData) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/${apiRoute}`, formData)
        this.errors = {}
        this.user = res.data.user
        localStorage.setItem('token', res.data.user.token)
        //alert(res.data.message)
        this.router.push({ name: 'home' })
      } catch (error) {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      }
    },
    /** logout */
    async logout() {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        this.user = null
        this.errors = {}
        localStorage.removeItem('token')
        this.router.push({ name: 'home' })
      } catch (error) {
        alert(error.message)
      }
    },
    /** it will sent email for reset paasword link */
    async sendResetLinkEmail(formData) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/password/email`,
          formData
        )
        this.errors = {}
        alert(res.data.message)
        this.router.push({ name: 'login' })
      } catch (error) {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      }
    },

    /** reset password */
    async resetPassword(formData) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/password/reset`,
          formData
        )
        this.errors = {}
        alert(res.data.message)
        this.router.push({ name: 'login' })
      } catch (error) {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      }
    },
    navigateToHome() {
      this.router.push({ name: 'home' }) // Navigates to the 'home' route
    }
  }
})
