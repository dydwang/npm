export default function routerGo(newPath,newQuery={},callback) {
    let oldPath=this.$route.fullPath
    let oldQuery=this.$route.query
    let cnt={
        oldPath:oldPath,
        oldQuery:oldQuery,
        newPath:newPath,
        newQuery:newQuery,
    }
    if(oldPath!==newPath){
        this.$router.push({
            path:newPath,
            query:newQuery
        })
    }
    //等待页面渲染完开始回调
    setTimeout(()=>{
        callback?callback(cnt):false  //是否需要回调函数
    },0)
}