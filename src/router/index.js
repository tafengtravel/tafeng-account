import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { firebaseApp } from '@/db.js'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
export const csRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    beforeEnter: checkAuth,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/profile',
    beforeEnter: checkAuth,
    children: [{
      path: 'profile',
      name: 'Profile',
      component: () => import('@/views/profile/index'),
      meta: { title: '首頁', icon: 'home' }
    }]
  },

  {
    path: '/cs',
    component: Layout,
    redirect: '/cs/table',
    name: '客服',
    meta: { title: '客服', icon: 'list' },
    beforeEnter: checkAuth,
    children: [
      {
        path: 'new',
        name: '新增報帳',
        component: () => import('@/views/new/cs/index'),
        meta: { title: '新增報帳', icon: '' }
      },
      {
        path: 'edit',
        name: '修改報帳',
        component: () => import('@/views/edit/cs/index'),
        meta: { title: '修改報帳', icon: '' }
      },
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/table/cs/index'),
        meta: { title: '表單全覽', icon: '' }
      },
      {
        path: 'company-search',
        name: '廠商搜尋',
        component: () => import('@/views/company-search/cs/index'),
        meta: { title: '廠商搜尋', icon: '' }
      },
      {
        path: 'today',
        name: '當日業績',
        component: () => import('@/views/today/index'),
        meta: { title: '當日業績', icon: '' }
      },
      {
        path: 'deadline',
        name: '當日DL',
        component: () => import('@/views/deadline/index'),
        meta: { title: '當日DL', icon: '' }
      }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const adminRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    beforeEnter: checkAuth,
    
  },

  {
    path: '/',
    component: Layout,
    redirect: '/profile',
    beforeEnter: checkAuth,
    children: [{
      path: 'profile',
      name: 'Profile',
      component: () => import('@/views/profile/index'),
      meta: { title: '首頁', icon: 'home' }
    }]
  },

  {
    path: '/cs',
    component: Layout,
    redirect: '/cs/table',
    name: '客服',
    meta: { title: '客服', icon: 'list' },
    beforeEnter: checkAuth,
    children: [
      {
        path: 'new',
        name: '新增報帳',
        component: () => import('@/views/new/cs/index'),
        meta: { title: '新增報帳', icon: '' }
      },
      {
        path: 'edit',
        name: '修改報帳',
        component: () => import('@/views/edit/cs/index'),
        meta: { title: '修改報帳', icon: '' }
      },
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/table/cs/index'),
        meta: { title: '表單全覽', icon: '' }
      },
      {
        path: 'company-search',
        name: '廠商搜尋',
        component: () => import('@/views/company-search/cs/index'),
        meta: { title: '廠商搜尋', icon: '' }
      },
      {
        path: 'today',
        name: '當日業績',
        component: () => import('@/views/today/index'),
        meta: { title: '當日業績', icon: '' }
      },
      {
        path: 'deadline',
        name: '當日DL',
        component: () => import('@/views/deadline/index'),
        meta: { title: '當日DL', icon: '' }
      }
    ]
  },

  {
    path: '/op',
    component: Layout,
    redirect: '/op/table',
    name: 'OP',
    meta: { title: 'OP', icon: 'list' },
    beforeEnter: (to, from, next) => {
      firebaseApp.auth().onAuthStateChanged(user=>{
        if (user) {
          if (user.uid == 'bnICmkLxO0OTHTbOopiNtWwTKY83') {
            next();
          }else{
            next('/404')
          }
        }else{
          next('/login')
        }
      });
    },
    children: [
      {
        path: 'edit',
        name: '修改報帳',
        component: () => import('@/views/edit/op/index'),
        meta: { title: '修改報帳', icon: '' }
      },
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/table/op/index'),
        meta: { title: '表單全覽', icon: '' }
      },
      {
        path: 'company-search',
        name: '廠商搜尋',
        component: () => import('@/views/company-search/op/index'),
        meta: { title: '廠商搜尋', icon: '' }
      },
      {
        path: 'name-search',
        name: '團名搜尋',
        component: () => import('@/views/name-search/index'),
        meta: { title: '團名搜尋', icon: '' }
      },
      {
        path: 'income',
        name: '當日收入',
        component: () => import('@/views/income/index'),
        meta: { title: '當日收入', icon: '' }
      },
      {
        path: 'today',
        name: '當日業績',
        component: () => import('@/views/today/index'),
        meta: { title: '當日業績', icon: '' }
      },
      {
        path: 'deadline',
        name: '當日DL',
        component: () => import('@/views/deadline/index'),
        meta: { title: '當日DL', icon: '' }
      }
    ]
  },

  {
    path: '/admin',
    component: Layout,
    beforeEnter: (to, from, next) => {
      firebaseApp.auth().onAuthStateChanged(user=>{
        if (user) {
          if (user.uid == 'bnICmkLxO0OTHTbOopiNtWwTKY83') {
            next();
          }else{
            next('/404')
          }
        }else{
          next('/login')
        }
      });
    },
    redirect: '/admin/table',
    name: '管理員',
    meta: { title: '管理員', icon: 'list' },
    children: [
      {
        path: 'edit',
        name: '修改報帳',
        component: () => import('@/views/edit/admin/index'),
        meta: { title: '修改報帳', icon: '' }
      },
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/table/admin/index'),
        meta: { title: '表單全覽', icon: '' }
      },
      {
        path: 'company-search',
        name: '廠商搜尋',
        component: () => import('@/views/company-search/admin/index'),
        meta: { title: '廠商搜尋', icon: '' }
      },
      {
        path: 'name-search',
        name: '團名搜尋',
        component: () => import('@/views/name-search/index'),
        meta: { title: '團名搜尋', icon: '' }
      },
      {
        path: 'income',
        name: '當日收入',
        component: () => import('@/views/income/index'),
        meta: { title: '當日收入', icon: '' }
      },
      {
        path: 'today',
        name: '當日業績',
        component: () => import('@/views/today/index'),
        meta: { title: '當日業績', icon: '' }
      },
      {
        path: 'deadline',
        name: '當日DL',
        component: () => import('@/views/deadline/index'),
        meta: { title: '當日DL', icon: '' }
      }
    ]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

let createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: adminRoutes
})

let router = createRouter()

function checkAuth(to, from, next){

  firebaseApp.auth().onAuthStateChanged(user=>{
    if (user) {
      next();
    }else{
      next('/login')
    }
  });

}

router.beforeResolve((to, from, next) => {
  firebaseApp.auth().onAuthStateChanged(user=>{
    if (user) {
      console.log('user')
      if(user.uid == 'bnICmkLxO0OTHTbOopiNtWwTKY83'){
        console.log('admin')
        router.options.routes = adminRoutes
        next()
      }else{
        router.options.routes = csRoutes
        next()
      }
    }else{
      console.log('no user')
      next()
    }
  });
  
})


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
