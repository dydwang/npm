<template>
    <div class="page-btn " style=" float: right; font-size: 16px;color: #666;padding: 0;margin: 10px 0 40px 0">
        <span v-show="notClick" class="el-icon-loading"></span>
        <span class="page-text">当前页码：第 <span style="color: #f60;">{{page}}/{{allPage}}</span> 页</span>
        <el-button type="primary" :disabled="page===1||notClick"   @click="changePage(page-1)">上一页</el-button>
        <el-button type="primary" :disabled="pageOver ===true||notClick ||page===allPage"  @click="changePage(page+1)">下一页</el-button>
    </div>
</template>

<script>
    export default {
        name: "dydNext",
        props:['setCount','dataNum'],
        data(){
            return{
                page:1,//当前页码
                pageOver:false,
                count:10,
                offset:0,
                notClick:false,//加载时不能点击下一页
                allPage:0//总页码
            }
        },
        methods:{
            changePage(page=this.page){
                this.page=page

                let cnt = {
                    count:this.count,
                    offset:parseInt(page-1)*parseInt(this.count)
                }
                this.notClick=true
                this.$emit('next',cnt,length=>{
                    //记忆当前是第几页
                    this.rememberPage()
                    //加载中不能变化页面
                    this.notClick=false;
                    //父组件点击变化页面后判断下一页是否禁用
                    this.pageOver = length < this.count;
                })
            },
            //修改数据后变为第一页
            defaultPage(){
                this.changePage(1)
            },
            rememberPage(){
                sessionStorage.setItem(this.$route.path+'-page',this.page)
            }
        },
        mounted(){
            if(this.setCount!==""&&this.setCount){ //需要改变每页多少条时
                this.count=this.setCount
            }
           this.allPage= parseInt(this.dataNum/this.count)+(this.dataNum%this.count!==0?1:0)||null//总页数
            this.changePage()
        },
        created()  {  //获取记忆加载的页码数
            let page=parseInt(sessionStorage.getItem(this.$route.path+'-page'))
            this.page=page||1
        }
    }
</script>

<style scoped>

</style>
