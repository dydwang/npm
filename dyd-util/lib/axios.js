import axios from 'axios'
//import { Message } from 'element-ui'
import {serveUrl}  from './url'//服务器地址

let C  //返回值
let Service = axios.create({
    timeout: 7000, // 请求超时时间
    baseURL: serveUrl,
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

export function util(data,url,callback,method='post') {
    Service({
        url:url,
        method: method,
        data:toFormData(data),  //  toFormData(cnt)
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
    Message({
        message: '网络错误' + msg,
        type: 'error',
        duration: 7 * 1000
    })
    C=error
})


//转化data
function toFormData(obj) {//数据处理
    let formData = new FormData();
    for(let key in obj) {
        formData.append(key, obj[key]);
    }
    return formData;
}