#使用dyd-next
##示例
```
   <dyd-next-page :setCount="20" :dataNum="109" @next="pages"></dyd-next-page>
   
   methods: {
               pages(cnt,call){
                   console.log(cnt)
                   setTimeout(()=>{
                       call(20)
                   },1000)
   
               }
           },
```
##props
| 名称 | 描述 | 类型 | 是否必传 | 默认值 |
|:------:|:------:|:------:|:------:|:------:|
|setCount|每页加载数|number|否|10
|dataNum|数据总量|number|否|无

##emit
| 名称 | 描述 | 接收值 | 返回值 |
|:------:|:------:|:------:|:------:|
|@next|回调分页加载|(cnt:{offset,count},callback)|length(得到数组length)

##ref
this.refs.defaultPage //变为第一页

