<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Branding -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 flex-col justify-between relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
      <div class="relative z-10">
        <div class="flex items-center gap-3 text-white">
          <div class="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
            <Bus class="h-8 w-8" />
          </div>
          <div>
            <h1 class="text-2xl font-bold">H2H Ticketing</h1>
            <p class="text-blue-100 text-sm">Admin Dashboard</p>
          </div>
        </div>
      </div>
      
      <div class="relative z-10 space-y-6">
        <h2 class="text-4xl font-bold text-white leading-tight">
          Kelola Sistem<br />Ticketing dengan Mudah
        </h2>
        <p class="text-blue-100 text-lg">
          Platform manajemen terintegrasi untuk mitra dan transaksi ticketing
        </p>
        <div class="flex gap-8 pt-4">
          <div>
            <div class="text-3xl font-bold text-white">500+</div>
            <div class="text-blue-100 text-sm">Mitra Aktif</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white">10K+</div>
            <div class="text-blue-100 text-sm">Transaksi/Bulan</div>
          </div>
        </div>
      </div>

      <div class="relative z-10 text-blue-100 text-sm">
        © 2024 H2H Ticketing. All rights reserved.
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="flex-1 flex items-center justify-center p-8 bg-background">
      <div class="w-full max-w-md space-y-8">
        <!-- Mobile Logo -->
        <div class="lg:hidden flex items-center justify-center gap-2 mb-8">
          <div class="p-2 bg-primary/10 rounded-lg">
            <Bus class="h-6 w-6 text-primary" />
          </div>
          <span class="text-xl font-bold">H2H Ticketing</span>
        </div>

        <div class="space-y-2">
          <h2 class="text-3xl font-bold tracking-tight">Selamat Datang</h2>
          <p class="text-muted-foreground">
            Masuk ke dashboard admin untuk mengelola sistem
          </p>
        </div>

        <Card>
          <CardContent class="pt-6">
            <form @submit.prevent="handleLogin" class="space-y-4">
              <div class="space-y-2">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  class="h-11"
                />
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <Label for="password">Password</Label>
                  <a href="#" class="text-sm text-primary hover:underline">Lupa password?</a>
                </div>
                <Input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  class="h-11"
                />
              </div>
              <Button type="submit" class="w-full h-11" :disabled="loading">
                <span v-if="loading">Memproses...</span>
                <span v-else>Masuk ke Dashboard</span>
              </Button>
            </form>
          </CardContent>
        </Card>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          <p>{{ error }}</p>
        </div>
        
        <div class="text-center text-sm text-muted-foreground bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg">
          <p class="font-medium text-blue-900 mb-1">Kredensial Login:</p>
          <p><strong>Email:</strong> admin@example.com</p>
          <p><strong>Password:</strong> password</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Bus } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'

const router = useRouter()
const authStore = useAuthStore()
const { toast } = useToast()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await authStore.login({ email: email.value, password: password.value })
    toast({
      title: 'Login berhasil!',
      description: 'Selamat datang kembali',
    })
    router.push('/admin/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Login gagal. Periksa email dan password Anda.'
  } finally {
    loading.value = false
  }
}
</script>
