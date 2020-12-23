<template>
  <div class="index-wrap">
    <div class="content">
      <div class="carousel">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" width="100%" height="200px" />
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
            <div class="top">
              <van-row>
                <van-col span="16">
                  <h2>包裹转运</h2>
                  <p>方便快捷</p>
                </van-col>
                <van-col span="8" class="img-box">
                  <img src="../assets/transportIcon.png" alt class="icon-img" />
                </van-col>
              </van-row>
            </div>
            <div class="bottom">
              <van-button type="info" @click="goToTransport()"
                >开始转运</van-button
              >
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="top">
              <van-row>
                <van-col span="16">
                  <h2>省钱拼邮</h2>
                  <p>运费低时效快</p>
                </van-col>
                <van-col span="8" class="img-box">
                  <img src="../assets/pinyouIcon.png" alt class="icon-img" />
                </van-col>
              </van-row>
            </div>
            <div class="bottom">
              <van-button type="primary" @click="goToPinyou()"
                >马上拼邮</van-button
              >
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="section-three">
        <div class="s-header">
          <van-divider
            :style="{
              color: '#333',
              borderColor: '#aaa',
              padding: '0 16px',
              fontSize: '16px',
            }"
            >正在拼邮</van-divider
          >
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
  Col,
  Row,
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
    [Col.name]: Col,
    [Row.name]: Row,
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
          to: "/orderManage",
        },
      ],
    };
  },
  created() {
    console.log(this.$route.meta);
  },
  methods: {
    goToPinyou() {
      this.$router.push("/startPinyou");
    },
    goToTransport() {
      this.$router.push("/startTransport");
    },
    handleBanner(url) {
      console.log(url);
    },
  },
};
</script>
<style lang="less">
.index-wrap {
  padding-bottom: 60px;
  .content {
    [class*="van-hairline"]::after {
      border: none;
    }
    .carousel {
      margin-bottom: 10px;
    }
    .section-one {
      margin-bottom: 10px;
      .grid {
        font-size: 16px;
        color: #1087eb;
        .van-grid-item__content {
          background-color: transparent;
        }
        .van-icon {
          font-size: 34px;
        }
        .van-grid-item__text {
          font-size: 13px;
          color: #333;
        }
      }
    }
    .section-two {
      .van-grid-item__content--center {
        padding: 0;
        border-radius: 5px;
        border: 1px solid #ddd;
      }
      .top {
        margin: 15px 0;
        width: 100%;
        .img-box {
          text-align: left;
          .icon-img {
            margin-top: 6px;
            height: 40px;
          }
        }

        h2 {
          font-size: 15px;
          color: #333;
          margin-bottom: 5px;
        }
        p {
          font-size: 10px;
          width: 85px;
          margin: 0 auto;
          background: #a3d4ff;
          border-radius: 10px;
          padding: 2px;
          color: #fff;
        }
      }
      .bottom {
        width: 100%;
        .van-button {
          width: 100%;
          border-top-right-radius: 0;
          border-top-left-radius: 0;
          font-size: 15px;
        }
        .van-button--info {
          background-color: #1287ff;
          border-color: #1287ff;
        }
        .van-button--primary {
          background-color: #69bb20;
          border-color: #69bb20;
        }
      }
    }
    .section-three {
      .s-header {
        margin-top: 20px;
        font-size: 15px;
        font-weight: 600;
        .van-divider {
          margin: 0px;
        }
      }
    }
  }
}
</style>
