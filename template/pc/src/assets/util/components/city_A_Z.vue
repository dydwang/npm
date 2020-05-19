<template>
    <div id="city_A_Z">
        <van-index-bar>
            <div v-for="(item,index) in letter" :key="index">
                <van-index-anchor  :index="item"></van-index-anchor>
                <van-cell
                        v-for="(it,id) in $city_A_Z[item]" :key="id" :title="it.name"
                        @click="selectCity(it)"
                >

                </van-cell>
            </div>
        </van-index-bar>
    </div>
</template>

<script>
    export default {
        name: "city_A_Z",
        props: [''],
        data() {
            return {
                letter:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
            }
        },
        methods: {
            selectCity(it){
                this.$emit('selectCity',it)
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
    #city_A_Z {

    }
</style>