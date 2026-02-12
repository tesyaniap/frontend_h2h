import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const routes: RouteRecordRaw[] = [
  // ===== PUBLIC =====
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },

  // ===== ROOT REDIRECT =====
  {
    path: '/',
    redirect: () => {
      const authStore = useAuthStore()
      const role = authStore.userRole

      if (role === 'admin') return '/admin/dashboard'
      if (role === 'mitra') return '/mitra/dashboard'
      return '/login'
    },
  },

  // ===== ADMIN ROUTES =====
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/Admin/AdminDashboard.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/mitra',
    name: 'MitraManagement',
    component: () => import('@/views/Admin/MitraManagement.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/mitra/add',
    name: 'AddMitra',
    component: () => import('@/views/Admin/AddMitra.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/users',
    name: 'UserManagement',
    component: () => import('@/views/Admin/UserManagement.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/role-management',
    name: 'RoleManagement',
    component: () => import('@/views/Admin/RoleManagement.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/topup-approval',
    name: 'TopupApproval',
    component: () => import('@/views/Admin/TopupApproval.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/reports',
    name: 'Reports',
    component: () => import('@/views/Admin/ReportView.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/profile',
    name: 'AdminProfile',
    component: () => import('@/views/Admin/AdminProfile.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },

  // ===== MITRA ROUTES =====
  {
    path: '/mitra/dashboard',
    name: 'MitraDashboard',
    component: () => import('@/views/mitra/DashboardMitra.vue'),
    meta: { requiresAuth: true, role: 'mitra' },
  },
  {
    path: '/mitra/topup',
    name: 'MitraTopup',
    component: () => import('@/views/mitra/TopupMitra.vue'),
    meta: { requiresAuth: true, role: 'mitra' },
  },

  // ===== OTHER AUTH ROUTE =====

  // ===== 404 =====
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ===== NAVIGATION GUARD =====
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.userRole

  const requiresAuth = to.meta.requiresAuth !== false
  const requiredRole = to.meta.role as string | undefined

  // 1️⃣ Belum login tapi butuh auth
  if (requiresAuth && !isAuthenticated) {
    return next({ name: 'Login' })
  }

  // 2️⃣ Sudah login tapi mau ke login lagi
  if (to.name === 'Login' && isAuthenticated) {
    if (userRole === 'admin') {
      return next({ name: 'AdminDashboard' })
    }
    if (userRole === 'mitra') {
      return next({ name: 'MitraDashboard' })
    }
  }

  // 3️⃣ Role tidak sesuai
  if (requiredRole && userRole !== requiredRole) {
    if (userRole === 'admin') {
      return next({ name: 'AdminDashboard' })
    }
    if (userRole === 'mitra') {
      return next({ name: 'MitraDashboard' })
    }
    return next({ name: 'Login' })
  }

  next()
})

export default router
