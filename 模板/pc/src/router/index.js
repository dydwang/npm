import Vue from 'vue'
import VueRouter from 'vue-router'

import user from '../views/user/router'
import admin from '../views/admin/router'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  ...user,
  ...admin,
]

const router = new VueRouter({
  routes
})

export default router
