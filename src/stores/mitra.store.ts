import { defineStore } from 'pinia'
// import { mitraService } from '@/services/mitra.service'
import type { MitraDashboardData } from '@/types/admin.types'

// Mock data
const mockMitraDashboardData: MitraDashboardData = {
  saldo_deposit: 25000000,
  total_transaksi_mitra: 150,
  total_fee_diperoleh: 3750000,
  grafik_transaksi_mitra: [
    { tanggal: '2024-01-01', jumlah: 850000 },
    { tanggal: '2024-01-02', jumlah: 1200000 },
    { tanggal: '2024-01-03', jumlah: 950000 },
    { tanggal: '2024-01-04', jumlah: 1100000 },
    { tanggal: '2024-01-05', jumlah: 1350000 },
    { tanggal: '2024-01-06', jumlah: 1050000 },
    { tanggal: '2024-01-07', jumlah: 1450000 },
  ]
}

export const useMitraStore = defineStore('mitra', {
  state: () => ({
    dashboardData: null as MitraDashboardData | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchDashboardData() {
      this.loading = true
      this.error = null
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Use mock data instead of API call
        // const response = await mitraService.getDashboardData()
        this.dashboardData = mockMitraDashboardData
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch dashboard data'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})