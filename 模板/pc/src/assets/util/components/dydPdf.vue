<template>
    <div id="box"  >
        <pdf
                v-for="i in pageCount"
                :key="i"
                :page="i"
                v-infinite-scroll="load"
                :infinite-scroll-disabled="disabled"
                :src="pdfUrl" style="width: 100%; height: auto;" @num-pages="numPages=$event">
        </pdf>
        <div v-if="numPages===0" style="margin-top: 40vh"></div>
        <div style="margin: 0 auto;text-align: center;color: #409eff" v-if="numPages===0||loading" class="message">加载中
            <i class="el-icon-loading" ></i></div>
        <p v-if="noMore" style="text-align: center">没有更多了</p>
    </div>
</template>


<script>
    import pdf from 'vue-pdf'
    export default {
        name: "dydPdf",
        props: ['src'],
        data() {
            return {
                tableData:{},

                pageCount:0,//加载了多少页
                pdfUrl:'',//pdf转换在线方式
                numPages:0,//加载总页数
                loading: false
            }
        },
        computed: {
            noMore () {
                return this.pageCount >= this.numPages&&this.numPages>0
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        methods: {
            load () {
                this.loading = true
                setTimeout(() => {
                    this.pageCount ++
                    this.loading = false
                }, 600)
            },
            loadPdfHandler() {
                //src为你服务器上存放pdf的路径
                this.pdfUrl.then(pdf => {
                    this.pageCount=0
                    this.numPages = pdf.numPages
                    if(this.pageCount < this.numPages){
                        this.pageCount++
                    }
                }).catch(error=>{
                    this.$message.error('加载失败')
                })
            },
        },
        mounted() {


        },
        created() {
            this.pdfUrl = pdf.createLoadingTask(this.src);
            this.loadPdfHandler()
        },
        components:{
            pdf
        }
    }
</script>

<style scoped lang='scss'>
    #box {
        width: 100%;
        .iframes{

            height:100%;
            position:fixed;
            left: 0;

        }
    }
</style>