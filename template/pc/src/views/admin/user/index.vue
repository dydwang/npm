<template>
    <div id="index">
        <el-table :data="tableData">
            <el-table-column label="#" type="index" width="50"></el-table-column>
            <el-table-column label="ID" prop="ids"></el-table-column>
            <el-table-column label="账号" prop="username"></el-table-column>
            <el-table-column label="用户" prop="names"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                tableData:[]
            }
        },
        methods: {},
        mounted() {
            this.$api.login({},res=>{
                this.tableData=res
            })
        },
        created() {
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #index {

    }
</style>