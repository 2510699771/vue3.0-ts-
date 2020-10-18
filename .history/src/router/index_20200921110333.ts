import { createWebHashHistory, createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from "../views/Layout/Layout.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: "首页",
          parentpath: '/'
        }
      },
      {
        path: '/',
        redirect: '/home'
      }, {
        path: '/Strategy',
        name: 'Strategy',
        component: () => import('../views/Strategy/Strategy.vue'),
        meta: {
          title: "旅游攻略",
          parentpath: '/Strategy'
        }
      }, {
        path: '/hotel',
        name: 'hotel',
        component: () => import('../views/Hotel/Hotel.vue'),
        meta: {
          title: "酒店",
          parentpath: '/hotel'
        }
      },
      {
        path: '/air',
        name: 'air',
        component: () => import('../views/Air/Air.vue'),
        meta: {
          title: "机票",
          parentpath: '/air'
        }
      },
      {
        path: '/articleInfo',
        name: 'articleInfo',
        component: () => import('../views/articleInfo/articleInfo.vue'),
        meta: {
          title: "文章详情",
          parentpath: '/Strategy'
        }
      },
      {
        path: '/ticket',
        name: 'ticket',
        component: () => import('../views/ticket/ticket.vue'),
        meta: {
          title: "飞机票",
          parentpath: '/air'
        }
      },
      {
        path: '/Buyticket',
        name: 'ticket',
        component: () => import('../views/Buyticket/Buyticket.vue'),
        meta: {
          title: "飞机票",
          parentpath: '/air'
        }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/Login.vue'),
        meta: {
          title: "登录",
          parentpath: '/login'
        }
      }]
  },


]

//决定路由模式
const isPro: boolean = process.env.NODE_ENV === 'production'

const router = createRouter({
  //history是路由模式
  history: isPro ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
