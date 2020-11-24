import Vue from 'vue'
import VueRouter from 'vue-router'
import Token from '@/cache/token'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/Home.vue'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style

NProgress.configure({ showSpinner: true }) // NProgress Configuration

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    // 布局页面
    path: '/',
    // name: 'layout', // 命名路由 layout 有一个默认子路由，不需要 name
    component: Layout,
    children: [
      {
        path: '', // 默认子路由渲染 path: ''
        name: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (to.path === '/login') return next()
  // 获取 token
  const tokenStr = Token.getToken()
  if (!tokenStr) return next('/login')
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router
