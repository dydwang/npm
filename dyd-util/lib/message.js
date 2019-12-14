/**
 * @param message 提示消息
 * @param time 显示时间
 * */
//引入外部样式
import './message.css'

export  default  function showMessage(message,time) {
  //父节点
  let body=document.getElementsByTagName('body')[0]
  //消息子节点
  let messageDiv=document.createElement('div')

  //给节点id
  messageDiv.id='messageDiv'
  messageDiv.appendChild(document.createTextNode(message))
  body.appendChild(messageDiv)

  //到指定时间关闭节点
  setTimeout(()=>{
    body.removeChild(messageDiv)
  },time)
}
