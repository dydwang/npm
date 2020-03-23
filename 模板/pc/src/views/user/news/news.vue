<template>
    <div id="news" >
        <div style="text-align: center;font-size: 2.5rem;margin: 3rem 0">
            <div class="news" @click="$routerGo('news')">新闻中心</div>
            <div style="color: #909399">NEW CENTER</div>
        </div>
        <el-card shadow="hover" v-for="(item,index) in tableData" :key="index"  style="height:134px;margin-bottom: 2rem">
            <div @click="$routerGo('/newsInfo',item)">
                <div style="height: 60px;width: 90px;padding: 1.5rem 1rem;background-color: #646464;float: left">
                    <div style="font-size: 3rem;float: right;color: #ffffff">
                        {{$Time(item.ids).getTime('M-D')}}
                    </div>
                    <div style="font-size: 2rem;float: left;color: #dcdfe6;">
                        {{$Time(item.ids).getTime('Y')}}
                    </div>
                </div>
                <div style="margin-left: 13rem">
                    <div style="font-size: 3rem;height: 3rem;line-height: 30px">
                        {{item.names}}
                    </div>
                    <div style="font-size: 1.5rem;height: 5rem;line-height: 30px;overflow: hidden;text-indent:3rem" v-html="item.content.substr(0,15)">

                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "news",
        props: [''],
        data() {
            return {
                tableData:[],
                olds:'olds'
            }
        },
        methods: {},
        mounted() {

        },
        created() {
            this.$api.getBlog({},res=>{
                if(res) this.tableData=res
            })
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #news {
        padding:0 100px;
    }
</style>