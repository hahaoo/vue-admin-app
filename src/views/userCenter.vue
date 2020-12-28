<template>
  <div class="user-wrap">
    <div class="content">
      <div class="user-info">
        <van-row type="flex">
          <van-col class="user-profile">
            <van-image round src="4.jpg" />
          </van-col>
          <van-col span="16">
            <van-row>
              <van-col span="24" class="user-name">{{ nickName }}</van-col>
              <van-col span="24" class="user-phone">
                <!-- 13288998789 -->
              </van-col>
            </van-row>
          </van-col>
          <van-col span="2" class="user-arrow">
            <!-- <van-icon name="arrow" size="24" /> -->
          </van-col>
        </van-row>
      </div>
      <div class="account-info">
        <div class="grid-panel">
          <van-cell title="我的账户" is-link to class="title"></van-cell>
          <van-grid clickable :column-num="4" class="grid" :border="false">
            <van-grid-item to>
              <template #text>
                <div class="text">账户余额</div>
              </template>
              <template #icon>
                <div class="price">￥0.00</div>
              </template>
            </van-grid-item>
            <van-grid-item to>
              <template #text>
                <div class="text">可提现金额</div>
              </template>
              <template #icon>
                <div class="price">￥0.00</div>
              </template>
            </van-grid-item>
            <van-grid-item to>
              <template #text>
                <div class="text">优惠券</div>
              </template>
              <template #icon>
                <div class="price">0张</div>
              </template>
            </van-grid-item>
            <van-grid-item to>
              <template #text>
                <div class="text">邀请奖励</div>
              </template>
              <template #icon>
                <div class="price">￥0</div>
              </template>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <div class="order-info">
        <!-- <div class="grid-panel">
          <van-cell title="国内包裹" class="title" is-link to="/domesticOrder"></van-cell>
          <van-grid clickable :column-num="4" class="grid" :border="false">
            <van-grid-item to="/domesticOrder?status=1">
              <template #text>
                <div class="text">已预报</div>
              </template>
              <template #icon>
                <div class="icon">
                  <van-icon name="clock-o" />
                </div>
              </template>
            </van-grid-item>
            
            <van-grid-item to="/domesticOrder?status=2">
              <template #text>
                <div class="text">已上架</div>
              </template>
              <template #icon>
                <div class="icon">
                  <van-icon name="certificate" />
                </div>
              </template>
            </van-grid-item>
            <van-grid-item to></van-grid-item>
            <van-grid-item to></van-grid-item>
          </van-grid>
        </div>-->

        <div class="grid-panel">
          <van-cell
            title="我的订单"
            class="title"
            is-link
            to="/orderManage"
          ></van-cell>
          <van-grid clickable :column-num="5" class="grid" :border="false">
            <van-grid-item to="/orderManage?status=1">
              <template #text>
                <div class="text">已预报</div>
              </template>
              <template #icon>
                <div class="icon">
                  <van-icon name="balance-pay" />
                </div>
              </template>
            </van-grid-item>
            <van-grid-item to="/orderManage?status=2">
              <template #text>
                <div class="text">已上架</div>
              </template>
              <template #icon>
                <div class="icon">
                  <van-icon name="peer-pay" />
                </div>
              </template>
            </van-grid-item>
            <van-grid-item to="/orderManage?status=3">
              <template #text>
                <div class="text">待打包</div>
              </template>
              <template #icon>
                <div class="icon">
                  <van-icon name="tosend" />
                </div>
              </template>
            </van-grid-item>
            <van-grid-item to="/orderManage?status=4">
              <template #text>
                <div class="text">已出库</div>
              </template>
              <template #icon>
                <div class="icon">
                  <van-icon name="logistics" />
                </div>
              </template>
            </van-grid-item>
            <van-grid-item to="/orderManage?status=5">
              <template #text>
                <div class="text">已发货</div>
              </template>
              <template #icon>
                <div class="icon">
                  <van-icon name="sign" />
                </div>
              </template>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
    <div class="footer">
      <footer-com></footer-com>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Col, Row, Image, Icon, Cell, CellGroup, Grid, GridItem } from "vant";
import FooterCom from "@/components/FooterCom";
export default {
  name: "home",
  components: {
    FooterCom,
    [Col.name]: Col,
    [Row.name]: Row,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  data() {
    return {
      accountList: [],
      nickName: "",
    };
  },
  created() {
    // this.nickName = this.$store.state.authenticationData.nickName;
  },
};
</script>
<style lang="less">
.user-wrap {
  padding-bottom: 60px;
  .grid-panel {
    margin: 15px 0;
    .title {
      border-bottom: 1px solid #ebedf0;
      &.van-cell::after {
        border: none 0;
      }
      .van-cell__title {
        font-size: 14px;
        font-weight: 500;
      }
    }
    .grid {
      color: #1087eb;
      .van-grid-item__content {
        padding: 10px 0 20px 0;
      }
      .text {
        font-size: 13px;
        color: #333;
      }
      .price {
        font-size: 16px;
        padding: 10px 0 8px 0;
      }
      .icon {
        padding: 10px 0 3px 0;
        .van-icon {
          font-size: 30px;
        }
      }
    }
  }
  .content {
    .user-info {
      padding: 30px 0px 20px 0;
      text-align: left;
      background-color: #1087eb;
      .user-profile {
        text-align: center;
        padding: 0 10px 0 15px;
      }
      .van-image {
        width: 55px;
        height: 55px;
      }
      .user-name {
        color: #f6f5f5;
        font-size: 18px;
        font-weight: 500;
        margin: 0px 0 10px 0;
      }
      .user-phone {
        color: #fff;
        font-size: 16px;
      }
      .user-arrow {
        line-height: 68px;
        color: #fff;
      }
    }
    .account-info {
      text-align: left;
    }
    .order-info {
      text-align: left;
    }
  }
}
</style>
