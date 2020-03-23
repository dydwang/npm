const fs = require('fs');
const path = require("path");
const Time = require('../fun/time.js');
const nows=new Time(Date.now())
function logger(ctx,rt) {
    //时间
    let nowYear=nows.getTime('Y')
    let nowMonth=nows.getTime('M')
    let nowDay = nows.getTime('D')
    let nowTime = nows.getTime()

    //日志信息  调用时间 方法 路径 响应时间
    let logger = nowTime + ` :${ctx.method} ${ctx.url} - ${rt?rt:404}`
    rt?console.log(logger)
      :console.error(logger + ` :未找到`);

    //文件目录
    const file = `./logger/${nowYear}/${nowMonth}` ;
    //文件名
    const fileName=`${nowYear}_${nowMonth}_${nowDay}.log`

    fs.access(file, fs.constants.F_OK, (err) => {
        //如果文件不存在 递归创建目录后写入
        if (err) {
            function mkdirsSync(dirname) {
                if (fs.existsSync(dirname)) {
                    return true;
                } else {
                    if (mkdirsSync(path.dirname(dirname))) {
                        fs.mkdirSync(dirname);
                        return true;
                    }
                }
            }
            mkdirsSync(file)
            fs.writeFile(file+'/'+fileName, logger, error => {
                if (error) throw err;
            });
        } else {
            fs.appendFile(file+'/'+fileName,  '\r\n'+logger, 'utf8', function (err, ret) {
                if (err) throw err;
            });
        }
    });
}

module.exports=logger