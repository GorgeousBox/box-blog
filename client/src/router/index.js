import Vue from 'vue'
import VueRouter from 'vue-router'
import home from "../views/home.vue"

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'main',
    // component: home
    // component: resolve => require(["@/views/home"], resolve)
    component: r => require.ensure([], () => r(require('@/views/main')), 'demo')
  },
  {
    path: '/home',
    name: 'home',
    // component: home
    // component: resolve => require(["@/views/home"], resolve)
    component: r => require.ensure([], () => r(require('@/views/home')), 'demo')
  },
  {
    path: '/article',
    name: 'article',
    // component: () => import("@/views/article")
    // component: resolve => require(["@/views/article"], resolve)
    component: r => require.ensure([], () => r(require('@/views/article')), 'demo')
  }, 
  {
    path: '/message',
    name: 'message',
    // component: () => import("@/views/message")
    // component: resolve => require(["@/views/message"], resolve)
    component: r => require.ensure([], () => r(require('@/views/message')), 'demo')
  },
  {
    path: '/life',
    name: 'life',
    // component: () => import("@/views/life")
    // component: resolve => require(["@/views/life"], resolve)
    component: r => require.ensure([], () => r(require('@/views/life')), 'demo')
  },
  {
    path: '/friend',
    name: 'friend',
    // component: () => import("@/views/friend")
    // component: resolve => require(["@/views/friend"], resolve)
    component: r => require.ensure([], () => r(require('@/views/friend')), 'demo')
  },
  {
    path: '/about',
    name: 'about',
    // component: () => import("@/views/about")
    // component: resolve => require(["@/views/about"], resolve)
    component: r => require.ensure([], () => r(require('@/views/about')), 'demo')
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    // component: () => import("@/views/userInfo")
    // component: resolve => require(["@/views/userInfo"], resolve)
    component: r => require.ensure([], () => r(require('@/views/userInfo')), 'demo')
  },
  {
    path: '/article/:id',
    name: 'articleID',
    // component: () => import("@/views/articleID")
    // component: resolve => require(["@/views/articleID"], resolve)
    component: r => require.ensure([], () => r(require('@/views/articleID')), 'demo')
  },
  {
    path: '/admin',
    name: 'admin',
    // component: () => import("@/views/admin"),
    // component: resolve => require(["@/views/admin"], resolve)
    component: r => require.ensure([], () => r(require('@/views/admin')), 'demo')

    // children: [
    //   {
    //     path: '/admin/adminHome',
    //     name: 'adminHome',
    //     component: () => import("@/views/adminAll/adminHome"),
    //   },
    // ]
  },
  {
    path: '/background',
    name: 'background',
    // component: () => import("@/views/notFound")
    // component: resolve => require(["@/views/notFound"], resolve)
    component: r => require.ensure([], () => r(require('@/views/background')), 'demo')
  },
  {
    path: '*',
    name: 'notFound',
    // component: () => import("@/views/notFound")
    // component: resolve => require(["@/views/notFound"], resolve)
    component: r => require.ensure([], () => r(require('@/views/notFound')), 'demo')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: '/',
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (to.hash) {
      return {
        // 通过 to.hash 的值來找到对应的元素
        selector: to.hash
      }
    }
  }
})

export default router
