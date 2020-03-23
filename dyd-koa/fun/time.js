class GetTime {
    constructor(time){
        this.date=new Date(parseInt(time)) //time为整型或string  时间戳
        this.Y=this.date.getFullYear()  //年
        this.M=this.date.getMonth()+1   //月
        this.D=this.date.getDate()      //日
        this.h=this.date.getHours()     //小时
        this.m=this.date.getMinutes()   //分钟
        this.s=this.date.getSeconds()   //秒
    }
    getTime(type='Y-M-D h:m:s'){
        const array=type.split('')
        let time=''
        array.forEach((val,index,arr)=>{
            time+=this[val]===undefined?val:this[val]
        })
        return time
    }
}

module.exports=GetTime