<template>
  <div class="index-wrap">
    <div class="content">
      <div class="carousel">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <!-- <img v-lazy="image" width="100%" /> -->
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
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item>
            <van-button type="info">开始转运</van-button>
          </van-grid-item>
          <van-grid-item>
            <van-button type="primary">马上拼邮</van-button>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="section-three">
        <div class="s-header">
          <van-divider
            :style="{
              color: '#1989fa',
              borderColor: '#1989fa',
              padding: '0 16px',
              fontSize: '16px',
            }"
          >
            正在拼邮
          </van-divider>
        </div>
        <div class="s-list">
          <PinyouList></PinyouList>
        </div>
      </div>
    </div>
    <div class="footer">
      <footer-com></footer-com>
    </div>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Grid,
  GridItem,
  Swipe,
  SwipeItem,
  Button,
  Divider,
} from "vant";
import FooterCom from "@/components/FooterCom";
import PinyouList from "./components/pinyou/List";
export default {
  name: "index",
  components: {
    FooterCom,
    PinyouList,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    [Divider.name]: Divider,
  },
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-1.jpg",
      ],
      gridList: [
        {
          name: "邮寄限制",
          icon: "free-postage",
          to: "/postLimit",
        },
        {
          name: "运费试算",
          icon: "cashier-o",
          to: "/freightEstimation",
        },
        {
          name: "仓库地址",
          icon: "shop-o",
          to: "/warehouse",
        },
        {
          name: "地址管理",
          icon: "location-o",
          to: "/addressManage",
        },
        {
          name: "订单管理",
          icon: "logistics",
          to: "/overseasOrder",
        },
      ],
    };
  },
  created() {
    console.log(this.$route.meta);
  },
  methods: {
    handleBanner(url) {
      console.log(url);
    },
  },
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
    [class*="van-hairline"]::after {
      border: none;
    }
    .carousel {
      margin-bottom: 10px;
    }
    .section-one {
      margin-bottom: 14px;
      .grid {
        font-size: 16px;
        color: #1087eb;
        .van-grid-item__content {
          background-color: transparent;
        }
        .van-icon {
          font-size: 30px;
        }
        .van-grid-item__text {
          font-size: 13px;
          color: #333;
        }
      }
    }
    .section-two {
      .van-grid-item__content--center {
        padding: 0px;
        .van-button {
          width: 100%;
        }
      }
    }
    .section-three {
      .s-header {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
