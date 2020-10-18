import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:"首页"
    }
  },
  {
    path: '/Strategy',
    name: 'Strategy',
    component: () => import('../views/Strategy/Strategy.vue'),
    meta: {
      title: "首页"
    }
  },
  {
    path: '/hotel',
    name: 'hotel',
    component: () => import('../views/Hotel/Hotel.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
