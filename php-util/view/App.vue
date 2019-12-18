
<template>
    <div id="App">
        <el-button style="margin-left: 60%;margin-top: 30px" type="primary" @click="createTableAll">全部创建</el-button>
        <el-button type="primary" @click="clearTableAll">全部清空</el-button>
        <el-button type="primary" @click="deleteTableAll">全部删除</el-button>
        <el-table
                v-if="rowNum!==[]"
                :data="files"
                style="width: 80%;margin: 0 auto">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="名称"
                    width="300">
                <template slot-scope="scope">
                    {{scope.row}}
                </template>
            </el-table-column>
            <!--<el-table-column-->
                    <!--v-if="rowNum!==[]"-->
                    <!--label="行数"-->
                    <!--width="300">-->
                <!--<template slot-scope="scope" >-->
                    <!--{{rowNum[scope.$index]}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="clearTable(scope.row)" size="mini">清空</el-button>
                    <el-button @click="deleteTable(scope.row)"  size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    function ajaxs(url,callback){
        var ajax=new XMLHttpRequest();

        //url方法，如果发送数据段格式为xxx。php？name=jack&age=18，需要拼接
        ajax.open('get',url);
        ajax.send();
        ajax.onreadystatechange=function(){
            if(ajax.readyState===4&&ajax.status===200){
                callback(ajax.response)
            }
        }
    }
    module.exports =  {
        name: "myApp",
        props: ['files'],
        data() {
            return {
                rowNum:[]
            }
        },
        methods: {

            getAllFiles(callback){
                this.files.forEach((val)=>{
                    callback(val)
                })
            },
            clearTable(tableName){
                this.http("clear",tableName,res=>{
                    if(res==='true'){
                        this.$message.success('清除成功'+tableName)
                    }else{
                        this.$message({
                            message: tableName+'清除失败',
                            type: 'error',
                            showClose: true,

                            duration:0
                        });
                    }
                })
            },
            clearTableAll(){
                this.getAllFiles(res=>{
                    this.clearTable(res)
                })
            },

            createTable(tableName){
                this.http("create",tableName,res=>{
                    if(res==='true'){
                        this.$message.success('创建成功'+tableName)
                    }else{
                        this.$message({
                            message: tableName+'已有此数据库或数据库错误',
                            type: 'error',
                            showClose: true,
                            duration:0
                        });
                    }
                })

            },
            createTableAll(){
                this.getAllFiles(res=>{
                    this.createTable(res)
                })
            },
            deleteTable(tableName){
                this.http("delete",tableName,res=>{
                    if(res==='true'){
                        this.$message.success('删除成功'+tableName)
                    }else{
                        this.$message({
                            message: tableName+'删除失败',
                            type: 'error',
                            showClose: true,
                            duration:0
                        });
                    }
                })
            },
            deleteTableAll(){
                this.getAllFiles(res=>{
                    this.deleteTable(res)
                })
            },
            http(url,tableName,callback){
                ajaxs(url+'.php?tableName='+tableName,res=>{
                    callback(res)
                })
            },
            getRowNum(index,tableName){
                console.log(index+' 行',tableName)
                let num;
                this.http("row",tableName,res=>{
                    res=JSON.parse(res)
                    num = res[0].count
                    this.rowNum[index]=num
                })
            },
            getRowNumAll(){
                this.files.forEach((val,index)=>{
                    this.getRowNum(index,val)
                })
            }
        },
        mounted() {
        },
        created() {
           this.getRowNumAll()
        },
    }
</script>

<style scoped >
    #App {
        width: 100%;
        height: 100%;
    }
</style>