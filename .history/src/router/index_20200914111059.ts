import { createWebHashHistory, createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from "../views/Layout/Layout.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "首页"
      }
    }, {
      path: '/Strategy',
      name: 'Strategy',
      component: () => import('../views/Strategy/Strategy.vue'),
      meta: {
        title: "旅游攻略"
      }
    },]
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
