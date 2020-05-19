<template>
    <div id="search">
        <el-input @change="changeSearch" v-model="search" placeholder="请输入内容"></el-input>
    </div>
</template>

<script>
    export default {
        name: "search",
        props: [''],
        data() {
            return {
                search:''
            }
        },
        methods: {
            changeSearch(){
                this.$routerGo('/home',{},(call)=>{
                    console.log(call)
                })
            }
        },
        mounted() {
        },
        created() {
        },
        components: {},
        watch: {
            search(news){

            }
        },
    }
</script>

<style scoped lang='scss'>
    #search {

    }
</style>