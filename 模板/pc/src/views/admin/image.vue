<template>
    <div id="image">
        <el-button @click="dialogVisible=true" type="primary">上传图片</el-button>
        <el-dialog
                :visible.sync="dialogVisible"
                width="20%">
            <div style="width: 10rem;height: 11rem;margin: 0 auto">
                <p style="text-align: center">选择图片</p>
                <up-img :auto-upload="true" @success="success"></up-img>
            </div>
        </el-dialog>

        <el-table :data="tableData">
            <el-table-column label="#" type="index" width="50"></el-table-column>
            <el-table-column label="ID" prop="ids"></el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img :src="$nodeUrl+'getImg?imagePath='+scope.row.image" style="width: 10rem;height: 10rem">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button type="danger" round plain @click="deleteImg(scope.row,scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "image",
        props: [''],
        data() {
            return {
                dialogVisible:false,
                tableData:[]
            }
        },
        methods: {
            deleteImg(row,index){
                this.$api.delImage({ids:row.ids},res=>{
                    if(res){
                        this.tableData.splice(index,1)
                    }
                })
            },
            success(path){
                let cnt={
                    ids:Date.now(),
                    image:path
                }

                this.$api.addImage(cnt,res=>{
                    if(res) {
                        this.tableData.unshift(cnt)
                        this.dialogVisible=false
                    }
                })

            }
        },
        mounted() {
            this.$api.getImage({},res=>{
                if(res) this.tableData=res;
            })
        },
        created() {
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #image {

    }
</style>