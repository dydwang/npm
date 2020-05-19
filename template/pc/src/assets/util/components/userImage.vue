<template>
    <div>
        <img v-show="src" :style="{width: width,height: height,borderRadius:borderRadius }"
             :src="imgUrl+src"
             type='image/png;image/gif;image/jpg;'
        ><img v-show="!src" :style="{width: width,height: height,borderRadius:borderRadius }"
              src="@/assets/head.jpg"
              type='image/png;image/gif;image/jpg;'>
    </div>

</template>

<script>

    export default {
        name: "userImage",
        data() {
            return {
                imgUrl:this.$nodeUrl+'getImg?imagePath='
            }
        },
        methods: {
        },
        create: {},
        props: {
            width:{
                type: String,
                default: "40px"
            },
            height:{
                type: String,
                default: "40px"
            },
            borderRadius:{
                type: String,
                default: "0"
            },
            src:{
                type: String,
                default: ''
            },
        }
    }
</script>

<style scoped lang='scss'>

</style>