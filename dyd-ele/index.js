const dydMenu  = ()=>import('./menu/index.vue');//菜单
const dydPdf  = ()=>import('./pdf/index.vue');//pdf

const dydLogin  = ()=>import('./login/index.vue');//pdf
const dydLoginForm  = ()=>import('./login/form.vue');//pdf
const dydLoginSign  = ()=>import('./login/sign.vue');//pdf

const dydLoginBox  = ()=>import('./loginBox/index.vue');//pdf

const dydLoginQq  = ()=>import('./loginQQ/index.vue');//pdf

const dydNextPage  = ()=>import('./nextPage/index.vue');//pdf

const dydVideo  = ()=>import('./video/index.vue');//pdf
import fun from './fun/index.js'
const components=[
    dydMenu,
    dydPdf,
    dydLogin,
    dydLoginForm,
    dydLoginSign,
    dydNextPage,
    dydVideo,
    dydLoginQq,
    dydLoginBox
]
const allFun=function(Vue) {
    Vue.prototype.$dyd=fun
};

const installs = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    allFun(Vue);
};

const install = function(Vue, opts = []) {
    opts.forEach(component => {
        console.log(component.name)
        Vue.component(component.name, component);
    });
    allFun(Vue);
};
if (typeof window !== 'undefined' && window.Vue) {
    installs(window.Vue);
}

export default installs;

export{
    install,
    dydMenu,
    dydPdf,
    dydLogin,
    dydLoginForm,
    dydLoginSign,
    dydNextPage,
    dydVideo,
    dydLoginQq,
    dydLoginBox
}