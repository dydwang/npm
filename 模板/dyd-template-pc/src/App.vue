<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  html{
    padding: 0 0;
    margin: 0 0;
    width: 100%;
    height: 100%;
    font-size: 62.5%;
  }
  body{
    overflow-x: hidden;
    margin: 0 0;
    padding: 0 0;
    width: 100%;
    height: 100%;
  }
  #app{
    min-width: 300px;
    height: 100%;
  }
  ::-webkit-scrollbar-track { /* 定义滚动条轨道  内阴影+圆角*/
    -webkit-box-shadow: inset 0 0 6px rgba(255,255,255);
    background-color: #e4e4e4;
  }

  ::-webkit-scrollbar { /*滚动条整体样式*/
    width: 0.8rem;
    background-color: #e4e4e4;
    border-radius: 0.42rem;
  }

  ::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 0.25rem;
    -webkit-box-shadow: inset 0 0 1px #e4e4e4;
    background-color: #909399;
  }
</style>
