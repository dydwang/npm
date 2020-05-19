<template>
    <div id="forget">
        <el-card class="box-card">
            <p style="text-align: center">忘记密码</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">

                <el-form-item label="手机" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>

                <el-form-item label="验证码" >
                    <el-input v-model="code" :disabled="(ruleForm.phone+'').length!==11" >
                        <el-button :disabled="(ruleForm.phone+'').length!==11" slot="append" @click="$message.success('短信验证码码为1234')">获取验证码</el-button>
                    </el-input>
                </el-form-item>

            </el-form>
            <div style="width: 100%;margin: 0 auto 30px auto;">
                <el-button type="primary" :disabled="code!=1234" style="width: 100%" @click="login">登陆</el-button><br>
            </div>

            <el-button type="text" @click="$routerGo('/Login')">返回登陆</el-button>
            <el-button type="text" style="float: right"  @click="$routerGo('/signUp')">立即注册</el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "forget",
        props: [''],
        data() {
            let phone = (rule, value, callback) => {
                let c=value+''
                if(c.length!==11){
                    callback(new Error('手机号为11位'));
                }else{
                    if(isNaN(Number(value))){
                        callback(new Error('手机号为数字'));
                    }else{
                        callback()
                    }
                }
            };
            return {
                ruleForm:{
                    phone:''
                },
                rules: {
                    phone:[
                        { required: true, message: '请填写手机号', trigger: 'blur' },
                        { validator: phone, trigger: 'blur' }
                    ],
                },
                code:''
            }
        },
        methods: {
            login(){
                let that=this

                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            delete this.ruleForm.veri
                            let cnt={
                                $where:{
                                    password:this.ruleForm.password
                                },
                                $or:{
                                    username:this.ruleForm.username,
                                    phone:this.ruleForm.username,
                                }
                            }
                            that.$api.get('user',cnt, res => {
                                if (res.length) {
                                    that.$userInfo(res[0])
                                    this.$routerGo('/myInfo')
                                } else {
                                    this.$message.error('账号或密码错误')
                                }
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }

                    });
            }
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
    #forget {
        width: 400px;
        height: 400px;
        margin: 0 auto;
    }
</style>