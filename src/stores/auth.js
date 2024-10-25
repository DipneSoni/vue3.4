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
          const res = await axios.get(`/api/user`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          this.user = res.data
        } catch (error) {
          Toastify({ text: error }).showToast()
        }
      }
    },
    /** Login & Register */
    async authenticate(apiRoute, formData) {
      try {
        //const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/${apiRoute}`, formData)
        const res = await axios.post(`/api/${apiRoute}`, formData)
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
    /** update profile */
    async updateProfile(formData) {
      try {
        //const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/${apiRoute}`, formData)
        const res = await axios.post('/api/updateProfile', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.errors = {}
        this.user = res.data.user
        //alert()
        this.router.push({ name: 'home' })
        Toastify({ text: res.data.message }).showToast()
      } catch (error) {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      }
    },
    /** change password */
    async changePassword(formData) {
      try {
        const res = await axios.post('/api/changePassword', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.errors = {}
        this.router.push({ name: 'home' })
        Toastify({ text: res.data.message }).showToast()
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
          `/api/logout`,
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
        Toastify({ text: error.message }).showToast()
      }
    },
    /** it will sent email for reset paasword link */
    async sendResetLinkEmail(formData) {
      try {
        const res = await axios.post(`/api/password/email`, formData)
        this.errors = {}
        Toastify({ text: res.data.message }).showToast()
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
        const res = await axios.post(`/api/password/reset`, formData)
        this.errors = {}
        Toastify({ text: res.data.message }).showToast()
        this.router.push({ name: 'login' })
      } catch (error) {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      }
    }
  }
})
