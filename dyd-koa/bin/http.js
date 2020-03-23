const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

/**
 *              端口号
 * */
        let proxy=3000;
/**
 * */
function createHttp(app) {
    if (cluster.isMaster) {
        console.log(`listen start: ${proxy}  主进程 ${process.pid} 正在运行`);
        // 衍生工作进程。  默认衍生cpu最大进程数量
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.fork().on('listening', (address) => {
            // 工作进程正在监听。

        });
        cluster.on('exit', (worker, code, signal) => {
            /**
             *   code <number> 正常退出时的退出代码。
             *   signal <string> 导致进程被杀死的信号名称 (例如 'SIGHUP')。
             * */
            //工作进程退出
            if (signal) {
                console.log(`工作进程 ${worker.process.pid}已被信号 ${signal} 杀死`);
            } else if (code !== 0) {
                console.log(`工作进程退出 ${worker.process.pid}，退出码: ${code}`);
            } else {
                console.log('工作进程成功退出');
            }
            //当退出一个工作进程时 开启新工作进程  **并且该端口并未被占用
            cluster.fork();
        });
    }else{
        app.listen(proxy)//启动端口
    }
}
module.exports=createHttp

