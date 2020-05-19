
import upImg from '../components/upImg'   //上传图片
//import upVideo from '../components/upVideo'   //上传视频
import userImage from '../components/userImage.vue'   //用户头像
//import cityAZ from '../components/city_A_Z'  //全国城市a-z列表  h5
//import dydPdf from '../components/dydPdf'  //pdf
//import dydVideo from '../components/dydVideo'  //video
import dydDialog from '../components/dydDialog.vue'   //弹框
import dydTable from '../components/dydTable.vue'   //表格
import dydForm from '../components/dydForm.vue'   //表单
import nextPage from '../components/nextPage.vue'   //表单

const publicTitle= {
    install: function (Vue) {
        Vue.component('upImg',upImg),
            Vue.component('userImage',userImage),
            //Vue.component('cityAZ',cityAZ),
            //Vue.component('upVideo',upVideo),
            //Vue.component('dydPdf',dydPdf),
            //Vue.component('dydVideo',dydVideo)
            Vue.component('dydDialog',dydDialog),
            Vue.component('dydTable',dydTable),
            Vue.component('dydForm',dydForm),
            Vue.component('nextPage',nextPage)
    }
}
export default publicTitle;
