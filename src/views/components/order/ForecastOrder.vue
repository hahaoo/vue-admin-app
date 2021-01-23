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
                    >({{ parseInt(index) + 1 }}) 物流单号：{{ item.trackNo }}
                  </span>

                  <Copy :copyText="item.trackNo"></Copy>
                </template>
                <template #right-icon>
                  <van-tag type="primary" size="medium" plain>{{
                    formatStatus(item.state)
                  }}</van-tag>
                </template>
              </van-cell>
            </van-cell-group>
            <van-card
              :title="item.remark"
              :desc="item.type == 2 ? item.groupName : ''"
            >
              <template #footer>
                <van-button
                  round
                  size="small"
                  type="danger"
                  plain
                  @click="onDelete(item)"
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
import Copy from "@/components/Copy";
import { findPackageCustomApi, updatePackageApi } from "@/api/index";
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
  Dialog,
} from "vant";
export default {
  name: "order",
  components: {
    Copy,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Panel.name]: Panel,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
  },
  props: ["state"],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      searchParam: {
        customid: "",
        pageSize: 10,
        currentPage: 1,
        state: 1,
      },
      pageNum: 0, //分页
    };
  },
  created() {},
  methods: {
    formatStatus(state) {
      switch (state) {
        case 1:
          return "已申报";
          break;
        case 2:
          return "已入库";
          break;
        case 3:
          return "待打包";
          break;
        case 4:
          return "已出库";
          break;
        case 5:
          return "已发货";
          break;
        case 6:
          return "已签收";
          break;
        case 100:
          return "作废";
          break;
      }
    },
    //获取数据
    async getList(pageNum) {
      this.searchParam.customid = this.$store.state.employee.id;
      this.searchParam.state = this.state;
      this.searchParam.currentPage = pageNum;
      let res = await findPackageCustomApi(this.searchParam);
      if (res && res.ack == "200" && res.data.length > 0) {
        console.log(res);
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          this.list.push(data[i]);
        }
        if (this.list.length >= res.total) {
          this.finished = true;
        }
      } else {
        this.finished = true;
        Toast.fail(res.msg);
      }
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

    onDelete(item) {
      Dialog.confirm({
        title: "提示",
        message: "确认是否删除该条数据？",
      })
        .then(async () => {
          // on confirm
          let sendData = {
            id: item.id,
            state: 100,
          };
          let res = await updatePackageApi(sendData);
          if (res && res.ack == "200") {
            this.$toast.success("删除成功");
            this.onRefresh();
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch(() => {
          // on cancel
          this.$toast.success("取消删除");
        });
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
