<template>
    <div id="box">
        <p style="text-align: center;font-size: 24px">{{query.names}}</p>
        <div style="float: right;font-size: 12px">{{$Time(query.ids).getTime()}}</div>
        <div style="margin-left: 20%;width: 60%;min-height: 10vh" v-html="query.content"></div>
        <dyd-video style="width: 60%;margin: 0 auto" v-if="query.videoPath" :src="query.videoPath"></dyd-video>
        <dyd-pdf v-if="query.pdfPath" style="width: 60%;margin: 0 auto" :src="$nodeUrl+'getPdf?pdfPath='+query.pdfPath"></dyd-pdf>
    </div>
</template>

<script>

    export default {
        name: "info",
        props: [''],
        data() {
            return {
                query:{}
            }
        },
        methods: {},
        mounted() {
        },
        created() {
           this.query = this.$route.query
        },
        components:{

        }
    }
</script>

<style scoped lang='scss'>
    #box {

    }
</style>