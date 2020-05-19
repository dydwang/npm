/**
 * @param message 提示消息
 * @param time 显示时间
 * */
//引入外部样式
import './message.css'

export  default  function showMessage(message,time,messageId) {
  //父节点
  let body=document.getElementsByTagName('body')[0]
  //消息子节点
  let messageDiv=document.createElement('div')

  //给节点id
  messageDiv.id='messageDiv'+messageId
  messageDiv.appendChild(document.createTextNode(message))
 // body.appendChild(messageDiv)

  //到指定时间关闭节点
  setTimeout(()=>{
    body.removeChild(document.getElementById('messageDiv'+messageId))
  },time)
  moveMessage(messageId)
}


//移动消息提示
let moveMessage=function (messageId) {
  let messageDiv=document.getElementById('messageDiv'+messageId)
  let px=0
  let setI= setInterval(()=>{
    messageDiv.style.top=px+'px'
    px+=1
  },10)

  setTimeout(()=>{
    window.clearInterval(setI)
  },200)
}
