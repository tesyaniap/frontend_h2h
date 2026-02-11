import { api } from '../api.service'

export const dashboardMitraService = {
  async getDashboard() {
    const response = await api.get('/v1/dashboard/mitra')
    return response.data
  }
}
