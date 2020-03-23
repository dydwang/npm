const Router = require('koa-router'); // koa 路由中间件
const router = new Router(); // 实例化路由

const user =require('./user/index')
const all =require('./all')
router.use(all.routes())
router.use('/user',user.routes())


module.exports=router;