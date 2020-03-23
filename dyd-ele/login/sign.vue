<template>
    <div id="sign">
        <el-button v-if="register" type="text" @click="createUser" style="float: left">注册账号</el-button>
        <el-button v-if="forget" type="text"  @click="forgetPassword" style="float: right">忘记密码？</el-button>
    </div>
</template>

<script>
    export default {
        name: "dydLoginSign",
        props: ['register','forget'],
        data() {
            return {}
        },
        methods: {
            createUser(){
                this.$router.push(this.register)
            },
            forgetPassword(){
                this.$router.push(this.forget)
            }
        },
        mounted() {
        },
        created() {
        },
    }
</script>

<style scoped lang='scss'>
    #sign {

    }
</style>