import { ref, onMounted } from 'vue'
import { api } from '@/services/api.service'

const userPermissions = ref<string[]>([])
const loading = ref(false)

export function usePermissions() {
  const fetchPermissions = async () => {
    loading.value = true
    try {
      const response = await api.get('/v1/auth/permissions')
      userPermissions.value = response.data.data.permissions || []
    } catch (error) {
      console.error('Failed to fetch permissions:', error)
      userPermissions.value = []
    } finally {
      loading.value = false
    }
  }

  const hasPermission = (permission: string) => {
    return userPermissions.value.includes(permission)
  }

  const hasAnyPermission = (permissions: string[]) => {
    return permissions.some(p => userPermissions.value.includes(p))
  }

  return {
    userPermissions,
    loading,
    fetchPermissions,
    hasPermission,
    hasAnyPermission,
  }
}
