<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold">H2H Ticketing</h1>
        <p class="text-muted-foreground">Masuk ke dashboard admin</p>
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
              />
            </div>
            
            <div class="space-y-2">
              <Label for="password">Password</Label>
              <Input
                id="password"
                v-model="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button type="submit" class="w-full" :disabled="loading">
              <span v-if="loading">Memproses...</span>
              <span v-else>Masuk</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
        <p>{{ error }}</p>
      </div>
      
      <div class="text-center text-sm text-muted-foreground bg-muted px-4 py-3 rounded-lg">
        <p class="font-medium mb-2">Kredensial Login:</p>
        <div class="space-y-1">
          <p><strong>Admin:</strong> admin@example.com / password</p>
          <p><strong>Mitra:</strong> mitra@example.com / password</p>
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
    const result = await authStore.login({ email: email.value, password: password.value })
    toast({
      title: 'Login berhasil!',
      description: 'Selamat datang kembali',
    })
    
    // Redirect berdasarkan role
    if (result.role === 'admin') {
      router.push('/admin/dashboard')
    } else if (result.role === 'mitra') {
      router.push('/mitra/dashboard')
    } else {
      router.push('/')
    }
  } catch (err: any) {
    error.value = err.message || 'Login gagal. Periksa email dan password Anda.'
  } finally {
    loading.value = false
  }
}
</script>
