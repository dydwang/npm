import {util} from './util.js'
function add(table,data){
    return {
        $table:table,
        $method:'add',
        $insert:data
    }
}

function up(table,data,where={ids:data.ids,id:data.id}){
    return {
        $table:table,
        $method:'up',
        $where:where,
        $set:data
    }
}
function get(table,data){
    return {
        $table:table,
        $method:'get',
        $where:data.$where,
        $link:data.$link,
        $orderBY:data.$orderBY,
        $like:data.$like,
        $or:data.$or,
    }
}

function del(table,data){
    return{
        $table:table,
        $method:'del',
        $where:data,
    }
}
let user={}
let src='api' //当前接口文件夹

user.mysqlTable=function(data,callback) {
    util(data,src,callback)
}


user.add=function(table,data,callback) {
    util(add(table,data),src,callback)
}
user.get=function(table,data,callback) {
    util(get(table,data),src,callback)
}
user.del=function(table,data,callback) {
    util(del(table,data),src,callback)
}
user.up=function(table,data,callback) {
    util(up(table,data),src,callback)
}
export default user
