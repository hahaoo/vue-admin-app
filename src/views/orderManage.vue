<template>
  <div class="overseas-wrap">
    <div class="header">
      <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <van-tabs
        v-model="active"
        animated
        swipeable
        color="#1087eb"
        title-inactive-color="#939393"
        title-active-color="#333"
        @change="onClickTab"
      >
        <van-tab title="已预报" :name="1">
          <order-list :status="active"></order-list>
        </van-tab>
        <van-tab title="已上架" :name="2">
          <order-list :status="active"></order-list>
        </van-tab>
        <van-tab title="待打包" :name="3">
          <order-list :status="active"></order-list>
        </van-tab>
        <van-tab title="已出库" :name="4">
          <order-list :status="active"></order-list>
        </van-tab>
        <van-tab title="已发货" :name="5">
          <order-list :status="active"></order-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { NavBar, Tab, Tabs } from "vant";
import OrderList from "./components/overSeas/OrderList.vue";
export default {
  name: "overseas",
  components: {
    OrderList,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      active: 1,
    };
  },
  created() {
    console.log(this.$route);
    var status = this.$route.query.status;
    this.active = status ? parseInt(status) : this.active;
  },
  methods: {
    onClickLeft() {
      // console.log(this.$router);
      this.$router.go(-1);
    },
    onClickTab() {},
  },
};
</script>
<style lang="less">
.overseas-wrap {
  .content {
    .van-tab {
      flex-basis: 20% !important;
    }
    .van-hairline--surround::after {
      border-width: 0;
    }
  }
}
</style>
