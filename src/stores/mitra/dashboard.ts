import { defineStore } from 'pinia'
import { dashboardMitraService } from '@/services/mitra/dashboard.service'

export const useDashboardMitraStore = defineStore('dashboardMitra', {
  state: () => ({
    dashboard: {
      balance: 0,
      totalTransactions: 0,
      totalFee: 0,
      chart: [],
    },
    loading: false,
  }),

  actions: {
    async fetchDashboard() {
      this.loading = true
      try {
        const response = await dashboardMitraService.getDashboard()
        const data = response.data

        this.dashboard = {
          balance: data.balance || 0,
          totalTransactions: data.total_transactions || 0,
          totalFee: data.total_fee_earned || 0,
          chart: data.chart_transactions || [],
        }
      } catch (error) {
        console.error('Failed to fetch dashboard mitra:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
