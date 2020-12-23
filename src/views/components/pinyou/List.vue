<template>
  <div class="pinyou-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="pinyou-card" v-for="(item, index) in list" :key="index">
          <van-cell-group>
            <van-cell :title="item.name" class="card-title" />
            <van-cell class="card-progress">
              <template #title>
                <van-progress
                  :percentage="110"
                  stroke-width="10"
                  color="#1287ff"
                />
                <div class="progress-tips">50% of 20kg</div>
              </template>
            </van-cell>
            <van-cell>
              <template #title>
                <van-row class="card-bottom">
                  <van-col span="18" class="left">
                    <div class="tip1">
                      <span class="money">￥200.00</span>
                      <span class="kg">每100g(0.1kg)</span>
                    </div>
                    <div class="address">
                      <van-icon name="location-o" />湖北武汉
                    </div>
                  </van-col>
                  <van-col span="6" class="right">
                    <van-button
                      type="info"
                      size="small"
                      @click="gotoTransport(item.name)"
                      >立即加入</van-button
                    >
                  </van-col>
                </van-row>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  List,
  PullRefresh,
  Cell,
  CellGroup,
  Tag,
  Button,
  Progress,
  Col,
  Row,
  Icon,
} from "vant";
export default {
  name: "PinyouList",
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Progress.name]: Progress,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
  },

  data() {
    return {
      list: [], //数据
      loading: false,
      finished: false,
      refreshing: false,
      searchParam: {
        status: 1,
        page: 1,
        rowsPerPage: 10,
      },
      pageNum: 0, //分页
    };
  },
  created() {},
  methods: {
    //获取数据
    async getList(pageNum) {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 5; i++) {
          let item = {
            name:
              "测试美国拼友团1111华盛顿测试美国拼友团1111华盛顿测试美国拼友团1111华盛顿",
          };
          this.list.push(item);
        }
        this.loading = false;

        if (this.list.length >= 10) {
          this.finished = true;
        }
      }, 1000);
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
    gotoTransport(data) {
      this.$router.push({
        path: "/startTransport",
        query: {
          teamName: data,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.pinyou-list {
  .pinyou-card {
    margin: 10px;
    border-radius: 5px;
    background: #fff;
    border-top: 3px solid #1287ff;
    box-shadow: 1px 1px 5px #ccc;
    .van-cell-group,
    .van-cell {
      background-color: transparent;
      text-align: left;
    }
    .card-title {
      color: #1287ff;
      text-align: center;
      font-size: 15px;
      font-weight: 500;
    }
    .card-progress {
      .van-progress {
        border-radius: 20px;
        // height: 20px;
      }
      .progress-tips {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
      }
    }
    .card-bottom {
      .left {
        .money {
          font-size: 16px;
          font-weight: 500;
          color: #cb3028;
        }
        .kg {
          display: inline-block;
          margin-left: 5px;
          font-size: 10px;
          color: #aaa;
        }
        .address {
          font-size: 12px;
          color: #555;
          .van-icon {
            vertical-align: middle;
            font-size: 15px;
            margin-right: 2px;
          }
        }
      }
    }
    .right {
      text-align: right;
      .van-button--info {
        background-color: #1287ff;
        border: 0.02667rem solid #1287ff;
      }
    }
  }
}
</style>
