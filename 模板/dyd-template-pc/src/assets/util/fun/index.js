import Time from './Time'
import routerGo from './routerGo'
import userInfo from './userInfo'
import {api} from '../util/util'
import nodeUrl from '../util/url'
import components from './components'
import ver from './ver'
import area from '../data/area'
//import city from './city'
import city_A_Z from '../data/city_A_Z'
import dydRouter from '../publicRouter/router'
import export_excel from './excel/export'

function fun(Vue,options) {
    Vue.use(components)

    Vue.prototype.$Time=function(date){ //获取时间
        return new Time(date)
    }
    Vue.prototype.$routerGo=routerGo  //跳转页面

    Vue.prototype.$center=new Vue;//组件间通信

    Vue.prototype.$userInfo=userInfo;//用户信息

    Vue.prototype.$api=api;//接口清单

    Vue.prototype.$nodeUrl=nodeUrl//后台地址

    Vue.prototype.$JSP=function (data) {
        return JSON.parse(JSON.stringify(data))
    }    //  对象不指向同一地址拷贝

    Vue.prototype.$ver=ver//element 表单验证

    Vue.prototype.$area=area//全国省>>>市

    //Vue.prototype.$city=city//用户省市

    Vue.prototype.$city_A_Z=city_A_Z//全国城市A_Z列表

    Vue.prototype.$exImg=nodeUrl+'getImg?imagePath='//图片地址

    Vue.prototype.$dydRouter=dydRouter  //公共路由

    Vue.prototype.$export_excel=export_excel  //导出excel
}
export default fun
