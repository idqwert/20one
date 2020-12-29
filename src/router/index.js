import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  
  {
    path:'/',
    name:'Login',
    component:() => import('../views/Login.vue')
  },
  {
    path:'/Main',
    name:'Main',
    component:() => import('../views/Main.vue'),

    children:[
      {
        path:'menu',
        name:'menu',
        component:() => import('../views/menu.vue')
      },
      {
        path:'Car',
        name:'Car',
        component:() => import('../views/Car.vue')
      },
      {
        path:'List',
        name:'List',
        component:() => import('../views/List.vue')
      },
      {
        path:'My',
        name:'My',
        component:() => import('../views/My.vue')
      },
      {
        path:'More',
        name:'More',
        component:() => import('../views/More.vue')
      },
    ]
  },

  {
    path:'/detail/:num_iid',
    name:'Detail',
    component:() => import('../views/Detail.vue')
  },
  {
    path:'/Listing',
    name:'Listing',
    component:() => import('../views/Listing.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
