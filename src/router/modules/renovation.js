const newHouse = () =>import(/* webpackChunkName: "Renovation" */ '@/views/renovation/newHouse.vue')

export default [
    {
        path:'/renovation/newHouse',
        name:'newHouse',
        component:newHouse,
        meta:{
            title:'装修流程',
            navIndex:1
        }
    }
]