<template>
    <el-form class="login-form" ref="login-form" label-position="left" :rules="rules" :model="user">

        <div class="title-container">
            <h3 class="title">
                {{titleText}}
            </h3>
        </div>
        <el-form-item prop="username">
            <el-input
                    v-model="user.username"
                    placeholder="请输入用户名"
                    type="text"
                    clearable
            />
        </el-form-item>
        <el-form-item prop="password">
            <el-input
                    v-model="user.password"
                    :type="passwordType"
                    placeholder="请输入密码"
                    name="password"
                    show-password
            />
        </el-form-item>
        <!--<el-checkbox v-model="checked" style="float: right;margin-top: -6px">记住密码</el-checkbox>-->
        <el-button  @click="login" type="primary" style="width:100%;margin:40px 0 0 0;">
            登录
        </el-button>
    </el-form>
</template>

<script>
    export default {
        name: 'dydLoginForm',
        props:['titleText','toSuccess'],
        data() {
            return {
                user:{username: '',password: ''},
                passwordType: 'password',
                loading: null,
                rules:{
                    username:[{ required: true, message: '请输入账号', trigger: 'blur' },],
                    password:[{ required: true, message: '请输入密码', trigger: 'blur' },],
                },
                checked:true,
            }
        },
        methods: {
            //进入登陆前
            beforeLogin(){

            },
            //验证登陆
            login(){
                this.$refs['login-form'].validate((valid) => {
                    if (valid) {
                        this.loading= this.$loading({
                            lock: true,
                            text: '登陆中',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.5)'
                        });
                        this.$emit('verify',this.user,callback=>{
                            this.verify(callback)
                        })
                    }else{
                        this.$message.error('请输入完整')
                    }
                })
            },
            //是否登陆成功
            verify(val){
                if(val){
                    this.remember()
                    this.$router.push(this.toSuccess)
                }else{
                    this.$message.error('账号或密码错误')
                }
                this.loading.close();
            },

            //是否记住密码
            remember(){
                if(this.checked){
                    localStorage.setItem('userLogin',JSON.stringify(this.user))
                }
            }
        },
        mounted() {
            let adminInfo=JSON.parse(localStorage.getItem('userLogin'));
            if(adminInfo){
                this.user=adminInfo
            }
        },
        components:{

        }
    }
</script>
<style  lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #283443;
    $light_gray: #fff;
    $cursor: #fff;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-form .el-input input {
            color: $cursor;
        }
    }

    /* reset element-ui css */
    .login-form {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style scoped lang='scss'>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-form {
        position: relative;
        width: 100%;
        max-width: 100%;
        padding-top: 160px ;

        overflow: hidden;
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
        .el-input__inner{
            background-color: #000 !important;
        }
        .title {
            font-size: 26px;
            color: #EEEEEE;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }

            .set-language {
                color: #fff;
                position: absolute;
                top: 3px;
                font-size: 18px;
                right: 0px;
                cursor: pointer;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }

        .thirdparty-button {
            position: absolute;
            right: 0;
            bottom: 6px;
        }

        @media only screen and (max-width: 470px) {
            .thirdparty-button {
                display: none;
            }
        }
    }
</style>