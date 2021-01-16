import { teacherFunctionList } from '../common/mock/compose-viewer/function-list';
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Signin from '@/components/signin';
import Main from '@/components/main';
import ComposeViewer from '@/components/compose-viewer';


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/signin',
    component: Signin
  },
  {
    path: '/compose-viewer',
    redirect: () => {
      const defaultComponent = teacherFunctionList.find(item => item.default);
      return '/compose-viewer/' + defaultComponent?.path
    }, 
    component: ComposeViewer,
    children: teacherFunctionList.map((item): RouteConfig => {
      return {
        path: item.path,
        component: item.component
      }
    })
  },
  {
    path: '/',
    redirect: '/main',
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/main',
    component: Main
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
