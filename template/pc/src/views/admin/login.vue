<template>
    <div class="login-container" >
        <el-form class="login-form" ref="login-form" label-position="left" :rules="rules" :model="user">

            <div class="title-container">
                <h3 class="title">
                    企业门户后台系统
                </h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <i class="iconfont course_user"></i>
                 </span>
                <el-input
                        v-model="user.username"
                        placeholder="请输入账号"
                        type="text"
                />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="iconfont course_ziyuanxhdpi"></i>
                </span>
                <el-input
                        v-model="user.password"
                        :type="passwordType"
                        placeholder="请输入密码"
                        name="password"
                />
                <span class="show-pwd" @click="showPwd">
                    <i :class="passwordType === 'password' ? 'iconfont course_yanjing_bi' : 'iconfont course_yanjing_kai'"/>
                </span>
            </el-form-item>

            <el-button :loading="loading" @click="login" type="primary" style="width:100%;margin:60px 0 0 0;">
                登录
            </el-button>


        </el-form>

    </div>
</template>

<script>


    export default {
        name: 'login',
        data() {
            return {
                user:{username: 'adminadmin',password: 'adminadmin'},
                passwordType: 'password',
                loading: false,
                rules:{
                    username:[{ required: true, message: '请输入账号', trigger: 'blur' },],
                    password:[{ required: true, message: '请输入密码', trigger: 'blur' },],
                },
            }
        },
        methods: {
            login(){
                this.$refs['login-form'].validate((valid) => {
                    if (valid) {
                        console.log(this.user)
                        if(this.user.username==='adminadmin'&&this.user.password==='adminadmin'){
                            sessionStorage.setItem('adminInfo','123456');
                            this.$router.go(0)
                        }else {
                            let cnt=this.user
                            cnt.grade='管理员'
                            this.$api.login(cnt,res=>{
                                if(res.length>0){
                                    console.log(res)
                                    sessionStorage.setItem('adminInfo','123456')
                                    this.$router.go(0)
                                }else {
                                    this.$toast('账号或密码错误')
                                }
                            })
                        }
                    }else{
                        this.$message.error('请输入完整')
                    }
                })

            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
        },
        mounted() {
            let adminInfo=sessionStorage.getItem('adminInfo');
            if(adminInfo&&adminInfo!==''){
                this.$router.push('/admin_user')
            }
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
        .login-container .el-input input {
            color: $cursor;
        }
    }

    /* reset element-ui css */
    .login-container {
        height: 100vh;
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

<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
        min-height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;
        .login-form {
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
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
