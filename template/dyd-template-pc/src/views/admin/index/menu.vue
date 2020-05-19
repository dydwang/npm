<template>
    <div id="box">
        <el-container style="height: 100vh">
            <el-aside id="asiders"
                      :style="{
                               backgroundColor:asideBackground,
                               color:asideColor,
                               fontSize:asideFont+'px',
                               width: asideWidth+'px'
                          }">
                <div style="text-align: center;height: 50px;background-color: #263445;line-height: 50px;font-size: 14px;font-weight: 600">
                    <img src="./admin.png" width="30px" height="30px" style="position: relative;top:10px" >
                    {{$webTitle}}管理页面
                </div>
                <dydAside :isCollapse="isCollapse" @changeShow="changeShow" :menuBackground="asideBackground" :menuList="menuList" :menuType="menuType"></dydAside>
            </el-aside>
            <el-container>
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
                        <!--<div id="head-main-icon" :style="{height:headerHeight+'px',width:headerHeight+'px',overflow:'hidden',lineHeight: headerHeight+'px'}"-->
                            <!--@click="isCollapse=!isCollapse">-->
                            <!--<i class="el-icon-s-unfold"></i>-->
                        <!--</div>-->
                        <transition name="el-fade-in-linear">
                            <div v-show="showMain" class="transition-box" id="head-main-text">
                                {{navActive.length>1?
                                    menuList[navActive[0]].children[navActive[1]].name
                                    :menuList[navActive[0]].name}}
                            </div>
                        </transition>

                        <adminHeader style="float: right"></adminHeader>
                    </div>
                </el-header>
                <el-main id="mainer" :style="{paddingBottom:headerHeight+'px',}">
                    <div id="main-box">
                        <transition name="el-fade-in-linear">
                            <div class="transition-box" v-show="showMain">
                                <slot name="main"></slot>
                            </div>
                        </transition>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import dydAside from './menu-aside'
    import adminHeader from './adminHeader'
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
                        textColor:'#bfcbd9',  //字体颜色
                        activeTextColor:'#409EFF', //选中字体颜色
                    }
                }
            },
            headerHeight:{
                type: Number,
                default: 49
            },
            headerBackground:{
                type: String,
                default: '#ffffff'
            },
            headerColor:{
                type: String,
                default: '#97a8be'
            },
            headerFont:{
                type: Number,
                default: 20
            },


            asideWidth:{
                type: Number,
                default: 210
            },
            asideBackground:{
                type: String,
                default: '#304156'
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
                showMain:true,
                isCollapse:false,
                navDefaultActive:'0'
            }
        },
        computed:{
          navActive(){
              return this.navDefaultActive+''.split('-')
          }
        },
        components:{
            dydAside,adminHeader
        },
        methods: {
            changeShow(navDefaultActive){
                console.log(navDefaultActive+''.split('-'))
                this.navDefaultActive=navDefaultActive
                this.showMain=false
                setTimeout(()=>{
                    this.showMain=true
                },200)
            }
        },
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
            box-shadow: 0 1px 4px rgba(0,21,41,.08);
            font-weight: 600;
            text-align: left;
            #head-main{
                & *{
                    float: left;
                }
                #head-main-text{
                    font-weight: 600;
                    margin:0 6px;
                }
                #head-main-ele{
                    width: auto;
                }
            }
        }
        #asiders{
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
        #asiders::-webkit-scrollbar { /*滚动条整体样式*/
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
