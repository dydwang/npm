<template>
    <div id="joinWe">
        <el-table :data="tableData">
            <el-table-column label="#" type="index" width="50"></el-table-column>
            <el-table-column label="ID" prop="ids"></el-table-column>
            <el-table-column label="用户" prop="name"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="问题" prop="text"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" round plain @click="deleteImg(scope.row,scope.$index,'false')">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "joinWe",
        props: [''],
        data() {
            return {
                tableData:[]
            }
        },
        methods: {
            deleteImg(row,index,status){
                this.$api.delComment({ids:row.ids},res=>{
                    if(res) this.$message.success('删除成功')
                    this.tableData.splice(index,1)
                })
            }
        },
        mounted() {

            this.$api.getComment({},res=>{
                if(res)this.tableData=res
            })
        },
        created() {
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #joinWe {

    }
</style>