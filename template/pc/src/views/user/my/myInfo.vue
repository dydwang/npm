<template>
    <div id="boxss">
        <div style="width: 400px;margin: 0 auto;height: 500px;background-color: #f9f9f9;padding: 20px ">
            <div style="text-align: center;font-size: 1.6rem">修改个人信息</div>
            <div style="width: 122px;height: 122px;margin: 0 auto">
                <up-img :auto-upload="true" :src="$userInfo().userImg" @success="success"></up-img>
            </div>

            <el-form  :model="userInfo" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                <el-form-item label="账号">
                    {{userInfo.username}}
                </el-form-item>
                <el-form-item label="手机">
                    {{userInfo.phone}}
                </el-form-item>
                <el-form-item label="昵称" prop="names">
                    <el-input v-model="userInfo.names"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userInfo.password"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="danger" style="width: 100%;margin-top: 30px;margin-bottom: 50px"  @click="update" plain round>修改</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myInfo",
        props: [''],
        data() {
            let validatePass = (rule, value, callback) => {
                let string=false
                let number=false
                let v=value.split('')
                v.forEach(val=>{
                    if(isNaN(Number(val))){
                        string=true
                    }else if(typeof Number(val)==='number'){
                        number=true
                    }
                })
                setTimeout(()=>{
                    if(string&&number){
                        callback()
                    }else{
                        callback(new Error('必须包含数字和字母'));
                    }
                },10)
            };

            let phone = (rule, value, callback) => {

                let c=value+''
                if(c.length!==11){
                    callback(new Error('手机号为11位'));
                }else{
                    if(isNaN(Number(value))){
                        callback(new Error('手机号为数字'));
                    }else{
                        callback()
                    }
                }
            };
            return {
                userInfo:this.$JSP(this.$userInfo()),
                rules: {
                    names: [
                        { required: true, message: '请填写昵称', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    phone:[
                        { required: true, message: '请填写手机号', trigger: 'blur' },
                        { validator: phone, trigger: 'blur' }
                    ],
                },
                userImg:'',
                imageUrl:this.$userInfo().userImg?this.$nodeUrl+'file/getImg?imagePath='+this.$userInfo().userImg:''

            }
        },
        methods: {
            update(){
                this.$ver(this.$refs.ruleForm).then(r=>{
                    this.upUser(this.userInfo)
                }).catch(f=>{
                    this.$message.error('请填写完整')
                })
            },
            upUser(cnt){
                delete cnt.phone;
                this.$api.up('user',cnt,res=>{
                    if(res) {
                        this.$message.success('修改成功')

                        this.$userInfo(this.userInfo)
                        console.log(this.userInfo)
                    }
                })
            },
            success(path){
                this.userInfo.userImg=path
                //this.$userInfo({userImg:path})
            }
        },
        mounted() {
        },
        created() {
        },
        computed:{
            userIn(){
                this.userInfo=this.$JSP(this.$userInfo())
                return this.$JSP(this.$userInfo())
            }
        }
    }
</script>

<style scoped lang='scss'>
    #boxss {
        .el-tabs--left .el-tabs__header.is-left{
            width: 100%;
        }

    }
</style>
