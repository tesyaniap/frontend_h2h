<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from '@/components/ui/toast/use-toast'
import { api } from '@/services/api.service'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Home, Users, Bus, User, Shield, FileText, UserPlus, Wallet } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { toast } = useToast()
const userPermissions = ref<string[]>([])

const navigationItems = [
  {
    title: 'Dashboard',
    icon: Home,
    path: '/admin/dashboard',
    permission: 'dashboard.admin',
  },
  {
    title: 'Data Mitra',
    icon: Users,
    path: '/admin/mitra',
    permission: 'mitra.view',
  },
  {
    title: 'Approval Top Up',
    icon: Wallet,
    path: '/admin/topup-approval',
    permission: 'topups.approve',
  },
  {
    title: 'Data Pengguna',
    icon: User,
    path: '/admin/users',
    permission: 'users.view',
  },
  {
    title: 'Role Management',
    icon: Shield,
    path: '/admin/role-management',
    permission: 'roles.view',
  },
  {
    title: 'Laporan',
    icon: FileText,
    path: '/admin/reports',
    permission: 'reports.transactions',
  },
]

const hasPermission = (permission: string) => {
  return userPermissions.value.includes(permission)
}

const fetchPermissions = async () => {
  try {
    const response = await api.get('/v1/auth/permissions')
    userPermissions.value = response.data.data.permissions || []
  } catch (error) {
    console.error('Failed to fetch permissions:', error)
  }
}

onMounted(() => {
  fetchPermissions()
})

const getUserInitials = () => {
  const name = authStore.user?.name || 'User'
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

const handleNavigation = (item: any) => {
  if (!hasPermission(item.permission)) {
    toast({
      title: 'Akses Ditolak',
      description: 'Anda tidak memiliki permission untuk mengakses halaman ini',
      variant: 'destructive'
    })
    return
  }
  router.push(item.path)
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <div class="flex items-center gap-2">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Bus class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-semibold">H2H Ticketing</span>
                <span class="text-xs">Admin Dashboard</span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in navigationItems" :key="item.path">
              <SidebarMenuButton
                :is-active="route.path === item.path"
                :disabled="!hasPermission(item.permission)"
                as-child
              >
                <a 
                  :href="item.path" 
                  @click.prevent="handleNavigation(item)"
                  :class="{ 'opacity-50 cursor-not-allowed': !hasPermission(item.permission) }"
                >
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div class="flex items-center gap-2">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <span class="text-sm font-semibold">{{ getUserInitials() }}</span>
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="text-sm font-medium">{{ authStore.user?.name || 'User' }}</span>
                <span class="text-xs text-muted-foreground">{{ authStore.user?.email || 'user@example.com' }}</span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    
    <SidebarRail />
  </Sidebar>
</template>
