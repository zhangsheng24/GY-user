const Home=()=>import('@/views/Home.vue')
const AllService=()=>import('@/views/AllService.vue')
const User=()=>import('@/views/User.vue')

import renovation from './modules/renovation'
const routes=[
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        name:'home',
        component:Home,
        meta:{
            title:'首页',
            navIndex:0
        }
    },
    {
        path:'/allService',
        name:'allService',
        component:AllService,
        meta:{
            title:'全部服务',
            navIndex:0
        }
    },
    {
        path:'/user',
        name:'user',
        component:User,
        meta:{
            title:'我的',
            navIndex:0
        }
    },
    ...renovation
]

export default routes