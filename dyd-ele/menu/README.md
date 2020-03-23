#使用dyd-menu
##示例
```
    <dyd-menu menuText="贵州中孚格志" :menuList="menuList" :asideWidth="200" >
          <div slot="menu-icon" class="el-icon-platform-eleme" style="font-size: 60px;">图片</div>
          <div slot="menu-ele"><el-button >操作栏</el-button></div>
          <div slot="main">
            <router-view></router-view>
          </div>
    </dyd-menu>
```
##props
| 名称 | 描述 | 类型 | 是否必传 | 默认值 |
|:------:|:------:|:------:|:------:|:------:|
|menuText|标题|string||
|menuList|菜单列表|array|是|无
|menuType|左侧菜单风格|object|否|{textColor:'#ffffff',  //字体颜色activeTextColor:'#ffd04b', //选中字体颜色}|
|||||||||||||||||||||||||||||
|headerHeight|头部高度|string|否|60|
|headerBackground|头部颜色|string|否|#545c64|
|headerColor|头部字体颜色|string|否|#ffffff|
|headerFont|头部字体大小|string|否|20|
|||||||||||||||||||||||||||||
|asideWidth|左侧宽度|string|否|160|
|asideBackground|左侧颜色|string|否|#545c64|
|asideColor|左侧字体颜色|string|否|#ffffff|
|asideFont|左侧字体大小|string|否|14|


##menuList 示例
```$xslt
let menu=[
            {
                path:'/test',
                name:'课程管理',
                icon:'el-icon-eleme',
                children:[]
            },
            {
                path:'/',
                name:'新闻管理',
                icon:'zf-icon-news',
                children:[
                    {
                        path:'/',
                        name:'新闻表格',
                        icon:'el-icon-eleme',
                        children:[]
                    },
                    {
                        path:'/',
                        name:'创建新闻',
                        icon:'el-icon-eleme',
                        children:[]
                    },
                ]
            },   
]

export default menu

```