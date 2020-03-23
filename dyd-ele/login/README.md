#使用dyd-login
##示例
```
    <dyd-login>
                <dyd-login-form slot="dydLoginForm" titleText="贵州中孚格致"   @verify="verify" toSuccess="/"  >
                </dyd-login-form>
    
                <dyd-login-sign slot="dydLoginSign" register="/signIn" forget="/signUp" >
                </dyd-login-sign>
     </dyd-login>
     
     methods: {
                 verify(user,callback){
                     console.log(user)
                     setTimeout(()=>{
                         callback(true)
                     },5000)
     
                 }
             },
```
##props  dyd-login
| 名称 | 描述 | 类型 | 是否必传 | 默认值 |
|:------:|:------:|:------:|:------:|:------:|
|backgroundColor|背景颜色|string|否|#2d3a4b|

##props  dyd-login-form
| 名称 | 描述 | 类型 | 是否必传 | 默认值 |
|:------:|:------:|:------:|:------:|:------:|
|titleText|标题|string|否|是|
|toSuccess|验证成功后跳转地址|string|否|是|

##props  dyd-login-sign
| 名称 | 描述 | 类型 | 是否必传 | 默认值 |
|:------:|:------:|:------:|:------:|:------:|
|register|注册账号地址|string|否|是|
|forget|忘记密码地址|string|否|是|

##emit dyd-login-form
| 名称 | 描述 | 接收值 | 返回值 |
|:------:|:------:|:------:|:------:|
|@verify|回调账号密码|(user:Object,callback)|true/false




