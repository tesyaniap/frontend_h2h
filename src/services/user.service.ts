import { api } from './api.service'
import type { User, UserFormData } from '@/types/user.types'

interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}

class UserService {
  async getUsers(): Promise<ApiResponse<User[]>> {
    const response = await api.get('/v1/users')
    return response.data
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    const response = await api.get(`/v1/users/${id}`)
    return response.data
  }

  async createUser(data: UserFormData): Promise<ApiResponse<User>> {
    const payload = {
      name: data.nama,
      email: data.email,
      role: data.role,
      mitra_id: data.instansi,
      password: data.password
    }
    const response = await api.post('/v1/users', payload)
    return response.data
  }

  async updateUser(id: number, data: UserFormData): Promise<ApiResponse<User>> {
    const payload: any = {
      name: data.nama,
      email: data.email
    }
    if (data.password) {
      payload.password = data.password
    }
    const response = await api.put(`/v1/users/${id}`, payload)
    return response.data
  }

  async deleteUser(id: number): Promise<ApiResponse<null>> {
    const response = await api.delete(`/v1/users/${id}`)
    return response.data
  }

  async updateUserStatus(userId: number, status: string): Promise<ApiResponse<User>> {
    const response = await api.patch(`/v1/users/${userId}/status`, { status })
    return response.data
  }
}

export const userService = new UserService()
