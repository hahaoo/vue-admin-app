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
          <forecast-order :state="active"></forecast-order>
        </van-tab>
        <van-tab title="已上架" :name="2">
          <on-shelf-order :state="active"></on-shelf-order>
        </van-tab>
        <van-tab title="待打包" :name="6">
          <order-list :state="active"></order-list>
        </van-tab>
        <van-tab title="已出库" :name="7">
          <order-list :state="active"></order-list>
        </van-tab>
        <van-tab title="已发货" :name="3">
          <order-list :state="active"></order-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { NavBar, Tab, Tabs } from "vant";
import ForecastOrder from "./components/order/ForecastOrder.vue";
import OnShelfOrder from "./components/order/OnShelfOrder";
import OrderList from "./components/order/OrderList.vue";
export default {
  name: "overseas",
  components: {
    ForecastOrder,
    OnShelfOrder,
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
    var state = this.$route.query.state;
    this.active = state ? parseInt(state) : this.active;
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
  .van-card__desc {
    color: #4587ec;
  }
}
</style>
