import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginVue from '../views/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home/:user',
      name: 'home',
      component: Home
    },
   
  ]
})

export default router
