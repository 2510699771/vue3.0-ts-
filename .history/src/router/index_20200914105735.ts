import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "首页"
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
    path: '/air',
    name: 'air',
    component: () => import('../views/Air/Air.vue'),
    meta: {
      title: "机票"
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/Login.vue'),
    meta: {
      title: "登录"
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//to去的路由，从哪个路由来，
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  let user = localStorage.getItem('admitUser')
  if (to.path === "/login") next()

  else user ? next() : next("/login")
})

export default router
