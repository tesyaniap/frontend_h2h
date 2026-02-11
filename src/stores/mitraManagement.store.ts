 import { defineStore } from 'pinia'
import { mitraService } from '@/services/mitra.service'
import type { MitraListItem } from '@/types/admin.types'

export const useMitraManagementStore = defineStore('mitraManagement', {
  state: () => ({
    mitraList: [] as MitraListItem[],
    filteredList: [] as MitraListItem[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    limit: parseInt(localStorage.getItem('mitraLimit') || '5'),
    searchQuery: '',
    statusFilter: 'all',
  }),

  getters: {
    paginatedList: (state) => {
      const start = (state.currentPage - 1) * state.limit
      const end = start + state.limit
      return state.filteredList.slice(start, end)
    },
    totalPages: (state) => Math.ceil(state.filteredList.length / state.limit),
  },

  actions: {
    async fetchMitraList() {
      this.loading = true
      this.error = null
      try {
        console.log('Fetching mitra list...')
        const response = await mitraService.getMitraList()
        console.log('API Response:', response)
        console.log('Response.data:', response.data)
        console.log('Is array?', Array.isArray(response.data))
        
        const mitraData = Array.isArray(response.data) ? response.data : []
        console.log('Mitra data to transform:', mitraData)
        
        this.mitraList = mitraData.map((mitra: any) => ({
          id: mitra.id,
          nama: mitra.name || '',
          email: mitra.email || '',
          saldo_deposit: parseFloat(mitra.balance?.toString() || '0'),
          total_transaksi: 0,
          total_fee: 0,
          status: mitra.status === 'active' ? 'aktif' : 'nonaktif',
          tanggal_bergabung: mitra.created_at || new Date().toISOString()
        }))
        
        console.log('Transformed mitra list:', this.mitraList)
        this.applyFilters()
        console.log('After filter:', this.filteredList)
      } catch (error: any) {
        console.error('Failed to fetch mitra list:', error)
        this.error = error.message || 'Failed to fetch mitra list'
        this.mitraList = []
        this.filteredList = []
      } finally {
        this.loading = false
      }
    },

    setLimit(newLimit: number) {
      this.limit = newLimit
      this.currentPage = 1
      localStorage.setItem('mitraLimit', newLimit.toString())
    },

    setPage(page: number) {
      this.currentPage = page
    },

    setSearch(query: string) {
      this.searchQuery = query
      this.currentPage = 1
      this.applyFilters()
    },

    setStatusFilter(status: string) {
      this.statusFilter = status
      this.currentPage = 1
      this.applyFilters()
    },

    applyFilters() {
      let filtered = [...this.mitraList]
      
      if (this.searchQuery) {
        filtered = filtered.filter(mitra => 
          mitra.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          mitra.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      
      if (this.statusFilter !== 'all') {
        filtered = filtered.filter(mitra => mitra.status === this.statusFilter)
      }
      
      this.filteredList = filtered
    }
  },
})