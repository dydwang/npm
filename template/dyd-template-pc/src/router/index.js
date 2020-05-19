import Vue from 'vue'
import VueRouter from 'vue-router'

import user from '../views/user/router'
import admin from '../views/admin/router'
import table from '../table/index'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  ...user,
  ...admin, {
    path:'/table',
    name:'table',
    component:table
  },
]

const router = new VueRouter({
  routes
})

export default router
