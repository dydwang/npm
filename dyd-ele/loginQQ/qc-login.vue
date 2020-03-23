<template>
    <div >
        <i class="el-icon-loading"></i>获取qq资料中
    </div>
</template>
<script>
    export default {
        name:'qq-login',
        beforeCreate() {
            this.$dyd.qq.getUsetInfo(res=>{  //把res 传递给index页面
                localStorage.setItem('userInfoQQ',JSON.stringify(res))
                window.parent['handleSpanClick'](res)
            })
        }
    }
</script>
