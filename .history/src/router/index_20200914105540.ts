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
      title: "旅游攻略"
    }
  },
  {
    path: '/hotel',
    name: 'hotel',
    component: () => import('../views/Hotel/Hotel.vue'),
    meta: {
      title: "酒店"
    }
  },
  {
    path: '/hotel',
    name: 'hotel',
    component: () => import('../views/Air/Air.vue'),
    meta: {
      title: "机票"
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
