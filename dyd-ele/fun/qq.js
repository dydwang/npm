var request = require('request');

let fun={
    getMe(call){ //获取openId，accessToken
        QC.Login.getMe(function (openId, accessToken) {
            call(openId, accessToken)
        })
    },
    check(){ //是否已经登陆 true/false
        return QC.Login.check()
    },
    signOut(){ //注销登陆
        QC.Login.signOut()
    },
    getUsetInfo(call){
        var paras = {};
        //用JS SDK调用OpenAPI
        QC.api("get_user_info", paras)
        //指定接口访问成功的接收函数，s为成功返回Response对象
            .success(function(s){
                //成功回调，通过s.data获取OpenAPI的返回数据
                call(s.data)
            })
            //指定接口访问失败的接收函数，f为失败返回Response对象
            .error(function(f){
                //失败回调
                console.log("获取用户信息失败！")
            })
            //指定接口完成请求后的接收函数，c为完成请求返回Response对象
            .complete(function(c){
                //完成请求回调
                console.log("完成请求回调！");

            });
    },
    unionID(access_tokenD,call){//存在跨域问题  暂时不能用
        let url="https://graph.qq.com/oauth2.0/me?access_token="+access_tokenD+"&unionid=1"
        request(url,
            function(err, res,bod ) {
               console.log(err, res,bod )
            })
    },
    showPopup(){
        QC.Login.showPopup({
            appId: "101831906",
            redirectURI: "http://gzzfgz.com/#/company"
        })
    }
}
export default fun