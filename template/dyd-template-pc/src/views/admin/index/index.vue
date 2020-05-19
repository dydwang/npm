<template>
    <div id="box">
        <admin-menu :menuText="$webTitle+'后台系统'"  :menuList="menuList" :asideWidth="210" >
            <div slot="main">
                <router-view></router-view>
            </div>
        </admin-menu>
    </div>
</template>

<script>
    import menuList from './menu.js'
    import adminMenu from './menu.vue'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                menuList:menuList,
            }
        },
        methods: {
            backLogins(){
                sessionStorage.setItem('adminInfo', '')
                this.$router.push('/admin_login')
            }
        },
        mounted() {
            let adminInfo=sessionStorage.getItem('adminInfo')
            if(!adminInfo||adminInfo==='') this.$router.push('/admin_login');
            console.log(adminInfo)
        },
        created() {

        },
        components:{
            adminMenu
        }
    }
</script>

<style scoped lang='scss'>
    #box {

    }
</style>
