<template>
    <div id="box" :style="{backgroundColor:backgroundColor}">
        <div id="form">
            <slot name="dydLoginForm">
                <dydLoginForm ></dydLoginForm>
            </slot>
            <slot name="dydLoginSign">
                <dydLoginSign></dydLoginSign>
            </slot>
        </div>

    </div>
</template>

<script>
    import dydLoginForm from './form'
    import dydLoginSign from './sign'
    export default {
        name: "dydLogin",
        props:{
            backgroundColor:{
                type: String,
                default: '#2d3a4b'
            },
        },
        data() {
            return {}
        },
        methods: {},
        mounted() {
        },
        created() {
        },
        components:{
            dydLoginForm,dydLoginSign
        }
    }
</script>

<style scoped lang='scss'>
    #box {
        height: 100vh;
        width: 100%;
        #form{
            width: 500px;
            height: 100%;
            margin: 0 auto;
        }
        min-height: 520px;
    }
</style>