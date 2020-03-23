const Koa = require('koa');
const app = new Koa();
const router =require('./router/index')

//const bodyParser = require('koa-bodyparser');
//app.use(bodyParser());


//let filePath = path.join(__dirname, 'static')
//app.use(require('koa-static')(filePath)
const logger=require('./bin/logger')
const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 100*1024*1024    // 设置上传文件大小最大限制，默认100M
    }
}));

// logger  日志
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    logger(ctx,rt)
})

//  跨域
app.use(async (ctx,next)=>{
    // 设置是否运行客户端设置 withCredentials
    // 即在不同域名下发出的请求也可以携带 cookie
    ctx.set("Access-Control-Allow-Credentials",true)
    // 第二个参数表示允许跨域的域名，* 代表所有域名
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS') // 允许的 http 请求的方法
    // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    // console.log(ctx.request.body)
    // console.log( ctx.request.method==='OPTIONS')

    await next()

})

// x-response-time   请求接口响应时间
app.use( async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});



//------------------- /*启动路由*/---------------------------//
app.use(router.routes());
app.use(router.allowedMethods());
//----------------------------------------------//

//请求错误
app.on('error', err => {
   console.log('server error', err)
});


// 启动进程   ************************************************************************
let createHttp=require('./bin/http')
createHttp(app)
// ************************************************************************************


module.export=app