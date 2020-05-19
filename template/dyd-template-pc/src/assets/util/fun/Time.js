export default class GetTime {
    constructor(time){
        this.date=new Date(parseInt(time)) //time为整型或string
        this.Y=this.date.getFullYear()  //年
        this.M=this.date.getMonth()+1   //月
        this.D=this.date.getDate()      //日
        this.h=this.date.getHours()     //小时
        this.m=this.date.getMinutes()   //分钟
        this.s=this.date.getSeconds()   //秒
        this.w=this.date.getDay()   //星期几
        this.timeType={
            'Y': this.Y,
            'M': this.M,
            'D': this.D,
            'h': this.h,
            'm': this.m,
            's': this.s,
            'w': this.w,
        }
    }
    getTime(type='Y-M-D h:m:s'){
        const array=type.split('')
        let time=''
        array.forEach((val,index,arr)=>{
            time+=this.timeType[val]===undefined?val:this.timeType[val]
        })
        return time
    }
};