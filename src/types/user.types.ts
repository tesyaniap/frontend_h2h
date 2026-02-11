export interface User {
  id: number
  name: string
  email: string
  role: any
  mitra?: {
    id: number
    name: string
    code: string
  }
  status: string
  email_verified_at?: string
  created_at: string
  updated_at?: string
}

export interface UserFormData {
  nama: string
  email: string
  role: string
  instansi?: string
  password?: string
}