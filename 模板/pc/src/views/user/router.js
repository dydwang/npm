import home from './home/index'
import joinWe from './home/joinWe'
import index from './index'
import my from './my/index'
import myInfo from './my/myInfo'
const Login  = ()=>import('./login/Login')
const signUp  = ()=>import('./login/signUp')
import news from './news/news'
import newsInfo from './news/newsInfo'
 let router=[
     {
         path:'/index',
         name:'index',
         component:index,
         children:[
             {
                 path:'/my',
                 name:'my',
                 component:my,
                 children:[
                     {
                         path:'/myInfo',
                         name:'myInfo',
                         component:myInfo
                     },
                     {
                         path:'/Login',
                         name:'Login',
                         component:Login
                     },
                     {
                         path:'/signUp',
                         name:'signUp',
                         component:signUp
                     },
                 ]
             },
             {
                 path:'/newsInfo',
                 name:'newsInfo',
                 component:newsInfo
             },
             {
                 path:'/news',
                 name:'news',
                 component:news
             },
             {
                 path:'/home',
                 name:'home',
                 component:home
             },
             {
                 path:'/joinWe',
                 name:'joinWe',
                 component:joinWe
             },

         ]
     },

]
export default router