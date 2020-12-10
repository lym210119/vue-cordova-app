import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
    props: route => ({
      item: route.query,
    }),
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/form/Index.vue'),
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue'),
  },
]

const router = new VueRouter({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(({ name }, from, next) => {
  console.log('store: ', localStorage.getItem('store'))
  let store = localStorage.getItem('store')

  if (store && JSON.parse(store).hasLogin) {
    // 如果存在 Token 且用户在 Login/Sign 页面则跳转到主页
    name === 'Login' || name === 'Setting' ? next('/') : next()
  } else {
    name === 'Login' || name === 'Setting' ? next() : next({ name: 'Login' })
  }
})

export default router
