<template>
  <div class="domestic-wrap">
    <div class="header">
      <van-nav-bar title="我的国内包裹" left-arrow @click-left="onClickLeft" />
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
          <forecast-order></forecast-order>
        </van-tab>
        <!-- <van-tab title="已签收">
          <sign-order></sign-order>
        </van-tab> -->
        <van-tab title="已上架" :name="2">
          <on-shelf-order></on-shelf-order>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { NavBar, Tab, Tabs } from "vant";
import ForecastOrder from "./components/domestic/ForecastOrder.vue";
// import SignOrder from "./components/domestic/SignOrder.vue";
import OnShelfOrder from "./components/domestic/OnShelfOrder";
export default {
  name: "domestic",
  components: {
    ForecastOrder,
    // SignOrder,
    OnShelfOrder,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      active: 1
    };
  },
  created() {
    console.log(this.$route);
    var status = this.$route.query.status;
    this.active = status ? parseInt(status) : this.active;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickTab() { }
  }
};
</script>
<style lang="less">
.domestic-wrap {
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
