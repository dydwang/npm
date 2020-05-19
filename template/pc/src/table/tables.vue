<template>
    <div id="tables">
        <el-row>
            <el-button  round plain @click="allTable('add')" type="primary">全部创建</el-button>
            <el-button  round plain @click="allTable('del')" type="danger">全部删除</el-button>
            <el-button  round plain @click="allTable('clear')" type="warning">全部清空</el-button>
        </el-row>
        <el-table :data="table">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left"  class="demo-table-expand">
                        <el-form-item v-for="(item,id) in scope.row.table" :key="id" :label="id+':'">
                            <span>{{ item }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="id" type="index" width="50"></el-table-column>

            <el-table-column prop="name" label="表名"></el-table-column>

            <el-table-column prop="num" label="行数"></el-table-column>

            <el-table-column prop="name" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" round plain type="primary" @click="add(scope.row)">新建</el-button>
                    <el-button size="mini" round plain type="danger" @click="del(scope.row)">删除</el-button>
                    <el-button size="mini" round plain type="warning" @click="clear(scope.row)">清空</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "tables",
        props: ['table'],
        data() {
            return {}
        },
        methods: {
            allTable(method){
                let that=this
                this.table.map((row,index)=>{
                    that[method](row)
                })
            },
            add(row){
                let cnt={
                    $method:'createTable',
                    $table:row.name,
                    $col:row.table
                }
                this.$api.mysqlTable(cnt,res=>{
                    if(res){
                        this.$notify({message:row.name+  '创建成功',type: 'success'});

                    }else{
                        this.$notify.error({message:row.name+  '创建失败'});

                    }
                })
            },
            del(row){
                let cnt={
                    $method:'deleteTable',
                    $table:row.name,
                }
                this.$api.mysqlTable(cnt,res=>{
                    if(res){
                        this.$notify({message:row.name+ '删除成功',type: 'success'});
                    }else{
                        this.$notify.error({message: row.name+ '删除失败'});

                    }
                })
            },
            clear(row){
                let cnt={
                    $method:'clearTable',
                    $table:row.name,
                }
                this.$api.mysqlTable(cnt,res=>{
                    if(res){
                        this.$notify({message:row.name+  '清空成功',type: 'success'});
                    }else{
                        this.$notify.error({message: row.name+ '清空失败'});

                    }
                })
            },
        },
        async mounted() {
            let table=this.$JSP(this.table)
            table.forEach((val,index)=>{
                let cnt={
                    $method:'get',
                    $table:val.name,
                }
                this.$api.mysqlTable(cnt,res=>{
                    if(res){
                        val.num=res.length
                        this.table.splice(index,1,val)
                    }
                })
            })
        },
        created() {
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #tables {

    }
</style>