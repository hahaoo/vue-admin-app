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
          <van-cell-group :class="item.isOverMaxWidth ? 'overWidthStype' : ''">
            <van-cell :title="item.groupName" class="card-title" />
            <van-cell class="card-progress">
              <template #title>
                <van-progress
                  :percentage="item.rate"
                  stroke-width="10"
                  color="#1287ff"
                  v-if="item.rate"
                />
                <div class="progress-tips">
                  {{ item.signWeight }} of {{ item.maxWeight }} kg
                </div>
              </template>
            </van-cell>
            <van-cell>
              <template #title>
                <van-row class="card-bottom">
                  <van-col span="18" class="left">
                    <div class="tip1">
                      <span class="money">￥{{ item.price }}</span>
                      <span class="kg">{{ item.priceDesc }}</span>
                    </div>
                    <div class="address">
                      <van-icon name="location-o" />{{ item.country }}
                      {{ item.province }}{{ item.city == item.province ? "" : item.city }}
                    </div>
                  </van-col>
                  <van-col span="6" class="right">
                    <van-button
                      type="info"
                      size="small"
                      @click="gotoTransport(item)"
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
import { findGroupOrderApi } from "@/api/index";
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
  Toast,
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
    [Toast.name]: Toast,
  },
  props: {
    searchKey: {
      type: String,
      default: "",
    }, //关键字搜索，城市
  },
  data() {
    return {
      list: [], //数据
      loading: false,
      finished: false,
      refreshing: false,
      searchParam: {
        pageSize: 10,
        currentPage: 1,
        cityl: "", //城市模糊搜索
      },
      pageNum: 0, //分页
    };
  },
  created() {
    console.log("searchKey", this.searchKey);
    this.searchParam.cityl = this.searchKey;
  },
  watch: {
    searchKey(value) {
      this.list = [];
      this.getList(1);
    },
  },
  methods: {
    //获取数据
    async getList(pageNum) {
      this.searchParam.currentPage = pageNum;
      this.searchParam.cityl = this.searchKey;
      this.searchParam.state = 2;
      let res = await findGroupOrderApi(this.searchParam);
      if (res && res.ack == "200" && res.data.length > 0) {
        console.log(res);
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          data[i].rate = (
            (data[i].signWeight * 100) /
            data[i].maxWeight
          ).toFixed(2);

          if (data[i].rate > 100) {
            data[i].isOverMaxWidth = true;
          } else {
            data[i].isOverMaxWidth = false;
          }

          this.list.push(data[i]);
        }
        if (this.list.length >= res.total) {
          this.finished = true;
        }
      } else {
        Toast.fail(res.msg);
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
    gotoTransport(data) {
      if (this.$route.query.actionType == "onShelfPinyou") {
        var pinyouData = this.$route.query.pinyouData;
      } else {
        pinyouData = "";
      }
      this.$router.push({
        path: "/pinyouDetail",
        query: {
          groupName: data.groupName,
          groupId: data.id,
          pinyouData: pinyouData,
        },
      });
    },
  },
};
</script>
<style lang="less">
.overWidthStype {
  .van-progress__portion {
    width: 100% !important;
  }
  .van-progress__pivot {
    left: 100% !important;
    margin-left: -50px;
  }
}

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
