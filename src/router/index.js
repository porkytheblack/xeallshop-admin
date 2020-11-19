import { createRouter, createWebHistory } from 'vue-router'
import licensing from "@/views/licensing.vue"
const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import('@/views/Home.vue'),
    children:[
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@/components/signUp.vue')
      },
      {
        path: 'signin',
        name: 'signin',
        component: ()=> import('@/components/signIn.vue')
      }
    ]
  },
  {
    path: '/dashboard/:user_uid',
    name: 'admin-dash',
    component: ()=>import('@/views/dashboard.vue'),
    children:[
      {
        path: '',
        name: 'profile',
        component: ()=>import("@/components/adminViews/adminProfile.vue")
      },
      {
        path: 'permits/:chosen_item',
        name: "permits",
        component: licensing
      },
      {
        path:'newItem',
        name: 'newItem',
        component: ()=>import('@/components/addItem.vue')
      },
      {
        path: 'editProfile',
        name: 'editProfile',
        component: ()=>import('@/components/adminTasks/editProfile.vue')
      },
      {
        path: 'my-products',
        name: 'my-products',
        component: ()=>import('@/components/adminViews/allItems.vue')
      },
      {
        path: 'item-edit/:item_id',
        name: 'itemEdit',
        component: ()=> import('@/components/adminViews/itemEdit.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
