import { defineStore } from 'pinia'
import { api } from '@/services/api.service'
import type { ReportTransaction, ReportFilter } from '@/types/report.types'

export const useReportStore = defineStore('report', {
  state: () => ({
    transactions: [] as ReportTransaction[],
    filteredTransactions: [] as ReportTransaction[],
    loading: false,
  }),

  actions: {
    async fetchReports(filter: ReportFilter) {
      this.loading = true
      this.transactions = []
      this.filteredTransactions = []
      try {
        const params = new URLSearchParams()
        if (filter.start_date) params.append('start_date', filter.start_date)
        if (filter.end_date) params.append('end_date', filter.end_date)
        if (filter.mitra_id) params.append('mitra_id', filter.mitra_id.toString())
        if (filter.report_type && filter.report_type !== 'all') params.append('status', filter.report_type)
        
        const response = await api.get(`/v1/reports/transactions?${params.toString()}`)
        this.transactions = response.data.data || []
        this.filteredTransactions = response.data.data || []
      } catch (error: any) {
        this.transactions = []
        this.filteredTransactions = []
        if (error.response?.status === 403) {
          alert(error.response.data.message || 'Anda tidak memiliki akses untuk fitur ini')
        }
      } finally {
        this.loading = false
      }
    },

    exportPDF() {
      alert('Export PDF - Feature coming soon')
    },

    exportExcel() {
      alert('Export Excel - Feature coming soon')
    },
  },
})
