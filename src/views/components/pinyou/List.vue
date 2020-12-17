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
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" label="描述信息" />
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
  Panel,
  Card,
  Tag,
  Button,
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

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
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
  },
};
</script>
<style lang="less" scoped>
.pinyou-list {
  .pinyou-card {
    margin: 10px;
    border-radius: 5px;
    background: #fff;
    border-top: 3px solid #4789fa;
    box-shadow: 1px 1px 5px #bbb;
    .van-cell-group,
    .van-cell {
      background-color: transparent;
    }
  }
}
</style>
