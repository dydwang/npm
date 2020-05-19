#dyd-util
### npm i dyd-util -S 下载
###import util from 'dyd-util' 引入

##api.js使用
```
    import user from './user.js'
    import dydUtil from './dyd-util'
    import {serveUrl} from "./url"
    let util =new dydUtil(serveUrl).util
   
    export util
  
    let api= Object.assign(
        user,
    )
    export api

```

##main.js 引入
```
import {api} from './api.js'
Vue.prototype.$api=api

```

##user.js 使用
```
import {util} from './api.js'

let user={}
let src='users' //当前接口文件夹
user.createUsers=function(data,callback) {
    util(data,src+'/createUsers',callback)
}
export default user

```




