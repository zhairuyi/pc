import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/home'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/Login',
    component: Login
  },
  {
    path: '/',
    component: Home
  }]
})
