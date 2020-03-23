const Router = require('koa-router') // koa 路由中间件
const router = new Router(); // 实例化路由
const fs =require('fs')
//const upload = require("../fun/upload.js")
const path=require("path");
let linkSql = require('../sql/sqlDB')

router.post('/upFile',async (ctx, next)=>{

    const file = ctx.request.files.file; // 获取上传文件
    let name=Date.now()
    console.log(file)
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../static/uploads/') + `/${name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = name;
})



router.get('/getImg',async (ctx)=>{
    console.log()
    let url=ctx.req._parsedUrl.query.split('=')[1]
    console.log(ctx.req)
    let filePath = path.join(__dirname, '../static/uploads/') +url
    var content = fs.readFileSync(filePath,"binary");
    ctx.status = 200
    ctx.res.write(content, 'binary')
    ctx.body=''
})

router.get('/getVideo',async (ctx)=>{
    let url=ctx.req._parsedUrl.query.split('=')[1]
    let filePath = path.join(__dirname, '../static/uploads/') +url
    let stat =await fs.statSync(filePath);
    let fileSize = stat.size;
    let range = ctx.req.headers.range;
    if (range) {
        //有range头才使用206状态码
        let parts = range.replace(/bytes=/, "").split("-");
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

        // end 在最后取值为 fileSize - 1
        end = end > fileSize - 1 ? fileSize - 1 : end;

        let chunksize = (end - start) + 1;
        //let file = fs.createReadStream(filePath, {start, end,});
        let head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        let filess=fs.readFileSync(filePath)
        ctx.res.status=200;
        ctx.set(head)
        ctx.body=filess
    } else {
        let head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        ctx.res.status=200;
        ctx.set(head)
        let file=fs.readFileSync(filePath)
        ctx.body=file
    }
})

module.exports=router