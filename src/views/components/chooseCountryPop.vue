<template>
  <!-- 选择国家 -->
  <div class="country-pop-wrap">
    <div class="header">
      <van-nav-bar title="选择国家" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <div class="search-box">
        <van-search
          v-model="searchStr"
          placeholder="输入国家搜索"
          @search="onSearch"
          @focus="isFocus = true"
          @blur="blur()"
        />
      </div>
      <div class="empty-box" v-if="isFocus"></div>
      <div v-else class="search-content">
        <div v-if="countryList.length > 0">
          <van-radio-group v-model="checkedCountry">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in countryList"
                :key="index"
                :title="item.nameCN"
                clickable
                @click="onChooseCountry(item)"
              >
                <van-radio
                  slot="right-icon"
                  :name="item.smtCode"
                  shape="square"
                  checked-color="#29C944"
                />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>

        <div v-else>
          <div style="text-align: center; padding: 20px">查询不到数据</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  NavBar,
  Search,
  Popup,
  Cell,
  CellGroup,
  Icon,
  RadioGroup,
  Radio,
} from "vant";
import { findCountryApi } from "@/api/index";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
  },
  props: {
    totalCountryData: Array,
  },
  data() {
    return {
      searchStr: "",
      isFocus: false,
      checkedCountry: "",
      checkedItem: [],
      countryList: [],
    };
  },
  watch: {
    searchStr(val) {
      if (val) {
        var copyData = _.clone(this.totalCountryData);
        var reg = new RegExp(val);
        this.countryList = _.filter(copyData, function (item) {
          return item.nameCN.match(reg);
        });
      }
    },
  },
  created() {
    this.countryList = this.totalCountryData;
  },
  methods: {
    async initData() {
      let res = await findCountryApi();
      if (res && res.ack == "200") {
        this.totalCountryData = res.data;
        this.countryList = res.data;
      }
    },
    onClickLeft() {
      this.$emit("closeCountryPop");
    },
    onChooseCountry(item) {
      this.checkedCountry = item.smtCode;
      this.$emit("onChooseCountry", item);
    },
    blur() {
      this.isFocus = false;
    },
    onSearch() {
      var reg = new RegExp(this.searchStr);
      var copyData = _.clone(this.totalCountryData);
      this.countryList = _.filter(copyData, function (item) {
        return item.nameCN.match(reg);
      });
    },
  },
};
</script>

<style lang="less">
.country-pop-wrap {
  [class*="van-hairline"]::after {
    border: none 0 !important;
  }
  background-color: #f5f5f5;
  .van-cell-group {
    background-color: transparent;
  }
  .van-cell {
    line-height: 18px;
    background-color: transparent;
    font-size: 13px;
    text-align: left;
  }

  .search-content {
    // padding: 0 13px;
    // .van-radio__icon .van-icon {
    //   border: none 0;
    // }
    // .van-radio__icon--checked .van-icon {
    //   background-color: transparent !important;
    //   color: rgb(41, 201, 68);
    // }
  }
}
</style>
