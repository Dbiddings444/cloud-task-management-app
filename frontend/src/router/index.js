import { createRouter, createWebHistory } from 'vue-router'

// Import your views (pages)
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import TaskFormView  from '@/views/TaskFormView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: LoginView, meta: { hideNav: true } },
  { path: '/register', name: 'register', component: RegisterView, meta: { hideNav: true } },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/task-form', name: 'taskForm', component: TaskFormView, meta: { hideCreateTaskButton: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
