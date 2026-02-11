<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="max-w-md w-full text-center space-y-6">
      <div class="flex justify-center">
        <div class="rounded-full bg-destructive/10 p-6">
          <ShieldAlert class="h-16 w-16 text-destructive" />
        </div>
      </div>
      
      <div class="space-y-2">
        <h1 class="text-3xl font-bold">Akses Ditolak</h1>
        <p class="text-muted-foreground">
          Anda tidak memiliki akses ke halaman ini
        </p>
      </div>

      <Card>
        <CardContent class="pt-6">
          <p class="text-sm text-muted-foreground mb-4">
            Silakan hubungi administrator untuk mendapatkan permission yang sesuai atau kembali ke halaman sebelumnya.
          </p>
          <div class="flex gap-2 justify-center">
            <Button @click="goBack" variant="outline">
              <ArrowLeft class="mr-2 h-4 w-4" />
              Kembali
            </Button>
            <Button @click="goHome">
              <Home class="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldAlert, ArrowLeft, Home } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const goBack = () => {
  router.back()
}

const goHome = () => {
  const role = authStore.userRole
  if (role === 'admin') {
    router.push('/admin/dashboard')
  } else if (role === 'mitra') {
    router.push('/mitra/dashboard')
  } else {
    router.push('/login')
  }
}
</script>
