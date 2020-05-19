<template>
    <div id="box">
        <el-card class="box-card">
            <p style="text-align: center">注册</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <veri ref="veri" :fresh="flag" @makedCode="getMakedCode"></veri>
                    <el-input v-model="ruleForm.veri"></el-input>
                </el-form-item>
            </el-form>
            <div style="width: 100%;margin: 0 auto 30px auto;">
                <el-button type="primary" style="width: 100%;" @click="login">注册</el-button>
            </div>

        </el-card>

    </div>
</template>

<script>
    import veri from './verification'
    export default {
        name: "Login",
        props: [''],
        data() {
            let validatePass = (rule, value, callback) => {
                let string=false
                let number=false
                let v=value.split('')
                v.forEach(val=>{
                    if(isNaN(Number(val))){
                        string=true
                    }else if(typeof Number(val)==='number'){
                        number=true
                    }
                })
                setTimeout(()=>{
                    if(string&&number){
                        callback()
                    }else{
                        callback(new Error('必须包含数字和字母'));
                    }
                },10)


            };


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
                flag:true,
                ruleForm: {
                    username: '',
                    password:'',
                    names:'',
                    veri:'',
                    userImg:''
                },
                rules: {
                    username: [
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
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
                if(this.ruleForm.veri!==this.code){
                    this.$message.error('验证码错误')
                    this.$refs.veri.makeCode('1234567890', 4);
                }else{
                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            delete this.ruleForm.veri;
                            this.ruleForm.ids=Date.now()
                            this.ruleForm.names='游客'+Date.now()
                            that.$api.get('user',this.ruleForm,res=>{
                                if(this.ruleForm.username===res[0].username){
                                    that.$message.error('已有此账号')
                                }else if(this.ruleForm.phone===res[0].phone){
                                    that.$message.error('此手机已被注册')
                                }else{
                                    that.$api.add('user',this.ruleForm,r=>{
                                       that.$routerGo('/Login')
                                    })
                                }
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }

            },
            getMakedCode(code){
                console.log(code)
                this.code=code
            },
            //更换验证码
            refreshCode() {
                this.flag = !this.flag;
            },
        },
        mounted() {
            this.$refs.veri.makeCode('1234567890', 4);
        },
        created() {

        },
        components:{
            veri
        }
    }
</script>

<style scoped lang='scss'>
    #box {
        width: 400px;
        height: 420px;
        margin: 0 auto;
    }
</style>