#dyd-util
### npm i dyd-util -S 下载
###import util from 'dyd-util' 引入

##使用
```

    import dydUtil from './dyd-util'
    import {serveUrl} from "./url"
    let util =new dydUtil(serveUrl).util
    
    let api={}
    api.getUser=function(cnt,callback){
        util(cnt,url,callback)
    }
    export default api

```



