import Vue from 'vue'
import VueRouter from 'vue-router'

import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'
import CommunityList from '@/views/community/CommunityList'
import CommunityCreate from '@/views/community/CommunityCreate'

// import PostList from '@/views/community/PostList'
// import CreatePost from '@/views/community/CreatePost'
// import Detail from '@/views/community/Detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/community',
    name: 'CommunityList',
    component: CommunityList
  },
  {
    path: '/community/create',
    name: 'CommunityCreate',
    component: CommunityCreate
  }
  // {
  //   path: '/PostList',
  //   name: 'PostList',
  //   component: PostList,
  // },
  // {
  //   path: '/community/create/:id?',
  //   name: 'CreatePost',
  //   component: CreatePost,
  // },
  // {
  //   path: '/community/:id',
  //   name: 'Detail',
  //   component: Detail
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router