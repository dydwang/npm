<template>
    <div style="float: left">
        <img v-if="src" :style="styleType" :src="imgUrl"           >
        <img v-else     :style="styleType" src="@/assets/head.jpg" >
    </div>

</template>

<script>

    export default {
        name: "userImage",
        data() {
            return {

            }
        },
        methods: {
        },
        computed:{
            imgUrl(){
              return this.myNode?this.$nodeUrl+'getImg?imagePath='+this.src:this.src
            },
            styleType(){
                return {
                    width: (this.size||this.width)+'px',
                    height: (this.size||this.height)+'px',
                    borderRadius:typeof this.round==='string'
                        ?this.round===''
                            ?(this.size||this.height)/2+'px'
                            :this.round+'px'
                        :0
                }
            }
        },
        props: {
            width:{
                type: String,
                default: '40'
            },
            height:{
                type: String,
                default: '40'
            },
            myNode:{ //是否是node服务器上图片
                type:Boolean,
                default:true
            },
            src:String,
            round:{ //圆角
                type:Boolean|String,
                default:false
            },
            size:String,
        }
    }
</script>

<style scoped lang='scss'>

</style>
