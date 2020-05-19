<template>
    <el-upload
            class="avatar-uploader"
            :action="$nodeUrl+'file/upFile'"
            :show-file-list="false"
            :auto-upload="zidong"
            ref="upload"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="change">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
    export default {
        props:['index','imageUrl','zidong'],
        data() {
            return {
            };
        },
        methods: {
            submits(){  //上传
                this.$refs.upload.submit();
            },
            handleAvatarSuccess(res, file) {
                this.$emit('success',res,this.index)

            },
            change(file, fileList){
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$emit('change',file,this.index)
            },
            verification(){
                if(this.imageUrl!=='') {return true}
                else{return false}
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 25;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                }
                return isJPG && isLt2M;
            }
        },
        mounted() {
        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 70px;
        line-height: 120px;
        text-align: center;
        margin-top: 50px;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
