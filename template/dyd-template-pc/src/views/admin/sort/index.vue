<template>
    <div id="box">
        <el-button plain round type="primary" @click="dialogVisible=true">  + 添加分类</el-button>

        <el-dialog
                :visible.sync="dialogVisible"
                width="40%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="分类图标" prop="image">
                    <up-img :auto-upload="true" @success="success" :src="ruleForm.image"></up-img>
                </el-form-item>
                <el-form-item label="分类名称" prop="names">
                    <el-input v-model="ruleForm.names"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" v-if="!update">立即创建</el-button>
                    <el-button type="primary" @click="updateForm('ruleForm')" v-else>立即修改</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-table :data="tableData">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="names" label="名称"></el-table-column>
            <el-table-column prop="ids" label="ID"></el-table-column>
            <el-table-column  label="新增时间">
                <template slot-scope="scope">
                    {{$Time(scope.row.ids).getTime()}}
                </template>
            </el-table-column>
            <el-table-column prop="password" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" plain round @click="upSort(scope.$index,scope.row)">修改</el-button>
                    <el-button type="warning" plain round @click="delSort(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import createSort from './createSort'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                dialogVisible:false,
                ruleForm: {
                    names: '',
                    image:''
                },
                update:false,
                index:'',
                tableData:[],
                rules: {names: [{ required: true, message: '请输入分类名称', trigger: 'blur' },],
                    image: [{ required: true, message: '请选择图标', trigger: 'blur' },]}
            }
        },
        methods: {
            success(path){
                this.ruleForm.image=path
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let cnt={
                            names:this.ruleForm.names,
                            ids:Date.now(),
                            image:this.ruleForm.image
                        }
                        this.$api.addSort(cnt,res=>{
                            if(res){
                                this.$message.success('添加成功')
                                this.tableData.splice(0,0,cnt)
                                this.dialogVisible=false
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            updateForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let cnt=JSON.parse(JSON.stringify(this.ruleForm))
                        this.$api.upSort(cnt,res=>{
                            if(res){
                                this.$message.success('修改成功')
                                this.tableData.splice(this.index,1,cnt)
                                this.dialogVisible=false
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            upSort(index,row){
                this.ruleForm=JSON.parse(JSON.stringify(row))
                this.index=index
                this.update=true
                this.dialogVisible=true
            },
            delSort(index,row){
                let cnt=JSON.parse(JSON.stringify(row))
                this.$api.delSort(cnt,res=>{
                    if(res){
                        this.tableData.splice(index,1)
                        this.$message.success('删除成功')
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible=false
            }
        },
        mounted() {
        },
        created() {

            this.$api.getSort({},res=>{
                if(res) {
                    this.tableData=res

                }

            })
        },
        components:{
            createSort
        }
    }
</script>

<style scoped lang='scss'>
    #box {
        .demo-ruleForm{
            width: 90%;
            margin: 0 5%;
        }

    }
</style>