<template>
    <div id="box">
        <el-button id="qqLogin" type="text" @click="login" :class="icon"></el-button>

        <el-dialog
                :visible.sync="dialogVisible"
                width="600px">
            <iframe width="500"
                    height="600"
                    border="0"
                    style="border:0"
                    :src='this.url'>
            </iframe>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "dydLoginQQ",
        props: ['url','icon'],
        data() {
            return {
                dialogVisible:false,
                spanClick: 'handleSpanClick' //html中需要响应的事件
            }
        },
        methods: {
            login() {
                this.dialogVisible=true
            },
            doSomeThing(res){
                localStorage.setItem('userInfoQQ',JSON.stringify(res))
                this.$store.state.userInfoQQ=res
                this.dialogVisible=false
            }
        },
        mounted() {
        },
        created() {
            let _this = this
            window[this.spanClick] = (params) => {
                _this.doSomeThing(params)
            }
        },
        components:{

        }
    }
</script>

<style scoped lang='scss'>
    #box {

    }
</style>