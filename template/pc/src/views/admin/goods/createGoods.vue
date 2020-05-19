<template>
    <div id="box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="产品名称" prop="names">
                <el-input v-model="ruleForm.names"></el-input>
            </el-form-item>
            <el-form-item label="产品介绍" prop="text">
                <el-input v-model="ruleForm.text"></el-input>
            </el-form-item>
            <el-form-item label="产品图片" prop="image">
                <up-img :auto-upload="true" :src="ruleForm.image" @success="success"></up-img>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" >立即创建</el-button>
                <el-button @click="$emit('closeDia','')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "createGoods",
        props: ['updates'],
        data() {
            return {
                ruleForm:{},
                rules: {
                    names: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
                    text: [{ required: true, message: '请输入产品介绍', trigger: 'blur' }],
                    image: [{ required: true, message: '请输入产品图片', trigger: 'blur' }],
                },
            }
        },
        methods: {

            submitForm(){
                let that=this
                this.$ver(this.$refs.ruleForm).then(()=>{
                    if(!that.updates){
                        if(!that.ruleForm.ids)that.ruleForm.ids=Date.now()
                        that.$api.addGoods(this.ruleForm,res=>{
                            if(res){
                                that.$message.success('添加成功')
                                that.$emit('closeDia',that.ruleForm)
                            }
                        })
                    }else{
                        that.$api.upGoods(this.ruleForm,res=>{
                            if(res){
                                that.$message.success('修改成功')
                                that.$emit('closeDia',that.ruleForm)
                            }
                        })
                    }

                }).catch(()=>{
                    that.$message.error('请输入完整')
                })
            },
            openDia(form,updates){
                if(updates){
                    this.ruleForm=form
                }else{
                    this.ruleForm={
                        names: '',
                        image:'',
                        text: '',
                    }
                }
                console.log(this.ruleForm)
            },
            success(path){
                this.ruleForm.image=path
            }
        },
        mounted() {
        },
        created() {
        },
        components:{

        }
    }
</script>

<style scoped lang='scss'>
    #box {

    }
</style>