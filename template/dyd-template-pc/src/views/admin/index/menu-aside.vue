<template>
    <div id="menu-aside">
        <el-menu
                :collapse="isCollapse"
                v-if="menuList.length>0"
                :default-active="navDefaultActive"
                class="el-menu-vertical-demo"
                :background-color="menuBackground"
                :text-color="menuType.textColor"
                :active-text-color="menuType.activeTextColor"
                style="overflow: hidden;border: 0">
            <span v-for="(item,key) in menuList"  :key="key">
                        <el-menu-item v-if="item.children.length ===0"    :index="''+key" @click="navActive(item,key)" >
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                        <el-submenu :index="''+key"  v-if="item.children.length >0" >
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span >{{item.name}}</span>
                            </template>
                                <el-menu-item :index="key+'-'+key1" v-for="(item1,key1) in item.children" @click="navActiveChild(key,item1,key1)" :key="key+'-'+key1">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title" >{{item1.name}}</span>
                                </el-menu-item>
                        </el-submenu>
                    </span>
        </el-menu>
    </div>
</template>
<script>
    export default {
        name: "dyd-aside",
        props: ['menuList','menuBackground','menuType','isCollapse'],
        data() {
            return {
                navDefaultActive:'0'
            }
        },
        methods: {
            navActive(item,key) {
                sessionStorage.setItem('navDefaultActive',''+key)
                this.$emit('changeShow',key)
                this.toPath(item.path)

            },
            //二级菜单选中事件
            navActiveChild(key,item1,key1) {
                sessionStorage.setItem('navDefaultActive',''+key+'-'+key1)
                this.$emit('changeShow',key+'-'+key1)
                this.toPath(item1.path)
            },
            toPath(path){
                if(this.$route.path!==path){
                    this.$router.push(path)
                }
            }
        },
        mounted() {
        },
        created() {
            let navDefaultActive=sessionStorage.getItem('navDefaultActive')
            if(navDefaultActive){
                this.navDefaultActive=navDefaultActive
                let path=navDefaultActive.length===1?this.menuList[parseInt(navDefaultActive[0])].path:this.menuList[parseInt(navDefaultActive[0])].children[parseInt(navDefaultActive[2])].path
                this.toPath(path)
            }else{
                this.menuList.forEach((value,index)=>{
                    if(this.$route.path===value.path){
                        this.navDefaultActive=''+index
                    }else if(value.children.length>0){
                        value.children.forEach((val,id)=>{
                            if(this.$route.path===val.path){
                                this.navDefaultActive=index+'-'+id
                            }
                        })
                    }

                })
            }
        },
    }
</script>

<style scoped lang='scss'>
    #menu-aside {
        .itemName{
            margin-left: 10px;
        }
    }
</style>
