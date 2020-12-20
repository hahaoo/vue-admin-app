<template>
  <div class="footer-content">
    <van-tabbar
      route
      v-model="active"
      active-color="#1087eb"
      inactive-color="#000"
    >
      <van-tabbar-item to="/index" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/orderManage" icon="cart-o"
        >订单管理</van-tabbar-item
      >
      <van-tabbar-item to="/userCenter" icon="friends-o"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "FooterCom",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style lang="less">
.footer-content {
  .van-tabbar {
    height: auto;
  }
  .van-tabbar-item {
    padding: 3px 0;
  }
  .van-icon {
    font-size: 24px;
  }
  .van-tabbar-item__text {
    font-size: 13px;
  }
}
</style>
