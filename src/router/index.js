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

const adminUID = [
  {
    user:"Martina",
    uid:"mPaUjWY6SjfX52nEXjGKQy1XXav2",
    type:"admin"
  },
  {
    user:"Leo",
    uid:"bnICmkLxO0OTHTbOopiNtWwTKY83",
    type:"admin"
  },
  {
    user:"Amy",
    uid:"9my42qdbUFUYqQO4WNykOTgzekY2",
    type:"admin"
  },
  {
    user:"OP1",
    uid:"XyQb85iWzIRYS7JtrJU0B6FVGCG3",
    type:"op"
  },
  {
    user:"OP2",
    uid:"BaPwrAUdmpX9Qeet3DwH4hYUzX73",
    type:"op"
  },
]

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
      meta: { title: '??????', icon: 'home' }
    }]
  },

  {
    path: '/cs',
    component: Layout,
    redirect: '/cs/table',
    name: '??????',
    meta: { title: '??????', icon: 'cs' },
    beforeEnter: checkAuth,
    children: [
      {
        path: 'new',
        name: '????????????',
        component: () => import('@/views/cs/new/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'edit',
        name: '????????????',
        component: () => import('@/views/cs/edit/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'table',
        name: '????????????',
        component: () => import('@/views/cs/table/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'company-search',
        name: '????????????',
        component: () => import('@/views/cs/company-search/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'people-search',
        name: '???????????????',
        component: () => import('@/views/cs/people-search/index'),
        meta: { title: '???????????????', icon: '' }
      },
      {
        path: 'today',
        name: '????????????',
        component: () => import('@/views/cs/today/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'deadline',
        name: '??????DL',
        component: () => import('@/views/cs/deadline/index'),
        meta: { title: '??????DL', icon: '' }
      }
    ]
  },
  {
    path: '/ticket',
    component: Layout,
    redirect: '/ticket/uni',
    name: '????????????',
    meta: {title: '????????????', icon: 'ticket'},
    children: [
      {
        path: 'uni',
        name: '??????????????????',
        component: () => import('@/views/ticket/uni/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'uni-phone',
        name: '??????????????????',
        component: () => import('@/views/ticket/uni-phone/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'mandarin',
        name: '??????????????????',
        component: () => import('@/views/ticket/mandarin/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'mandarin-phone',
        name: '??????????????????',
        component: () => import('@/views/ticket/mandarin-phone/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'mandarin-b2b-fit',
        name: '??????B2B????????????',
        component: () => import('@/views/ticket/mandarin-b2b-fit/index'),
        meta: { title: '??????B2B????????????', icon: '' }
      },
      {
        path: 'mandarin-b2b-group',
        name: '??????B2B????????????',
        component: () => import('@/views/ticket/mandarin-b2b-group/index'),
        meta: { title: '??????B2B????????????', icon: '' }
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


export const opRoutes = [
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
      meta: { title: '??????', icon: 'home' }
    }]
  },

  {
    path: '/op',
    component: Layout,
    redirect: '/op/edit',
    name: 'OP',
    meta: { title: 'OP', icon: 'op' },
    beforeEnter: (to, from, next) => {
      firebaseApp.auth().onAuthStateChanged(user=>{
        if (user) {
          let adminCheck =  adminUID.some(data =>{
            return user.uid == data.uid && data.type == "op"
          })
          if(adminCheck){
            next()
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
        name: '????????????',
        component: () => import('@/views/op/edit/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'table',
        name: '????????????',
        component: () => import('@/views/op/table/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'company-search',
        name: '????????????',
        component: () => import('@/views/op/company-search/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'name-search',
        name: '????????????',
        component: () => import('@/views/op/name-search/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'income',
        name: '????????????',
        component: () => import('@/views/op/income/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'today',
        name: '????????????',
        component: () => import('@/views/op/today/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'deadline',
        name: '??????DL',
        component: () => import('@/views/op/deadline/index'),
        meta: { title: '??????DL', icon: '' }
      }
    ]
  },
  {
    path: '/group',
    component: Layout,
    redirect: '/group/new',
    beforeEnter: (to, from, next) => {
      firebaseApp.auth().onAuthStateChanged(user=>{
        if (user) {
          let adminCheck =  adminUID.some(data =>{
            return user.uid == data.uid && data.type == "op"
          })
          if(adminCheck){
            next()
          }else{
            next('/404')
          }
        }else{
          next('/login')
        }
      });
    },
    meta: { title: '??????', icon: 'group' },
    children: [
      {
        path: 'new',
        name: '????????????',
        component: () => import('@/views/group/new/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'edit',
        name: '????????????',
        component: () => import('@/views/group/edit/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'table',
        name: '????????????',
        component: () => import('@/views/group/table/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'deadline',
        name: '??????DL',
        component: () => import('@/views/group/deadline/index'),
        meta: { title: '??????DL', icon: '' }
      },
      {
        path: 'company-search',
        name: '????????????',
        component: () => import('@/views/group/company-search/index'),
        meta: { title: '????????????', icon: '' }
      },
    ]
  },
  {
    path: '/ticket',
    component: Layout,
    redirect: '/ticket/uni',
    name: '????????????',
    meta: {title: '????????????', icon: 'ticket'},
    children: [
      {
        path: 'uni',
        name: '??????????????????',
        component: () => import('@/views/ticket/uni/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'uni-phone',
        name: '??????????????????',
        component: () => import('@/views/ticket/uni-phone/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'mandarin',
        name: '??????????????????',
        component: () => import('@/views/ticket/mandarin/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'mandarin-phone',
        name: '??????????????????',
        component: () => import('@/views/ticket/mandarin-phone/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'mandarin-b2b-fit',
        name: '??????B2B????????????',
        component: () => import('@/views/ticket/mandarin-b2b-fit/index'),
        meta: { title: '??????B2B????????????', icon: '' }
      },
      {
        path: 'mandarin-b2b-group',
        name: '??????B2B????????????',
        component: () => import('@/views/ticket/mandarin-b2b-group/index'),
        meta: { title: '??????B2B????????????', icon: '' }
      },
    ]
  },
  
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
      meta: { title: '??????', icon: 'home' }
    }]
  },

  {
    path: '/cs',
    component: Layout,
    redirect: '/cs/table',
    name: '??????',
    meta: { title: '??????', icon: 'cs' },
    beforeEnter: checkAuth,
    children: [
      {
        path: 'new',
        name: '????????????',
        component: () => import('@/views/cs/new/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'edit',
        name: '????????????',
        component: () => import('@/views/cs/edit/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'table',
        name: '????????????',
        component: () => import('@/views/cs/table/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'company-search',
        name: '????????????',
        component: () => import('@/views/cs/company-search/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'people-search',
        name: '???????????????',
        component: () => import('@/views/cs/people-search/index'),
        meta: { title: '???????????????', icon: '' }
      },
      {
        path: 'today',
        name: '????????????',
        component: () => import('@/views/cs/today/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'deadline',
        name: '??????DL',
        component: () => import('@/views/cs/deadline/index'),
        meta: { title: '??????DL', icon: '' }
      }
    ]
  },

  {
    path: '/op',
    component: Layout,
    redirect: '/op/edit',
    name: 'OP',
    meta: { title: 'OP', icon: 'op' },
    beforeEnter: (to, from, next) => {
      firebaseApp.auth().onAuthStateChanged(user=>{
        if (user) {
          let adminCheck =  adminUID.some(data =>{
            return user.uid == data.uid && (data.type == "admin" || data.type == "op")
          })
          if(adminCheck){
            next()
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
        name: '????????????',
        component: () => import('@/views/op/edit/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'table',
        name: '????????????',
        component: () => import('@/views/op/table/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'company-search',
        name: '????????????',
        component: () => import('@/views/op/company-search/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'name-search',
        name: '????????????',
        component: () => import('@/views/op/name-search/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'income',
        name: '????????????',
        component: () => import('@/views/op/income/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'today',
        name: '????????????',
        component: () => import('@/views/op/today/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'deadline',
        name: '??????DL',
        component: () => import('@/views/op/deadline/index'),
        meta: { title: '??????DL', icon: '' }
      }
    ]
  },
  {
    path: '/group',
    component: Layout,
    redirect: '/group/new',
    beforeEnter: (to, from, next) => {
      firebaseApp.auth().onAuthStateChanged(user=>{
        if (user) {
          let adminCheck =  adminUID.some(data =>{
            return user.uid == data.uid && (data.type == "admin" || data.type == "op")
          })
          if(adminCheck){
            next()
          }else{
            next('/404')
          }
        }else{
          next('/login')
        }
      });
    },
    meta: { title: '??????', icon: 'group' },
    children: [
      {
        path: 'new',
        name: '????????????',
        component: () => import('@/views/group/new/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'edit',
        name: '????????????',
        component: () => import('@/views/group/edit/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'table',
        name: '????????????',
        component: () => import('@/views/group/table/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'deadline',
        name: '??????DL',
        component: () => import('@/views/group/deadline/index'),
        meta: { title: '??????DL', icon: '' }
      },
      {
        path: 'company-search',
        name: '????????????',
        component: () => import('@/views/group/company-search/index'),
        meta: { title: '????????????', icon: '' }
      },
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/edit',
    name: '?????????',
    beforeEnter: (to, from, next) => {
      firebaseApp.auth().onAuthStateChanged(user=>{
        if (user) {
          let adminCheck =  adminUID.some(data =>{
            return user.uid == data.uid && data.type == "admin"
          })
          if(adminCheck){
            next()
          }else{
            next('/404')
          }
        }else{
          next('/login')
        }
      });
    },
    meta: {title: '?????????', icon: 'admin'},
    children: [
      {
        path: 'edit',
        component: () => import('@/views/admin/edit/index'), // Parent router-view
        name: '????????????',
        meta: { title: '????????????' },
        children: [
          {
            path: 'fit',
            component: () => import('@/views/admin/edit/fit'),
            name: '??????',
            meta: { title: '??????' }
          },
          {
            path: 'group',
            component: () => import('@/views/admin/edit/group'),
            name: '??????',
            meta: { title: '??????' }
          }
        ]
      },
      {
        path: 'table',
        name: '????????????',
        component: () => import('@/views/admin/table/index'),
        meta: { title: '????????????', icon: '' },
        children: [
          {
            path: 'fit',
            component: () => import('@/views/admin/table/fit'),
            name: '??????',
            meta: { title: '??????' }
          },
          {
            path: 'group',
            component: () => import('@/views/admin/table/group'),
            name: '??????',
            meta: { title: '??????' }
          }
        ]
      },
      {
        path: 'company-search',
        name: '????????????',
        component: () => import('@/views/admin/company-search/index'),
        meta: { title: '????????????', icon: '' },
        children: [
          {
            path: 'fit',
            component: () => import('@/views/admin/company-search/fit'),
            name: '??????',
            meta: { title: '??????' }
          },
          {
            path: 'group',
            component: () => import('@/views/admin/company-search/group'),
            name: '??????',
            meta: { title: '??????' }
          }
        ]
      },
      {
        path: 'name-search',
        name: '????????????',
        component: () => import('@/views/admin/name-search/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'income',
        name: '????????????',
        component: () => import('@/views/admin/income/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'today',
        name: '????????????',
        component: () => import('@/views/admin/today/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'deadline',
        name: '??????DL',
        component: () => import('@/views/admin/deadline/index'),
        meta: { title: '??????DL', icon: '' },
        children: [
          {
            path: 'fit',
            component: () => import('@/views/admin/deadline/fit'),
            name: '??????',
            meta: { title: '??????' }
          },
          {
            path: 'group',
            component: () => import('@/views/admin/deadline/group'),
            name: '??????',
            meta: { title: '??????' }
          }
        ]
      },
      {
        path: 'lock',
        name: '??????',
        component: () => import('@/views/admin/lock/index'),
        meta: { title: '??????', icon: '' }
      },
      {
        beforeEnter: (to, from, next) => {
          firebaseApp.auth().onAuthStateChanged(user=>{
            if (user) {
              if (user) {
                let adminCheck =  adminUID.some(data =>{
                  return user.uid == data.uid && data.type == "admin" && data.user == "Leo"
                })
                if(adminCheck){
                  next()
                }else{
                  next('/404')
                }
              }else{
                next('/login')
              }
            }else{
              next('/login')
            }
          });
        },
        path: 'other',
        name: '??????',
        component: () => import('@/views/admin/other/index'),
        meta: { title: '??????', icon: '' }
      }
    ]
  },
  {
    path: '/human',
    component: Layout,
    redirect: '/human/edit',
    name: '????????????',
    beforeEnter: (to, from, next) => {
      firebaseApp.auth().onAuthStateChanged(user=>{
        if (user) {
          let adminCheck =  adminUID.some(data =>{
            return user.uid == data.uid && data.type == "admin"
          })
          if(adminCheck){
            next()
          }else{
            next('/404')
          }
        }else{
          next('/login')
        }
      });
    },
    meta: {title: '????????????', icon: 'human'},
    children: [
      {
        path: 'table',
        name: '????????????',
        component: () => import('@/views/human/table/index'),
        meta: { title: '????????????', icon: '' }
      },
      {
        path: 'record',
        name: '???????????????',
        component: () => import('@/views/human/record/index'),
        meta: { title: '???????????????', icon: '' }
      },
    ]
  },
  {
    path: '/backup',
    component: Layout,
    redirect: '/backup/index',
    name: '???????????????',
    beforeEnter: (to, from, next) => {
      firebaseApp.auth().onAuthStateChanged(user=>{
        if (user) {
          let adminCheck =  adminUID.some(data =>{
            return user.uid == data.uid && data.type == "admin"
          })
          if(adminCheck){
            next()
          }else{
            next('/404')
          }
        }else{
          next('/login')
        }
      });
    },
    meta: {title: '???????????????', icon: 'backup'},
    children: [
      {
        path: 'backup',
        name: '??????',
        component: () => import('@/views/backup/backup/index'),
        meta: { title: '??????', icon: '' }
      },
      {
        path: 'recover',
        name: '??????',
        component: () => import('@/views/backup/recover/index'),
        meta: { title: '??????', icon: '' }
      },
    ]
  },
  {
    path: '/ticket',
    component: Layout,
    redirect: '/ticket/uni',
    name: '????????????',
    meta: {title: '????????????', icon: 'ticket'},
    children: [
      {
        path: 'uni',
        name: '??????????????????',
        component: () => import('@/views/ticket/uni/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'uni-phone',
        name: '??????????????????',
        component: () => import('@/views/ticket/uni-phone/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'mandarin',
        name: '??????????????????',
        component: () => import('@/views/ticket/mandarin/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'mandarin-phone',
        name: '??????????????????',
        component: () => import('@/views/ticket/mandarin-phone/index'),
        meta: { title: '??????????????????', icon: '' }
      },
      {
        path: 'mandarin-b2b-fit',
        name: '??????B2B????????????',
        component: () => import('@/views/ticket/mandarin-b2b-fit/index'),
        meta: { title: '??????B2B????????????', icon: '' }
      },
      {
        path: 'mandarin-b2b-group',
        name: '??????B2B????????????',
        component: () => import('@/views/ticket/mandarin-b2b-group/index'),
        meta: { title: '??????B2B????????????', icon: '' }
      },
    ]
  },
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
      router.options.routes = csRoutes
      next()
      adminUID.some(data =>{
        if (user.uid == data.uid && data.type == "admin"){
          console.log('admin')
          router.options.routes = adminRoutes
          next();
          return true
        }else if(user.uid == data.uid && data.type == "op"){
          console.log('op')
          router.options.routes = opRoutes
          next();
          return true
        }
      })
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
