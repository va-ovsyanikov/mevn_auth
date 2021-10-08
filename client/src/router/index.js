import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { layout: "auth" },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: "auth" },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'Home',
    meta: { layout: "main", auth: true },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: { layout: "main", auth: true },
    component: () => import('../views/About.vue')
  },
  {
    path: '/add',
    name: 'Add',
    meta: { layout: "main", auth: true },
    component: () => import('../views/Add.vue')
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    meta: { layout: "main", auth: true },
    component: () => import('../views/Edit.vue')
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})





router.beforeEach((to, from, next) => {
  const isAuthorization = localStorage.getItem('user-token')
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !isAuthorization) {
    next('/login')
  }else if(!requireAuth && isAuthorization){
    next('/')
  }else{
    next()
  }
})



export default router
