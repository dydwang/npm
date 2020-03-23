<template>
    <div id="box" v-if="ruleForms">
        <el-card class="box-card">
            <p style="text-align: center">发布新闻</p>
            <el-form :model="ruleForms" :rules="rules" ref="ruleForms" label-width="60px" class="demo-ruleForms">
                <el-form-item label="标题" prop="names">
                    <el-input v-model="ruleForms.names"></el-input>
                </el-form-item>

                <el-form-item label="文章" prop="content">
                    <quill-editor
                            v-model="ruleForms.content"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                    </quill-editor>
                </el-form-item>

                <el-form-item label="PDF" >
                    <upPdf ref="upPdf" @success="success" @changePdf="changePdf"></upPdf>
                </el-form-item>

                <el-form-item label="视频">
                    <upVideo ref="upVideo" @success="successVideo" @changeVideo="changeVideo"></upVideo>
                </el-form-item>
            </el-form>
            <el-button type="primary" style="width: 450px;margin-left: 50px" @click="submit">发布</el-button>
        </el-card>

    </div>
</template>

<script>
    import Vue from 'vue'
    import VueQuillEditor from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    Vue.use(VueQuillEditor)
    import upPdf from './upPdf'
    import upVideo from './upVideo'
    export default {
        name: "Login",
        props: ['index','updates','ruleForm'],
        data() {
            return {
                editorOption:{},
                pdfFile:'',
                ruleForms:false,
                tableData:[],
                rules: {
                    names: [
                        { required: true, message: '请填写标题', trigger: 'blur' }
                    ],
                },
                videoFile:''
            }
        },
        methods: {
            changePdf(file,pdfNowPath){
                this.pdfFile=file
            },
            success(path){
                let that=this
                this.ruleForms.pdfPath=path
                if(!that.ruleForms.ids)this.ruleForms.ids=Date.now();
                this.ruleForms.username=this.$userInfo.username
                if(this.videoFile){
                    this.$refs.upVideo.submit()
                }else{
                    this.$api.addBlog(this.ruleForms,res=>{
                        if(res){
                            this.$message.success('发布成功')
                            if(this.updates){
                                that.$emit('closeDia',this.ruleForms,this.index)
                            }else{
                                that.$emit('closeDia',this.ruleForms)
                            }
                        }
                    })
                }


            },
            successVideo(path){
                let that=this
                this.ruleForms.videoPath=path
                this.$api.addBlog(this.ruleForms,res=>{
                    if(res){
                        this.$message.success('发布成功')
                        if(this.updates){
                            that.$emit('closeDia',this.ruleForms,this.index)
                        }else{
                            that.$emit('closeDia',this.ruleForms)
                        }

                    }
                })
            },
            changeVideo(file){
                this.videoFile=file
            },
            openDia(form,updates){
                this.ruleForms=form
                if(updates){
                    for(let i in form){
                        this.ruleForms[i]=form[i]
                    }
                    this.ruleForms.names=form.names
                    console.log(this.ruleForms)
                }else{
                    this.ruleForms={
                            names: '',
                            pdfPath:'',
                            videoPath:'',
                            content:'',
                    }
                }
            },
            submit(){
                let that=this
                this.$refs.ruleForms.validate((valid) => {
                    if (valid) {
                        if(this.pdfFile){
                            that.$refs.upPdf.submit()
                        }else{
                            if(!that.ruleForms.ids)this.ruleForms.ids=Date.now();
                            console.log(this.updates)
                            if(!that.updates){
                                that.$api.addBlog(this.ruleForms,res=>{
                                    if(res){
                                        that.$message.success('发布成功')
                                        that.$emit('closeDia',this.ruleForms)
                                    }
                                })
                            }else{
                                that.$api.upBlog(this.ruleForms,res=>{
                                    if(res){
                                        that.$emit('closeDia',this.ruleForms,this.index)
                                    }
                                })
                            }
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onEditorReady(editor) { // 准备编辑器
            },
            onEditorBlur(){}, // 失去焦点事件
            onEditorFocus(){}, // 获得焦点事件
            onEditorChange(){}, // 内容改变事件
            saveHtml:function(event){
                alert(this.content);
            }
        },
        mounted() {
        },
        created() {

        },
        components:{
            upPdf,upVideo
        }
    }
</script>

<style scoped lang='scss'>
    #box {
        width: 600px;
        margin: 50px auto;
    }
</style>