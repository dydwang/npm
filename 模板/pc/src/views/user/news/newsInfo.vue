<template>
    <div id="box">
        <p style="text-align: center;font-size: 24px">{{query.names}}</p>
        <div style="float: right;font-size: 12px">{{$Time(query.ids).getTime()}}</div>
        <div style="margin-left: 15%;width: 70%;min-height: 30vh" v-html="query.content">

        </div>
        <dyd-video v-if="query.videoPath" :src="query.videoPath"></dyd-video>
        <dyd-pdf v-if="query.pdfPath" style="width: 70%;margin: 0 auto" :src="$nodeUrl+'getPdf?pdfPath='+query.pdfPath"></dyd-pdf>
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