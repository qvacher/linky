import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Redirect from '../views/Redirect.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:code',
    name: 'Redirect',
    component: Redirect
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
