<template>
    <div id="index">
        <el-button @click="downEx()" style="float: right;" type="primary" round >打印订单</el-button>
        <el-table :data="tableData">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left"  class="demo-table-expand">
                        <el-form-item label="用户Id：">
                            <span>{{ scope.row.userId }}</span>
                        </el-form-item>
                        <el-form-item label="用户名：">
                            <span>{{ scope.row.userName }}</span>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <span>{{ scope.row.message }}</span>
                        </el-form-item>
                        <el-form-item label="收货地址：">
                            <span>{{ scope.row.address }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ids" label="单号"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="num" label="数量"></el-table-column>
            <el-table-column prop="grade" label="总价格/元" >
                <template slot-scope="scope">
                    {{scope.row.price*scope.row.num}}
                </template>
            </el-table-column>
            <el-table-column prop="grade" label="状态">
                <template slot-scope="scope">
                    {{headL[parseInt(scope.row.status)]}}
                </template>
            </el-table-column>

            <el-table-column prop="password" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" v-if="scope.row.status==='0'" size="small" round plain @click="onSubmit('1',scope.row,scope.$index)">发货</el-button>
                    <el-button type="danger" v-if="scope.row.status==='0'" size="small" round plain @click="onSubmit('3',scope.row,scope.$index)">取消</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
   // import downExcel from './export'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                tableData:[],
                headL:['待发货','待收货','已收获','已取消订单'],
            }
        },
        methods: {
            downEx(){
                console.log(123546)
                let name=this.$Time(Date.now()).getTime('Y-M-D')+'订单表'
                console.log(name)
                downExcel(this.tableData,name)
            },
            onSubmit(status,row,index){
                console.log(row)

                this.$api.upPay({ids:row.ids,status:status},res=>{
                    if(res){
                        this.$toast('修改成功')
                        row.status=status
                    }
                })
                if(status==='1'){
                    this.$api.getList({ids:row.listId},res=>{
                        if(res){
                            this.$api.upList({ids:row.listId,num:res[0].num-row.num},r=>{

                            })
                        }
                    })
                }
            },
        },
        mounted() {
            let cnt={
                $link:{
                    table:'user',
                    left:'userId',
                    right:'userId',
                    where:'ids as userId,names as userName'
                }
            }
            this.$api.getPay(cnt,res=>{
                if(res){
                    this.tableData=res
                }
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