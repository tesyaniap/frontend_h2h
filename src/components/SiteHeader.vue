<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Search, LogOut, Settings, HelpCircle, X } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const showSearch = ref(false)
const searchQuery = ref('')
const showLogoutDialog = ref(false)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
  showLogoutDialog.value = false
}

const getUserInitials = () => {
  const name = authStore.user?.name || 'User'
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

const currentPageName = computed(() => {
  const path = route.path
  if (path === '/admin/dashboard') return 'Admin Dashboard'
  if (path === '/admin/mitra') return 'Manajemen Mitra'
  if (path === '/admin/users') return 'Manajemen User'
  if (path === '/mitra/dashboard') return 'Mitra Dashboard'
  if (path === '/dashboard') return 'Dashboard'
  return 'Page'
})

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchQuery.value = ''
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // TODO: Implement global search functionality
  }
}
</script>

<template>
  <header class="sticky top-0 flex h-12 shrink-0 items-center gap-2 border-b bg-background px-4">
    <div class="flex items-center gap-2 flex-1">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb v-if="!showSearch">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{{ currentPageName }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <!-- Search Input -->
      <div v-if="showSearch" class="flex-1 max-w-md">
        <Input
          v-model="searchQuery"
          placeholder="Search..."
          @keyup.enter="handleSearch"
          class="w-full"
          autofocus
        />
      </div>
    </div>
    
    <div class="flex items-center gap-2">
      <button
        @click="toggleSearch"
        class="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
        :aria-label="showSearch ? 'Close search' : 'Search'"
      >
        <X v-if="showSearch" class="h-4 w-4" />
        <Search v-else class="h-4 w-4" />
      </button>
      
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button class="flex items-center gap-2 rounded-md hover:bg-accent px-2 py-1">
            <Avatar class="h-8 w-8">
              <AvatarFallback class="text-xs">
                {{ getUserInitials() }}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-56">
          <DropdownMenuLabel>
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">{{ authStore.user?.name }}</p>
              <p class="text-xs leading-none text-muted-foreground">
                {{ authStore.user?.email || 'user@example.com' }}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings class="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle class="mr-2 h-4 w-4" />
            <span>Get Help</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="showLogoutDialog = true">
            <LogOut class="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>

  <!-- Logout Confirmation Dialog -->
  <AlertDialog v-model:open="showLogoutDialog">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
        <AlertDialogDescription>
          Apakah Anda yakin ingin keluar dari sistem?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Batal</AlertDialogCancel>
        <AlertDialogAction @click="handleLogout">Logout</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
