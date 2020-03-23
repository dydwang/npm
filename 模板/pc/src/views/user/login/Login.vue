<template>
    <div id="boxLogin">
        <el-card class="box-card">
            <p style="text-align: center">登陆</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <veri ref="veri" :fresh="flag" @makedCode="getMakedCode"></veri>
                    <el-input v-model="ruleForm.veri"></el-input>
                </el-form-item>
            </el-form>
            <div style="width: 100%;margin: 0 auto 30px auto;">
                <el-button type="primary" style="width: 100%" @click="login">登陆</el-button><br>
            </div>

            <el-button type="text" @click="$routerGo('/signUp')">注册</el-button>
            <el-button type="text" style="float: right" @click="$routerGo('/admin_login')">管理员登陆</el-button>
        </el-card>
    </div>
</template>

<script>
    import veri from './verification'
    export default {
        name: "Login",
        props: [''],
        data() {
            return {
                flag:true,
                ruleForm: {
                    username: '',
                    password:'',
                    veri:''
                },
                code:'',
                rules: {
                    username: [
                        { required: true, message: '请填写账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            getMakedCode(code){
                console.log(code)
                this.code=code
            },
            //更换验证码
            refreshCode() {
                this.flag = !this.flag;
            },
            login(){
                let that=this
                if(this.ruleForm.veri!==this.code){
                    this.$message.error('验证码错误')
                    this.$refs.veri.makeCode('1234567890', 4);
                }else {
                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            delete this.ruleForm.veri
                            that.$api.login(this.ruleForm, res => {
                                if (res.length) {
                                    that.$userInfo(res[0])
                                    console.log(that.$userInfo())
                                    this.$center.$emit('login',res[0])
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
            }
        },
        mounted() {
            this.$refs.veri.makeCode('1234567890', 4);
            console.log(sessionStorage.getItem('userInfo'))
        },
        created() {
            if(this.$userInfo.username){
                this.$routerGo('/')
            }
        },
        components:{
            veri
        }
    }
</script>

<style scoped lang='scss'>
    #boxLogin {
        width: 400px;
        height: 400px;
        margin: 0 auto;
        .box-card{
            margin: 0 auto;
        }
    }
</style>