<template>
    <div id="box">
        <el-container style="height: 100vh">
            <el-header id="header"
                       :height="headerHeight+'px'"
                       :style="{
                            backgroundColor:headerBackground,
                            color:headerColor,
                            fontSize:headerFont+'px',
                            lineHeight:headerHeight+'px',
                       }"
            >
                <div id="head-main">
                    <div id="head-main-icon" :style="{height:headerHeight+'px',width:headerHeight+'px',overflow:'hidden',lineHeight: headerHeight+'px'}">
                        <slot name="menu-icon"></slot>
                    </div>
                    <div id="head-main-text">{{menuText}}</div>
                    <div id="head-main-ele">
                        <slot name="menu-ele"></slot>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside id="asider"
                          :width="asideWidth+'px'"
                          :style="{
                               backgroundColor:asideBackground,
                               color:asideColor,
                               fontSize:asideFont+'px',
                               paddingBottom:headerHeight+'px',

                          }">
                    <dydAside :menuBackground="asideBackground" :menuList="menuList" :menuType="menuType"></dydAside>
                </el-aside>
                <el-main id="mainer" :style="{paddingBottom:headerHeight+'px',}">
                    <div id="main-box">
                        <slot name="main"></slot>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import dydAside from './menu-aside'
    export default {
        name: "adminMenu",
        props: {
            menuText:{  //标题名称
                type: String,
                required: true
            },
            menuList:{  //菜单列表
                type: Array,
                required: true,
                default:()=>[]
            },
            menuType:{
                type: Object,
                default:()=>{
                    return{
                        textColor:'#ffffff',  //字体颜色
                        activeTextColor:'#ffd04b', //选中字体颜色
                    }
                }
            },
            headerHeight:{
                type: Number,
                default: 60
            },
            headerBackground:{
                type: String,
                default: '#545c64'
            },
            headerColor:{
                type: String,
                default: '#ffffff'
            },
            headerFont:{
                type: Number,
                default: 20
            },


            asideWidth:{
                type: Number,
                default: 160
            },
            asideBackground:{
                type: String,
                default: '#545c64'
            },
            asideColor:{
                type: String,
                default: '#ffffff'
            },
            asideFont:{
                type: Number,
                default: 14
            }
        },
        data() {
            return {

            }
        },
        components:{
            dydAside
        },
        methods: {},
        mounted() {
        },
        created() {
        },
    }
</script>

<style scoped lang='scss'>
    #box {
        width: 100%;
        overflow: hidden;
        display: block;
        #header{

            font-weight: 600;
            text-align: left;
            #head-main{
                & *{
                    float: left;
                }
                #head-main-text{
                    margin:0 6px;
                }
                #head-main-ele{
                    width: auto;
                }
            }
        }
        #asider{
            height: 100vh;
            text-align: left;
            //overflow: auto;


        }
        #mainer{
            width: 100%;
            height: 100vh;
            overflow: auto;
            #main-box{
                padding-bottom: 20px;
            }

        }
        ::-webkit-scrollbar-track { /* 定义滚动条轨道  内阴影+圆角*/
            -webkit-box-shadow: inset 0 0 6px rgba(255,255,255);
            background-color: #fff;
        }

        #mainer::-webkit-scrollbar { /*滚动条整体样式*/
            width: 5px;
            background-color: #f5f5f5;
            border-radius: 5px;
        }
        #asider::-webkit-scrollbar { /*滚动条整体样式*/
            width: 3px;
            background-color: #f5f5f5;
            border-radius: 1px;
        }
        ::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
            border-radius: 3px;
            -webkit-box-shadow: inset 0 0 1px #e4e4e4;
            background-color: #c0c4cc;
        }
    }
</style>