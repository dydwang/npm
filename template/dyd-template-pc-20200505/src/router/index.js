import Vue from 'vue'
import VueRouter from 'vue-router'
import admin from '../views/admin/router'

Vue.use(VueRouter)

  const routes = [
      ...admin,
    {
      path: '/mysql',
      name: 'mysql',
      component: () => import( '../views/table/index')
    },
    {
      path: '/goBack',
      name: '404',
      component: () => import( '../views/back/goBack')
    },
    {
      path: '*',
      name: '404',
      component: () => import( '../views/404/index')
    }
]

const router = new VueRouter({
  routes
})

export default router
