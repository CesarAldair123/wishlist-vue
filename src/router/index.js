import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Customer from '../views/Customer.vue'
import Admin from '../views/Admin.vue'
import {customerGuard, adminGuard} from './guards.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer,
      beforeEnter: customerGuard
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: adminGuard
    }
  ]
})

export default router
