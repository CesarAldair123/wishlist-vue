import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Customer from '../views/Customer.vue'
import {customerGuard, adminGuard} from './guards.js'
import AdminAddProd from '../views/AdminAddProd.vue'
import AdminEditProd from '../views/AdminEditProd.vue'

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
      path: '/admin/product/add',
      name: 'adminAddProd',
      component: AdminAddProd,
      beforeEnter: adminGuard
    },
    {
      path: '/admin/product/:id',
      name: 'adminEditProd',
      component: AdminEditProd,
      beforeEnter: adminGuard
    }
  ]
})

export default router
