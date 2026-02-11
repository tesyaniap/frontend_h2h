import { api } from '@/services/api.service'

export const MitraTopupService = {
  fetchTopups() {
    return api.get('/v1/topups')
  },

  createTopup(form: FormData) {
    return api.post('/v1/topups', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
}
