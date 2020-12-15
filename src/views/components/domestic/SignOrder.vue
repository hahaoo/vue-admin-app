<template>
  <div class="sign-order">
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
                    >({{ index + 1 }}) 物流单号：{{ item.id }}
                  </span>
                </template>
                <template #right-icon>
                  <van-tag type="primary" size="medium" plain>{{
                    item.state
                  }}</van-tag>
                </template>
              </van-cell>
            </van-cell-group>
            <van-card :title="item.name" :centered="true" :desc="item.desc">
              <template #footer>
                <van-button round size="small" type="info" plain
                  >物流跟踪</van-button
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
import {
  List,
  PullRefresh,
  Cell,
  CellGroup,
  Panel,
  Card,
  Tag,
  Button
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
    [Button.name]: Button
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageNum: 0 //分页
    };
  },
  created() { },
  methods: {
    //获取数据
    getList(pageNum) {
      console.log(pageNum);
      for (let i = 0; i < 6; i++) {
        var obj = {
          id: "3333333",
          time: "2020-02-02 12:20",
          name: "良品铺子零食大礼包",
          desc: "备注：送到我们学校",
          price: "5000.20",
          state: "已签收",
          num: 12,
          thumb: "3.png"
        };
        this.list.push(obj);
      }
      this.loading = false;
      if (this.list.length >= 6) {
        this.finished = true;
      }
    },
    onLoad() {
      this.loading = true;
      this.getList(++this.pageNum);
      this.loading = false;
    },
    onRefresh() {
      // 清空列表数据
      this.list = [];
      this.finished = false;
      this.pageNum = 0;
      // 重新加载数据
      this.onLoad();
      this.refreshing = false;
    }
  }
};
</script>
<style lang="less">
.sign-order {
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
