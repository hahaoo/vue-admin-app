<template>
  <div class="pinyou-wrap">
    <div class="header">
      <van-nav-bar title="开始拼邮" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <div class="serach-header">
        <van-search
          v-model="searchKey"
          label="城市"
          placeholder="请输入城市名搜索"
          @search="onSearch"
          @focus="isFocus = true"
          @blur="onBlur()"
        >
        </van-search>
      </div>

      <!-- <div class="search-box" v-if="isFocus"> 
      </div> -->
      <div class="search-content">
        <PinyouList :searchKey="searchKey"></PinyouList>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { NavBar, Search, Loading } from "vant";
import PinyouList from "./components/pinyou/List";
export default {
  name: "domestic",
  components: {
    PinyouList,
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Loading.name]: Loading,
  },
  data() {
    return {
      isFocus: false,
      pinyouData: {},
      searchKey: "",
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSearch() {
      console.log(this.searchKey);
      this.isFocus = false;
    },
    onBlur() {
      console.log(this.searchKey);
      this.isFocus = false;
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
