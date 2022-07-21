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
      meta: { title: '首頁', icon: 'home' }
    }]
  },

  {
    path: '/cs',
    component: Layout,
    redirect: '/cs/table',
    name: '客服',
    meta: { title: '客服', icon: 'cs' },
    beforeEnter: checkAuth,
    children: [
      {
        path: 'new',
        name: '新增報帳',
        component: () => import('@/views/cs/new/index'),
        meta: { title: '新增報帳', icon: '' }
      },
      {
        path: 'edit',
        name: '修改報帳',
        component: () => import('@/views/cs/edit/index'),
        meta: { title: '修改報帳', icon: '' }
      },
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/cs/table/index'),
        meta: { title: '表單全覽', icon: '' }
      },
      {
        path: 'company-search',
        name: '廠商搜尋',
        component: () => import('@/views/cs/company-search/index'),
        meta: { title: '廠商搜尋', icon: '' }
      },
      {
        path: 'people-search',
        name: '代表人搜尋',
        component: () => import('@/views/cs/people-search/index'),
        meta: { title: '代表人搜尋', icon: '' }
      },
      {
        path: 'today',
        name: '當日業績',
        component: () => import('@/views/cs/today/index'),
        meta: { title: '當日業績', icon: '' }
      },
      {
        path: 'deadline',
        name: '當日DL',
        component: () => import('@/views/cs/deadline/index'),
        meta: { title: '當日DL', icon: '' }
      }
    ]
  },
  {
    path: '/ticket',
    component: Layout,
    redirect: '/ticket/uni',
    name: '開票程式',
    meta: {title: '開票程式', icon: 'ticket'},
    children: [
      {
        path: 'uni',
        name: '立榮線上訂位',
        component: () => import('@/views/ticket/uni/index'),
        meta: { title: '立榮線上訂位', icon: '' }
      },
      {
        path: 'uni-phone',
        name: '立榮電話訂位',
        component: () => import('@/views/ticket/uni-phone/index'),
        meta: { title: '立榮電話訂位', icon: '' }
      },
      {
        path: 'mandarin',
        name: '華信線上訂位',
        component: () => import('@/views/ticket/mandarin/index'),
        meta: { title: '華信線上訂位', icon: '' }
      },
      {
        path: 'mandarin-phone',
        name: '華信電話訂位',
        component: () => import('@/views/ticket/mandarin-phone/index'),
        meta: { title: '華信電話訂位', icon: '' }
      },
      {
        path: 'mandarin-b2b-fit',
        name: '華信B2B散客訂位',
        component: () => import('@/views/ticket/mandarin-b2b-fit/index'),
        meta: { title: '華信B2B散客訂位', icon: '' }
      },
      {
        path: 'mandarin-b2b-group',
        name: '華信B2B團體訂位',
        component: () => import('@/views/ticket/mandarin-b2b-group/index'),
        meta: { title: '華信B2B團體訂位', icon: '' }
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
      meta: { title: '首頁', icon: 'home' }
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
        name: '修改報帳',
        component: () => import('@/views/op/edit/index'),
        meta: { title: '修改報帳', icon: '' }
      },
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/op/table/index'),
        meta: { title: '表單全覽', icon: '' }
      },
      {
        path: 'company-search',
        name: '廠商搜尋',
        component: () => import('@/views/op/company-search/index'),
        meta: { title: '廠商搜尋', icon: '' }
      },
      {
        path: 'name-search',
        name: '團名搜尋',
        component: () => import('@/views/op/name-search/index'),
        meta: { title: '團名搜尋', icon: '' }
      },
      {
        path: 'income',
        name: '當日收入',
        component: () => import('@/views/op/income/index'),
        meta: { title: '當日收入', icon: '' }
      },
      {
        path: 'today',
        name: '當日業績',
        component: () => import('@/views/op/today/index'),
        meta: { title: '當日業績', icon: '' }
      },
      {
        path: 'deadline',
        name: '當日DL',
        component: () => import('@/views/op/deadline/index'),
        meta: { title: '當日DL', icon: '' }
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
    meta: { title: '團體', icon: 'group' },
    children: [
      {
        path: 'new',
        name: '新增報帳',
        component: () => import('@/views/group/new/index'),
        meta: { title: '新增報帳', icon: '' }
      },
      {
        path: 'edit',
        name: '修改報帳',
        component: () => import('@/views/group/edit/index'),
        meta: { title: '修改報帳', icon: '' }
      },
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/group/table/index'),
        meta: { title: '表單全覽', icon: '' }
      },
      {
        path: 'deadline',
        name: '當日DL',
        component: () => import('@/views/group/deadline/index'),
        meta: { title: '當日DL', icon: '' }
      },
      {
        path: 'company-search',
        name: '廠商搜尋',
        component: () => import('@/views/group/company-search/index'),
        meta: { title: '廠商搜尋', icon: '' }
      },
    ]
  },
  {
    path: '/ticket',
    component: Layout,
    redirect: '/ticket/uni',
    name: '開票程式',
    meta: {title: '開票程式', icon: 'ticket'},
    children: [
      {
        path: 'uni',
        name: '立榮線上訂位',
        component: () => import('@/views/ticket/uni/index'),
        meta: { title: '立榮線上訂位', icon: '' }
      },
      {
        path: 'uni-phone',
        name: '立榮電話訂位',
        component: () => import('@/views/ticket/uni-phone/index'),
        meta: { title: '立榮電話訂位', icon: '' }
      },
      {
        path: 'mandarin',
        name: '華信線上訂位',
        component: () => import('@/views/ticket/mandarin/index'),
        meta: { title: '華信線上訂位', icon: '' }
      },
      {
        path: 'mandarin-phone',
        name: '華信電話訂位',
        component: () => import('@/views/ticket/mandarin-phone/index'),
        meta: { title: '華信電話訂位', icon: '' }
      },
      {
        path: 'mandarin-b2b-fit',
        name: '華信B2B散客訂位',
        component: () => import('@/views/ticket/mandarin-b2b-fit/index'),
        meta: { title: '華信B2B散客訂位', icon: '' }
      },
      {
        path: 'mandarin-b2b-group',
        name: '華信B2B團體訂位',
        component: () => import('@/views/ticket/mandarin-b2b-group/index'),
        meta: { title: '華信B2B團體訂位', icon: '' }
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
      meta: { title: '首頁', icon: 'home' }
    }]
  },

  {
    path: '/cs',
    component: Layout,
    redirect: '/cs/table',
    name: '客服',
    meta: { title: '客服', icon: 'cs' },
    beforeEnter: checkAuth,
    children: [
      {
        path: 'new',
        name: '新增報帳',
        component: () => import('@/views/cs/new/index'),
        meta: { title: '新增報帳', icon: '' }
      },
      {
        path: 'edit',
        name: '修改報帳',
        component: () => import('@/views/cs/edit/index'),
        meta: { title: '修改報帳', icon: '' }
      },
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/cs/table/index'),
        meta: { title: '表單全覽', icon: '' }
      },
      {
        path: 'company-search',
        name: '廠商搜尋',
        component: () => import('@/views/cs/company-search/index'),
        meta: { title: '廠商搜尋', icon: '' }
      },
      {
        path: 'people-search',
        name: '代表人搜尋',
        component: () => import('@/views/cs/people-search/index'),
        meta: { title: '代表人搜尋', icon: '' }
      },
      {
        path: 'today',
        name: '當日業績',
        component: () => import('@/views/cs/today/index'),
        meta: { title: '當日業績', icon: '' }
      },
      {
        path: 'deadline',
        name: '當日DL',
        component: () => import('@/views/cs/deadline/index'),
        meta: { title: '當日DL', icon: '' }
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
        name: '修改報帳',
        component: () => import('@/views/op/edit/index'),
        meta: { title: '修改報帳', icon: '' }
      },
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/op/table/index'),
        meta: { title: '表單全覽', icon: '' }
      },
      {
        path: 'company-search',
        name: '廠商搜尋',
        component: () => import('@/views/op/company-search/index'),
        meta: { title: '廠商搜尋', icon: '' }
      },
      {
        path: 'name-search',
        name: '團名搜尋',
        component: () => import('@/views/op/name-search/index'),
        meta: { title: '團名搜尋', icon: '' }
      },
      {
        path: 'income',
        name: '當日收入',
        component: () => import('@/views/op/income/index'),
        meta: { title: '當日收入', icon: '' }
      },
      {
        path: 'today',
        name: '當日業績',
        component: () => import('@/views/op/today/index'),
        meta: { title: '當日業績', icon: '' }
      },
      {
        path: 'deadline',
        name: '當日DL',
        component: () => import('@/views/op/deadline/index'),
        meta: { title: '當日DL', icon: '' }
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
    meta: { title: '團體', icon: 'group' },
    children: [
      {
        path: 'new',
        name: '新增報帳',
        component: () => import('@/views/group/new/index'),
        meta: { title: '新增報帳', icon: '' }
      },
      {
        path: 'edit',
        name: '修改報帳',
        component: () => import('@/views/group/edit/index'),
        meta: { title: '修改報帳', icon: '' }
      },
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/group/table/index'),
        meta: { title: '表單全覽', icon: '' }
      },
      {
        path: 'deadline',
        name: '當日DL',
        component: () => import('@/views/group/deadline/index'),
        meta: { title: '當日DL', icon: '' }
      },
      {
        path: 'company-search',
        name: '廠商搜尋',
        component: () => import('@/views/group/company-search/index'),
        meta: { title: '廠商搜尋', icon: '' }
      },
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/edit',
    name: '管理員',
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
    meta: {title: '管理員', icon: 'admin'},
    children: [
      {
        path: 'edit',
        component: () => import('@/views/admin/edit/index'), // Parent router-view
        name: '修改報帳',
        meta: { title: '修改報帳' },
        children: [
          {
            path: 'fit',
            component: () => import('@/views/admin/edit/fit'),
            name: '散客',
            meta: { title: '散客' }
          },
          {
            path: 'group',
            component: () => import('@/views/admin/edit/group'),
            name: '團體',
            meta: { title: '團體' }
          }
        ]
      },
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/admin/table/index'),
        meta: { title: '表單全覽', icon: '' },
        children: [
          {
            path: 'fit',
            component: () => import('@/views/admin/table/fit'),
            name: '散客',
            meta: { title: '散客' }
          },
          {
            path: 'group',
            component: () => import('@/views/admin/table/group'),
            name: '團體',
            meta: { title: '團體' }
          }
        ]
      },
      {
        path: 'company-search',
        name: '廠商搜尋',
        component: () => import('@/views/admin/company-search/index'),
        meta: { title: '廠商搜尋', icon: '' },
        children: [
          {
            path: 'fit',
            component: () => import('@/views/admin/company-search/fit'),
            name: '散客',
            meta: { title: '散客' }
          },
          {
            path: 'group',
            component: () => import('@/views/admin/company-search/group'),
            name: '團體',
            meta: { title: '團體' }
          }
        ]
      },
      {
        path: 'name-search',
        name: '團名搜尋',
        component: () => import('@/views/admin/name-search/index'),
        meta: { title: '團名搜尋', icon: '' }
      },
      {
        path: 'income',
        name: '當日收入',
        component: () => import('@/views/admin/income/index'),
        meta: { title: '當日收入', icon: '' }
      },
      {
        path: 'today',
        name: '當日業績',
        component: () => import('@/views/admin/today/index'),
        meta: { title: '當日業績', icon: '' }
      },
      {
        path: 'deadline',
        name: '當日DL',
        component: () => import('@/views/admin/deadline/index'),
        meta: { title: '當日DL', icon: '' },
        children: [
          {
            path: 'fit',
            component: () => import('@/views/admin/deadline/fit'),
            name: '散客',
            meta: { title: '散客' }
          },
          {
            path: 'group',
            component: () => import('@/views/admin/deadline/group'),
            name: '團體',
            meta: { title: '團體' }
          }
        ]
      },
      {
        path: 'lock',
        name: '鎖定',
        component: () => import('@/views/admin/lock/index'),
        meta: { title: '鎖定', icon: '' }
      },
      {
        beforeEnter: (to, from, next) => {
          firebaseApp.auth().onAuthStateChanged(user=>{
            if (user) {
              if (user.uid == leoUID) {
                next();
              }else{
                next('/404')
              }
            }else{
              next('/login')
            }
          });
        },
        path: 'other',
        name: '雜項',
        component: () => import('@/views/admin/other/index'),
        meta: { title: '雜項', icon: '' }
      }
    ]
  },
  {
    path: '/human',
    component: Layout,
    redirect: '/human/edit',
    name: '人資管理',
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
    meta: {title: '人資管理', icon: 'human'},
    children: [
      {
        path: 'table',
        name: '表單全覽',
        component: () => import('@/views/human/table/index'),
        meta: { title: '表單全覽', icon: '' }
      },
      {
        path: 'record',
        name: '出缺勤紀錄',
        component: () => import('@/views/human/record/index'),
        meta: { title: '出缺勤紀錄', icon: '' }
      },
    ]
  },
  {
    path: '/backup',
    component: Layout,
    redirect: '/backup/index',
    name: '備份與還原',
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
    meta: {title: '備份與還原', icon: 'backup'},
    children: [
      {
        path: 'backup',
        name: '備份',
        component: () => import('@/views/backup/backup/index'),
        meta: { title: '備份', icon: '' }
      },
      {
        path: 'recover',
        name: '還原',
        component: () => import('@/views/backup/recover/index'),
        meta: { title: '還原', icon: '' }
      },
    ]
  },
  {
    path: '/ticket',
    component: Layout,
    redirect: '/ticket/uni',
    name: '開票程式',
    meta: {title: '開票程式', icon: 'ticket'},
    children: [
      {
        path: 'uni',
        name: '立榮線上訂位',
        component: () => import('@/views/ticket/uni/index'),
        meta: { title: '立榮線上訂位', icon: '' }
      },
      {
        path: 'uni-phone',
        name: '立榮電話訂位',
        component: () => import('@/views/ticket/uni-phone/index'),
        meta: { title: '立榮電話訂位', icon: '' }
      },
      {
        path: 'mandarin',
        name: '華信線上訂位',
        component: () => import('@/views/ticket/mandarin/index'),
        meta: { title: '華信線上訂位', icon: '' }
      },
      {
        path: 'mandarin-phone',
        name: '華信電話訂位',
        component: () => import('@/views/ticket/mandarin-phone/index'),
        meta: { title: '華信電話訂位', icon: '' }
      },
      {
        path: 'mandarin-b2b-fit',
        name: '華信B2B散客訂位',
        component: () => import('@/views/ticket/mandarin-b2b-fit/index'),
        meta: { title: '華信B2B散客訂位', icon: '' }
      },
      {
        path: 'mandarin-b2b-group',
        name: '華信B2B團體訂位',
        component: () => import('@/views/ticket/mandarin-b2b-group/index'),
        meta: { title: '華信B2B團體訂位', icon: '' }
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
