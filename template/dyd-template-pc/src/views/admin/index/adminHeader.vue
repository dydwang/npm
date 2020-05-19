<template>
    <div id="items">

        <div class="right-menu">
            <el-dropdown  trigger="click">
                <div>
                    <el-button type="text">
                        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                             class="user-avatar" width="40px" height="40px" style="border-radius: 10px;margin-top: 4px">
                        <i class="el-icon-caret-bottom" />
                    </el-button>

                </div>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item >
                        <span style="display:block;" @click="logout">我的资料</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">退出登陆</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import adminInfo from '../../../store/admin'
    export default {
        name: "item",
        props: [''],
        data() {
            return {}
        },
        methods: {
            async logout() {
                adminInfo('clear')
                this.$router.push(`/admin_login`)
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
    #items {
        margin-right: 20px;
        line-height: normal;
        .el-button{
            padding: 0;
        }
        .navbar {
            height: 50px;
            overflow: hidden;
            position: relative;
            background: #fff;
            box-shadow: 0 1px 4px rgba(0,21,41,.08);

            .hamburger-container {

                height: 100%;
                float: left;
                cursor: pointer;
                transition: background .3s;
                -webkit-tap-highlight-color:transparent;

                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }

            .breadcrumb-container {
                float: left;
            }

            .right-menu {
                float: right;
                height: 100%;

                &:focus {
                    outline: none;
                }

                .right-menu-item {
                    display: inline-block;
                    padding: 0 8px;
                    height: 100%;
                    font-size: 18px;
                    color: #5a5e66;
                    vertical-align: text-bottom;

                    &.hover-effect {
                        cursor: pointer;
                        transition: background .3s;

                        &:hover {
                            background: rgba(0, 0, 0, .025)
                        }
                    }
                }

                .avatar-container {
                    margin-right: 30px;

                    .avatar-wrapper {
                        margin-top: 5px;
                        position: relative;

                        .user-avatar {
                            cursor: pointer;
                            width: 40px;
                            height: 40px;
                        }

                        .el-icon-caret-bottom {
                            cursor: pointer;
                            position: absolute;
                            right: -20px;
                            top: 25px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
</style>
