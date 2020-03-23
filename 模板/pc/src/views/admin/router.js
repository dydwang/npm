
import index from './index'
import login from './login'

import user from './user/index'
import goods from './goods/index'
import pay from './pay/index'
import sort from './sort/index'
import image from './image'
import joinWe from './joinWe'

import news from './publishBlog/index'
let routes=[
    {
        path:'/admin_index',
        name:'index',
        component:index,
        children:[
            {
                path:'/admin_news',
                name:'news',
                component:news,
            },
            {
                path:'/admin_goods',
                name:'goods',
                component:goods,
            },
            {
                path:'/admin_joinWe',
                name:'joinWe',
                component:joinWe,
            },
            {
                path:'/admin_image',
                name:'image',
                component:image,
            },
            {
                path:'/admin_pay',
                name:'pay',
                component:pay,
            },{
                path:'/admin_sort',
                name:'sort',
                component:sort,
            },

            {
                path:'/admin_user',
                name:'user',
                component:user,
            },
        ]
    },
    {
        path:'/admin_login',
        name:'login',
        component:login,
    },
]

let ROUTES=routes

export default ROUTES
