<template>
    <div>
        <el-button type="primary" round plain @click="dialogVisible=true;updates=false;openDia($JSP(ruleForm))">发布新闻</el-button>
        <el-table :data="tableData">
            <el-table-column
                    width="50"
                    type="index">
            </el-table-column>
            <el-table-column
                    prop="names"
                    label="名称">
            </el-table-column>


            <el-table-column
                    label="创建时间">
                <template slot-scope="scope">
                    {{$Time(scope.row.ids).getTime()}}
                </template>
            </el-table-column>

            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button  size="mini" plain round type="warning" @click="updateBlog(scope.row,scope.$index)">修改</el-button>
                    <el-button  size="mini" plain round type="danger" @click="chagneTtstus(scope.row,scope.$index)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                :visible.sync="dialogVisible"
                width="50%">
           <createNews ref="createNews" @closeDia="closeDia" :updates="updates" :index="index" :ruleForm="$JSP(ruleForm)"></createNews>
        </el-dialog>
    </div>
</template>

<script>
    import createNews from './create'
    export default {
        name: 'MyOrder',
        data () {
            return {
                index:'',
                tableData:[],
                dialogVisible:false,
                updates:false,
                ruleForm:{
                    names: '',
                    pdfPath:'',
                    videoPath:'',
                    content:'',
                }
            };
        },
        created() {
            this.$api.get('news',{$orderBY: {col:'ids'}},res=>{
                if(res) this.tableData=res
            })
        },
        methods:{
            chagneTtstus(row,index){
                this.$api.delBlog({ids:row.ids},res=>{
                    if(res){
                        this.$message.success('删除成功')
                        this.tableData.splice(index,1)
                    }
                })
            },
            openDia(row){
                setTimeout(()=>{
                    this.$refs.createNews.openDia(this.$JSP(row),this.updates)
                    },0)
            },
            updateBlog(row,index){
                this.index=index
                this.ruleForm=row
                this.updates=true
                this.dialogVisible=true
                this.openDia(this.$JSP(row))
            },
            closeDia(row,index){
                if(this.updates){
                    this.tableData.splice(index,1,row)
                }else{
                    this.tableData.unshift(row)
                }
                this.dialogVisible=false
            }
        },
        components:{
            createNews
        }
    };
</script>

<style scoped>

</style>
