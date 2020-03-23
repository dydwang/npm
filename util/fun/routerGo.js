export default function routerGo(path,query='') {
    if(this.$route.fullPath!==path){
        this.$router.push({
            path:path,
            query:query
        })
    }

}