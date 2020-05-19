<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div v-for="(item) in 50" :key="item" @click="$routerGo('/',{id:item})" style="margin-right: 10px">
      {{item}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created() {
    let {start,end}=this.$Time(Date.now()).getDay()
    console.log(this.$Time(start).getTime())
    console.log(this.$Time(end).getTime())

    this.$api.get('user',{$where:{namesss:'ce'}},r=>{

    })
  },
  watch:{
    '$route'(news){
      console.log(news.query)
    }
  }
}
</script>
