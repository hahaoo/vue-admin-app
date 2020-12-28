<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  created() {},
};
</script>

<style lang="less">
@import "styles/reset";
@commonHeaderHeight: 46px;
@tabHeaderHeight: 44px;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .header {
    .van-nav-bar {
      background: #1087eb;
      color: #fff;
      .van-nav-bar__title,
      .van-icon {
        color: #fff;
      }
    }
  }
  //自适应固定高度
  .fixed-height {
    height: calc(~"100vh - @{commonHeaderHeight} -   @{tabHeaderHeight}");
    max-height: calc(~"100vh - @{commonHeaderHeight} -  @{tabHeaderHeight}");
    overflow-y: auto;
  }
}
</style>
