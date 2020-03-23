let linkSql = require('./sqlDB')

class Lmsq{
    constructor(){

    }
    add(body){
        let $table=body.$table
        let $insert=body.$insert

        return new Promise((rs,rj)=>{
            let sql=`INSERT INTO tbl_${$table}(`
            for (let i in $insert){
                sql+=i+','
            }
            sql=sql.substr(0,sql.length-1)+') values( '
            for (let i in $insert){
                if(typeof $insert[i]==='string'){
                    sql+=` "${$insert[i]}" ,`
                }else{
                    sql+=` ${$insert[i]} ,`
                }
            }
            sql=sql.substr(0,sql.length-1)+')'
            linkSql(sql).then(r=>{
                rs(r)
            })
        })
    }
    get(body){
        let $table=body.$table
        let $where=body.$where
        let $like=body.$like
        let $orderBY=body.$orderBY
        let $link=body.$link
        let $or=body.$or
        return new Promise((rs,rj)=>{
            let sql=`select * from tbl_${$table}`

            //条件查询 and
            if($where){
                sql+=' where '
                for (let i in $where){
                    if(typeof $where[i]==='string'){
                        sql+=` ${i} = "${$where[i]}" and`
                    }else{
                        sql+=` ${i} = ${$where[i]} and`
                    }
                }
                sql=sql.substr(0,sql.length-3)
            }

            //or
            if($or){
                if(!$where){
                    sql+=' where ('
                }else{
                    sql+=' and ('
                }
                for (let i in $or){

                    if(typeof $or[i]==='string'){
                        sql+=` ${i}= "${$or[i]}" or`
                    }else{
                        sql+=` ${i}= ${$or[i]} or`
                    }
                }
                sql=sql.substr(0,sql.length-2)+')'
            }

            //相似查询
            if($like){
                if($where){
                    sql+=' and '
                }else{
                    sql+=' where '
                }
                for (let i in $like){
                    if(typeof $like[i]==='string'){
                        sql+=` ${i} like "${$like[i]}" and`
                    }else{
                        sql+=` ${i} like ${$like[i]} and`
                    }
                }
                sql=sql.substr(0,sql.length-3)
            }

            //排序
            if($orderBY){
                let $orderBYMethods=$orderBY.methods||'asc'
                sql+=` ORDER BY ${$orderBY.col} ${$orderBYMethods}`
            }

            //连接表
            if($link){
                let linkMethods=$link.methods||'left join'
                let linkTable='tbl_'+$link.table
                let leftCol=$link.left
                let rightCol=$link.right
                let rightWhere=$link.where|| '*'
                sql=`SELECT * FROM (${sql}) as a ${linkMethods} (SELECT ${rightWhere} from ${linkTable}) as b on a.${leftCol} = b.${rightCol}`
            }

            linkSql(sql).then(r=>{
                rs(r)
            })
        })}

    up(body){
        let $table=body.$table
        let $set=body.$set
        let $where=body.$where
        return new Promise((rs,rj)=>{
            let sql=`UPDATE tbl_${$table} set `
            for (let i in $set){
                if(typeof $set[i]==='string'){
                    sql+=` ${i} = "${$set[i]}" ,`
                }else{
                    sql+=` ${i} = ${$set[i]} ,`
                }
            }
            sql=sql.substr(0,sql.length-1)+ ' where '
            for (let w in $where){
                if(typeof $where[w]==='string'){
                    sql+=` ${w} = "${$where[w]}" and`
                }else{
                    sql+=` ${w} = ${$where[w]} and`
                }
            }
            sql=sql.substr(0,sql.length-3)
            linkSql(sql).then(r=>{
                rs(r)
            })
        })
    }

    del(body){
        let $table=body.$table
        let $where=body.$where
        return new Promise((rs,rj)=>{
            let sql=`delete from tbl_${$table} `
            if($where){
                sql +=' where '
                for (let i in $where){
                    if(typeof $where[i]==='string'){
                        sql+=` ${i} = "${$where[i]}" and`
                    }else{
                        sql+=` ${i} = ${$where[i]} and`
                    }
                }
                sql=sql.substr(0,sql.length-3)
                linkSql(sql).then(r=>{
                    rs(r)
                })
            }})
    }

    create(body){
        return new Promise((rs,rj)=> {
            let $table = body.$table
            let $col = body.$col
            let sql = 'create table ' + $table + '('
            for (let i in $col) {
                sql += i + ' ' + $col[i] + ','
            }
            sql = sql.substr(0, sql.length - 1) + ')'
            linkSql(sql).then(r => {
                rs(r)
            })
        })
    }
    deleteTable(body){
        return new Promise((rs,rj)=> {
            let $table = body.$table
            let sql = 'DROP TABLE '+$table
            linkSql(sql).then(r => {
                rs(r)
            })
        })
    }
}

module.exports= new Lmsq()