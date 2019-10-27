import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/home'
import Welcome from '../views/welcome'
import NotFound from '../views/error/404.vue'

Vue.use(VueRouter)

export default new VueRouter({
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
