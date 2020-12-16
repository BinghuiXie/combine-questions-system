import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Signin from '@/components/signin';
import Portal from '@/components/main'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/signin',
    component: Signin
  },
  {
    path: '/portal',
    component: Portal,
  },
  {
    path: '/',
    redirect: '/portal',
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.requireAuth) {
    console.log('需要验证')
    // TODO: 路由守卫
  }
  next();
})

export default router
