import { defineStore } from 'pinia'
import { userService } from '@/services/user.service'
import type { User, UserFormData } from '@/types/user.types'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const response = await userService.getUsers()
        this.users = response.data
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch users'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createUser(userData: UserFormData) {
      this.loading = true
      try {
        const response = await userService.createUser(userData)
        this.users.push(response.data)
      } catch (error: any) {
        this.error = error.message || 'Failed to create user'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateUser(userId: number, userData: UserFormData) {
      this.loading = true
      try {
        const response = await userService.updateUser(userId, userData)
        const index = this.users.findIndex(u => u.id === userId)
        if (index !== -1) {
          this.users[index] = response.data
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to update user'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteUser(userId: number) {
      this.loading = true
      try {
        await userService.deleteUser(userId)
        this.users = this.users.filter(u => u.id !== userId)
      } catch (error: any) {
        this.error = error.message || 'Failed to delete user'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateUserStatus(userId: number, status: string) {
      this.loading = true
      try {
        const response = await userService.updateUserStatus(userId, status)
        const index = this.users.findIndex(u => u.id === userId)
        if (index !== -1) {
          this.users[index] = response.data
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to update user status'
        throw error
      } finally {
        this.loading = false
      }
    }
  },
})