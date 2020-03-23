# npm i dyd-ele -S 下载

#使用

~~~
全局使用
import dydEle from 'dyd-ele'
Vue.use(dydEle)


单独使用
import {dydMenu,dydPdf,install} from 'dyd-ele'
install(Vue,[dydMenu,dydPdf])
Vue.use(install)
~~~