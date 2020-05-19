import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
function json(data){
    return JSON.parse(JSON.stringify(data))
}

let store= new Vuex.Store({
    state: {
        admin:json(sessionStorage.getItem('adminInfo'))||json(localStorage.getItem('adminInfo'))||{
            username:'',
            password:'',
            names:'',
            userImg:'',
            ids:'',
        }
    },
    getters: {
        user(state){
            return state.admin
        },
    },
    mutations: {
        setUser (state, options) {
            if(options==='clear'){
                for(let i in  state.admin){
                    Vue.set(state.admin,`${i}`, '')
                }
            }
            else{
                for(let c in  options){
                    //Vue.set(state.user,`${c}`, options[c]);
                    state.admin[c]=options[c]
                }
            }
            sessionStorage.setItem('adminInfo', JSON.stringify(state.admin))
        }
    }
})
function adminInfo(options=null){
    if(!options) return store.state.admin
    else {
        store.commit('setUser',options)
    }
}
export default adminInfo
