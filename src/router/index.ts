import { teacherFunctionList } from '../common/mock/compose-viewer/function-list';
import { personalFunctionList } from '@/common/mock/personal-center/function-list';
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Signin from '@/components/signin';
import Main from '@/components/main';
import ComposeViewer from '@/components/compose-viewer';
import personalViewer from '@/components/personal-center';
import { 
  COMPOSE_VIEWER_BASE_ROUTE,
  PERSONAL_CENTER_BASE_ROUTE
} from '@/common/constants/route';
import { component } from 'vue/types/umd';


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
      return COMPOSE_VIEWER_BASE_ROUTE + defaultComponent?.path
    }, 
    component: ComposeViewer,
    children: teacherFunctionList.map((item): RouteConfig => {
      let res;
      if(item.children) {
        res = {
          path: item.path,
          component: item.component,
          children: item.children.map((child): RouteConfig => {
            return {
              path: child.path,
              component: child.component
            }
          }),
        }
      } else {
        res = {
          path: item.path,
          component: item.component,
        }
      }
      return res;
    })
  },
  // {
  //   path: '/personal-center',
  //   component: personalViewer,
  //   children: [
  //     {
  //       path: 'information',
  //       component: information
  //     }
  //   ]
  // },
  {
    path: '/personal-center',
    redirect: () => {
      const defaultComponent = personalFunctionList.find(item => item.default);
      return PERSONAL_CENTER_BASE_ROUTE + defaultComponent?.path
    }, 
    component: personalViewer,
    children: personalFunctionList.map((item): RouteConfig => {
      let res;
      if(item.children) {
        res = {
          path: item.path,
          component: item.component,
          children: item.children.map((child): RouteConfig => {
            return {
              path: child.path,
              component: child.component
            }
          }),
        }
      } else {
        res = {
          path: item.path,
          component: item.component,
        }
      }
      return res;
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
