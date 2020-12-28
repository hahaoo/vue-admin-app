<template>
  <div class="forecast-order">
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
                    >({{ parseInt(index) + 1 }}) 物流单号：{{
                      item.trackNumber
                    }}
                  </span>
                </template>
                <template #right-icon>
                  <van-tag type="primary" size="medium" plain>{{
                    formatStatus(item.status)
                  }}</van-tag>
                </template>
              </van-cell>
            </van-cell-group>
            <van-card :title="item.packageRemark" :desc="item.remark">
              <template #footer>
                <van-button
                  round
                  size="small"
                  type="danger"
                  plain
                  @click="onDelete(item.id)"
                  >删除</van-button
                >
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
// import { findGroupOrderApi } from "@/api/index";
import {
  List,
  PullRefresh,
  Cell,
  CellGroup,
  Panel,
  Card,
  Tag,
  Button,
  Toast,
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
    [Toast.name]: Toast,
  },
  data() {
    return {
      list: [
        {
          status: "1",
          trackNumber: 111,
          packageRemark: 111,
          remark: "ceshi",
        },
      ],
      loading: false,
      finished: false,
      refreshing: false,
      searchParam: {
        pageSize: 10,
        currentPage: 1,
      },
      pageNum: 0, //分页
    };
  },
  created() {
    // this.onLoad();
  },
  methods: {
    formatStatus(status) {
      switch (status) {
        case "1":
          return "已申报未入库";
          break;
        case "2":
          return "已入库";
          break;
        case "8":
          return "有异常";
          break;
        case "9":
          return "已作废";
          break;
      }
    },
    //获取数据
    async getList(pageNum) {
      // this.searchParam.currentPage = pageNum;
      // let res = await findGroupOrderApi(this.searchParam);
      // if (res && res.ack == "200" && res.data.length > 0) {
      //   console.log(res);
      //   var data = res.data;
      //   for (var i = 0; i < data.length; i++) {
      //     data[i].rate = (
      //       (data[i].signWeight * 100) /
      //       data[i].maxWeight
      //     ).toFixed(2);
      //     this.list.push(data[i]);
      //   }
      //   if (this.list.length >= res.total) {
      //     this.finished = true;
      //   }
      // } else {
      //   Toast.fail(res.msg);
      this.finished = true;
      // }
      this.loading = false;
    },
    onLoad() {
      this.loading = true;
      this.getList(++this.pageNum);
    },
    onRefresh() {
      console.log("refreshing", this.refreshing);
      this.finished = false;
      this.list = []; // 清空列表数据
      this.pageNum = 0;
      this.onLoad(); // 重新加载数据
      this.refreshing = false;
    },

    async onDelete(id) {
      let res = await cancelByDistributorApi({ id: id });
      if (res.ErrorCode == "9999" && res.Data.Results) {
        this.$toast.success("删除成功");
        this.onRefresh();
      }
    },
  },
};
</script>
<style lang="less">
.forecast-order {
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

      .van-card__title {
        font-size: 14px;
        margin: 5px 0;
      }
      .van-card__desc {
        margin: 6px 0px;
        font-size: 12px;
      }
      .van-card__content {
        min-height: auto;
      }
    }
  }
}
</style>
