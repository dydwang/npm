import axios from 'axios'
import showMessage  from './message.js'  //封装的消息弹框
// import encrypt from './crypto.js'
/**
 * @param C 返回值
 * */
let C
let Service = axios.create({
    timeout: 7000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
/**
 * 返回错误码常量预定义
 */
const RC = {
    SUCCESS: "succ",
    FAILURE: "fail",
    NOSESSION: "no session",
    AJAXERROR: "ajax error"
};


/**
 *  远程调用方法的封装
 *
 * @param data 传参
 * @param url 接口地址
 * @param callback 回调方法
 * @param method  请求方式
 */
let utilServe=function(data,url,callback,method) {
    Service({
        url:url,
        method: method,
        data:data,  //  toFormData(cnt)
    })
        .then(()=>{callback(C)})
        .catch(function (readyState, status, error) {
            callback({
                rc: RC.AJAXERROR,
                rm: (readyState + "&" + status + "&" + error)
            })
        })
}
// 添加请求拦截器
Service.interceptors.request.use(config => {
    // loadingInstance = Loading.service({
    //     lock: true,
    //     text: 'loading...'
    // })
    return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
    //loadingInstance.close()
    C= response.data
}, error => {
    console.log('TCL: error', error)
    const msg = error.Message !== undefined ? error.Message : ''
    showMessage("网络错误",3000,Date.now())
    C=false
})


//转化data
function toFormData(obj) {//数据处理
    let formData = new FormData();
    for(let key in obj) {
        formData.append(key, encrypt(obj[key]));
    }
    return formData;
}



/**
 * @param serveUrl 后台地址
 * */

let serveUrl
export default class dydUtil{
    constructor(serve){
        serveUrl=serve //后台地址
    }
    util(data={}, url, callback, method='post'){
        data.$db='mysql'
        utilServe(data,serveUrl+url,callback,method)
    }
}