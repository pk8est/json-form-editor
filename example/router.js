import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes  = [
  { path: '/', component: () => import('./views/codeCompile') },
  { path: '/base', component: () => import('./views/base') },
  { path: '/yaml', component: () => import('./views/yaml') }
]

const createRouter = () => new Router({
  routes: routes
})

const router = createRouter()

export default router
