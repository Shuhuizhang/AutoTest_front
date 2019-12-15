import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Case from '../components/Case'
import User from '../components/User'
import TestTask from '../components/TestTask'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/cases', component: Case },
      { path: '/user', component: User },
      { path: '/plan', component: TestTask }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
