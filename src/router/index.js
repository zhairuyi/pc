import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/home'
import Welcome from '../views/welcome'
import NotFound from '../views/error/404.vue'
import local from '@/utils/local'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/Login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [{
      path: '/',
      component: Welcome
    }]

  },
  {
    path: '*',
    component: NotFound
  }]
})

router.beforeEach((to, from, next) => {
  const user = local.getUser()
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

export default router
