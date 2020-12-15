<template>
  <div class="index-wrap">
    <div class="content">
      <div class="carousel">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" width="100%" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="section-one">
        <van-grid :column-num="5" clickable class="grid">
          <van-grid-item
            v-for="(item, index) in gridList"
            :key="index"
            :icon="item.icon"
            :text="item.name"
            :to="item.to"
          />
        </van-grid>
      </div>

      <div class="section-two">
        <van-grid>
          <van-grid-item icon="photo-o" text="文字333" />
          <van-grid-item icon="photo-o" text="文字444" />
        </van-grid>
      </div>
    </div>

    <div class="footer">
      <footer-com></footer-com>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { NavBar, Icon, Col, Row, Grid, GridItem, Swipe, SwipeItem } from "vant";
import FooterCom from "@/components/FooterCom";
export default {
  name: "index",
  components: {
    FooterCom,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Col.name]: Col,
    [Row.name]: Row,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-1.jpg"
      ],
      gridList: [
        {
          name: "邮寄限制",
          icon: "free-postage",
          to: "/postLimit"
        },
        {
          name: "运费试算",
          icon: "cashier-o",
          to: "/freightEstimation"
        },
        {
          name: "仓库地址",
          icon: "shop-o",
          to: "/warehouse"
        },
        {
          name: "地址管理",
          icon: "location-o",
          to: "/addressManage"
        },
        {
          name: "订单管理",
          icon: "logistics",
          to: "/overseasOrder"
        }
      ]
    };
  },
  created() {
    console.log(this.$route.meta);
  },
  methods: {
    handleBanner(url) {
      console.log(url);
    }
  }
};
</script>
<style lang="less">
.index-wrap {
  padding-bottom: 60px;
  .header {
    background-color: #fff;
    margin-bottom: 4px;
    .van-nav-bar {
      background: #1087eb;
      height: 38px;
      .van-nav-bar__title {
        color: #fff;
      }
      .van-icon {
        color: #fff;
      }
    }
  }
  .content {
    .carousel {
      margin-bottom: 10px;
    }
    .section-one {
      background-color: #fff;
      margin-bottom: 14px;
      .grid {
        font-size: 16px;
        color: #1087eb;
        .van-icon {
          font-size: 30px;
        }
        .van-grid-item__text {
          font-size: 13px;
          color: #333;
        }
      }
    }
  }
}
</style>
