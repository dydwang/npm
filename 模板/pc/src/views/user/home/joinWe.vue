<template>
    <div id="comment">
        <div style="text-align: center;font-size: 2.5rem;margin: 3rem 0">
            <div class="news" >联系客服</div>
            <div style="color: #909399">contact customer service</div>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model.number="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model.number="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="问题" prop="text">
                <el-input maxlength="100" type="textarea"  show-word-limit
                          :autosize="{ minRows: 5, maxRows: 5}" v-model.number="ruleForm.text"></el-input>
            </el-form-item>
        </el-form>
        <div style="width: 300px;margin: 0 auto 3rem auto">
            <el-button style="width: 100%" plain round type="primary" @click="submitForm('ruleForm')">立即提交</el-button><br>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comment",
        props: [''],
        data() {
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if ((value+'').length!==11 ) {
                            callback(new Error('手机号为11位'));
                        } else {
                            callback();
                        }
                    }
                }, 1);}
            return {
                ruleForm: {
                    phone: null,
                    name:'',
                    text:''
                },
                rules: {
                    phone: [
                        { validator: checkPhone, trigger: 'blur' }

                    ],
                    name: [
                        { required: true, message: '请输名称', trigger: 'blur' },

                    ],
                    text: [
                        { required: true, message: '请输问题', trigger: 'blur' },

                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                let that=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.ruleForm.ids=Date.now()
                        that.$api.addComment(this.ruleForm,res=>{
                            if(res){
                                that.$message.success('提交成功')
                                that.$refs[formName].resetFields();
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        mounted() {
        },
        created() {
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #comment {
        width: 700px;
        margin: 0 auto;
    }
</style>