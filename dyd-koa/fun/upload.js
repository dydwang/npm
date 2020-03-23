
const path=require("path");
const destPath=path.join(__dirname,'../static/uploads/');

const multer = require('koa-multer');//加载koa-multer模块
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null,destPath)
    }
})
//加载配置
var upload = multer({ storage: storage });

module.exports=upload