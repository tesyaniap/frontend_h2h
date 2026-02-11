import { api } from './api.service'
import type { Role, RoleFormData, ApiResponse, Permission } from '@/types/role.types'

class RoleService {
  async getRoles(): Promise<ApiResponse<Role[]>> {
    const response = await api.get('/v1/roles')
    return response.data
  }

  async getPermissions(): Promise<ApiResponse<Permission[]>> {
    console.log('Calling GET /v1/permissions')
    const response = await api.get('/v1/permissions')
    console.log('Permissions API response:', response)
    console.log('Response data:', response.data)
    return response.data
  }

  async createRole(data: RoleFormData): Promise<ApiResponse<Role>> {
    const response = await api.post('/v1/roles', data)
    return response.data
  }

  async updateRolePermissions(roleId: number, permissions: number[]): Promise<ApiResponse<Role>> {
    console.log('Sending permissions:', permissions)
    console.log('Type:', typeof permissions, 'IsArray:', Array.isArray(permissions))
    
    const payload = { permissions }
    console.log('Final payload:', JSON.stringify(payload))
    
    const response = await api.post(`/v1/roles/${roleId}/permissions`, payload)
    return response.data
  }
}

export const roleService = new RoleService()
