const mysql = require('mysql');
const  link_mysql={
    host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
    user: 'root',//连接名
    password: 'root', // root 密码
    database: 'supermarket', // 数据库名
    port: '3306',
    multipleStatements: true    // 多语句查询
}

let linkSql=function(sql) {
    console.log(sql)
    return new Promise((rs,rj)=>{
        let pool=mysql.createPool(link_mysql);
        pool.getConnection((err, connection) => {
            connection.query(sql, [], (err, result) => {
                if(err){
                    rj(false)
                    throw err;
                }else{
                    rs(result);
                    connection.release();
                }
            })
        })
    })

}
module.exports= linkSql