<template>
  <div class="pinyou-wrap">
    <div class="header">
      <van-nav-bar title="开始拼邮" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <div class="serach-header">
        <van-search v-model="searchKey" placeholder="请输入城市搜索" />
      </div>
      <PinyouList></PinyouList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { NavBar, Search } from "vant";
import PinyouList from "./components/pinyou/List";
export default {
  name: "domestic",
  components: {
    PinyouList,
    [NavBar.name]: NavBar,
    [Search.name]: Search,
  },
  data() {
    return {
      searchKey: "",
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less">
.pinyou-wrap {
  .content {
  }
}
</style>
