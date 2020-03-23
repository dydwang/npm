
import upImg from '../components/upImg'   //上传图片
import upVideo from '../components/upVideo'   //上传视频
import userImage from '../components/userImage.vue'   //用户头像
import cityAZ from '../components/city_A_Z'  //全国城市a-z列表  h5
import dydPdf from '../components/dydPdf'  //pdf
import dydVideo from '../components/dydVideo'  //video

const publicTitle= {
    install: function (Vue) {
        Vue.component('upImg',upImg),
            Vue.component('userImage',userImage),
            Vue.component('cityAZ',cityAZ),
            Vue.component('upVideo',upVideo),
            Vue.component('dydPdf',dydPdf),
            Vue.component('dydVideo',dydVideo)
    }
}
export default publicTitle;