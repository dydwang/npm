<template>
    <div id="index">
        <div style="width: 300px;float: left;padding: 1rem">
            <el-card style="background-color: #f9f9f9" v-if="$userInfo().ids">
                <div style="width: 120px;height: 120px;margin: 0 auto">
                    <user-image width="120px" height="120px" border-radius="60px" :src="$userInfo().userImg"></user-image>
                </div>
                <p style="text-align: center;font-size: 1.8rem"> {{$userInfo().names}}</p>
            </el-card>
            <el-card style="background-color: #f9f9f9" v-else>
                <div @click="$routerGo('/Login')">
                    <div style="width: 120px;height: 120px;margin: 0 auto">
                        <user-image width="120px" height="120px" border-radius="60px" src=""></user-image>
                    </div>
                    <p style="text-align: center;font-size: 1.8rem"> 登录/注册</p>
                </div>
            </el-card>
            <el-menu
                    default-active="0"
                    class="el-menu-vertical-demo">
                <el-menu-item v-show="item.show()" v-for="(item,index) in userMenu" :key="index" :index="'10-'+index"
                              @click="!item.path?item.fun():$routerGo(item.path)">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>

                <el-menu-item index="1" @click="adminLogin">
                    <i class="el-icon-s-tools"></i>
                    <span slot="title">管理员登陆</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div style="padding: 1rem;width: auto;overflow: hidden">
            <div style="width: 100%;">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                userMenu:[
                    {name:'我的信息',path:'/myInfo',icon:'el-icon-menu',show:()=>{return this.showMenu()}},
                    {name:'退出登录',path:'',icon:'el-icon-menu',fun:()=>{this.signOut()},show:()=>{return this.showMenu()}},
                ]
            }
        },
        methods: {
            signOut(){
                this.$userInfo('clear');
                this.$routerGo('/my')
            },
            showMenu(){
                return this.$userInfo().ids
            },
            adminLogin(){
                let admins=this.$router.resolve({
                    path:'/admin_login',
                })

                window.open(admins.href, '_blank')
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
    #index {
        margin-bottom: 20px;
    }
</style>