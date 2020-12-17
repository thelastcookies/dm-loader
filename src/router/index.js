import Vue from 'vue'
import VueRouter from 'vue-router'
import DmLoader from "../views/DmLoader";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DmLoader',
    component: DmLoader
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
