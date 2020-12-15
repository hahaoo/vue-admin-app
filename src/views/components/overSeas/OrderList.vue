<template>
  <div class="order-list">
    <div class="content fixed-height">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="order-card" v-for="(item, index) in list" :key="index">
            <van-cell-group>
              <van-cell>
                <template #title>
                  <span class="custom-title"
                    >({{ index + 1 }}) 订单号：{{ item.transCode }}
                  </span>
                </template>
                <template #right-icon>
                  <van-tag type="primary" plain size="medium">{{
                    formatStatus(item.status)
                  }}</van-tag>
                </template>
              </van-cell>
            </van-cell-group>
            <van-card
              :title="item.logistics"
              :num="item.num"
              currency=""
              :centered="true"
              :desc="item.declareRemark"
              :thumb="item.imgUrl ? item.imgUrl : '3.png'"
              @click-thumb="onClickThumb(item)"
            >
              <template #footer>
                <div class="summary-box">
                  <span>共：{{ item.shippingFee }} 元</span>
                  <span>共：{{ item.cnt }} 个包裹</span>
                </div>
                <van-button
                  round
                  size="small"
                  type="info"
                  plain
                  @click="goOrderDetail(item)"
                  >订单详情</van-button
                >
                <!-- <van-button round size="small" type="info" plain
                  >查看物流</van-button
                > -->
                <van-button round size="small" type="primary">签收</van-button>
              </template>
            </van-card>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { findTransportByDistributorApi } from "@/api/index";
import {
  List,
  PullRefresh,
  Cell,
  CellGroup,
  Panel,
  Card,
  Tag,
  Button,
  ImagePreview
} from "vant";
export default {
  name: "home",
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Panel.name]: Panel,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  props: ["status"],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      searchParam: {
        status: 1,
        page: 1,
        rowsPerPage: 10
      },
      pageNum: 0 //分页
    };
  },
  created() {
    this.searchParam.status = this.status;
  },
  methods: {
    formatStatus(status) {
      switch (status) {
        case "1":
          return "未付款";
          break;
        case "2":
          return "已付款待打包";
          break;
        case "3":
          return "已打包";
          break;
        case "4":
          return "已发货";
          break;
        case "5":
          return "已完成";
          break;
        case "9":
          return "已作废";
          break;
      }
    },
    //获取数据
    async getList(pageNum) {
      this.searchParam.page = pageNum;
      let res = await findTransportByDistributorApi(this.searchParam);
      if (res.ErrorCode == "9999" && res.Data.Results.length > 0) {
        var data = res.Data.Results;
        for (var i = 0; i < data.length; i++) {
          this.list.push(data[i]);
        }
        if (this.list.length >= res.Data.Pagination.totalCount) {
          // this.loading = false;
          this.finished = true;
        }
      } else {
        this.finished = true;
      }
      this.loading = false;
    },
    onLoad() {
      this.loading = true;
      this.getList(++this.pageNum);

    },
    onRefresh() {
      // 清空列表数据
      this.list = [];
      this.finished = false;
      this.pageNum = 0;
      this.onLoad();
      this.refreshing = false;
    },
    onClickThumb(item) {

      if (item.imgUrl) {
        this.images = [item.imgUrl];
      } else {
        this.images = ['3.png'];
      }
      ImagePreview({
        images: this.images,
        closeable: true,
        loop: false, //是否循环播放\
      })
    },
    goOrderDetail(item) {
      this.$router.push({
        path: "/orderDetail",
        query: {
          id: item.id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.order-list {
  .van-card__content {
    text-align: left;
  }
  .van-cell__title {
    text-align: left;
  }
  .custom-title {
    font-size: 14px;
  }
  .order-card {
    margin-top: 10px;
    .van-card {
      margin-top: 0px;
      background-color: #fff;
      .van-card__thumb {
        // height: 60px;
        // width: 60px;
      }
      .van-card__title {
        font-size: 14px;
        margin: 5px 0;
      }
      .van-card__desc {
        margin: 6px 0px;
        font-size: 12px;
      }
      .van-card__num {
        font-size: 14px;
      }
      .van-card__footer {
        .van-button {
          min-width: 60px;
        }
      }
    }
  }

  .summary-box {
    text-align: left;
    padding: 10px 0px;
    margin-bottom: 10px;
    color: red;
    font-size: 14px;
    // border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    span {
      display: inline-block;
      margin-right: 15px;
    }
  }
}
</style>
