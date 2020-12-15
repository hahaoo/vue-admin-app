<template>
  <div class="warehouse-wrap">
    <div class="header">
      <van-nav-bar title="仓库地址" left-arrow @click-left="onClickLeft" />
      <!-- <a href="http://192.168.3.4:8022/login">测试登录</a> -->
    </div>
    <div class="content" v-for="(item, index) in warehouseList" :key="index">
      <van-tag type="warning" class="defalut-tag" v-if="item.isDefault == '1'"
        >默认仓库</van-tag
      >
      <van-tabs color="#1087eb" title-inactive-color="#939393">
        <van-tab :title="item.name">
          <van-form>
            <van-field
              left-icon="user-o"
              label="收货人:"
              label-width="70px"
              readonly
              v-model="item.receiver"
            />
            <van-field
              left-icon="location-o"
              label="所在地区:"
              rows="1"
              autosize
              type="textarea"
              label-width="70px"
              readonly
            >
              <template #input>
                <div>{{ item.province + item.city + item.area }}</div>
              </template>
            </van-field>
            <van-field
              left-icon="location-o"
              label="街道地址:"
              rows="1"
              autosize
              type="textarea"
              label-width="70px"
              readonly
              v-model="item.address"
            />
            <van-field
              left-icon="phone-o"
              label="手机号码:"
              label-width="70px"
              readonly
              v-model="item.mobile"
            />
            <van-field
              left-icon="idcard"
              label="邮政编码:"
              label-width="70px"
              readonly
              v-model="item.zipcode"
            />
          </van-form>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { NavBar, Form, Field, Button, Tab, Tabs, Tag } from "vant";
import { findSupplierByDistributorApi } from "@/api/index";
export default {
  name: "package",
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Tag.name]: Tag
  },
  data() {
    return {
      showTag: false,
      warehouseList: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async initData() {
      console.log(this.$store.state.authenticationData);
      // let data = {
      //   api: "api.UserAddress.findSupplierByDistributor",
      //   edatas: this.$store.state.authenticationData
      // };
      let res = await findSupplierByDistributorApi();
      if (res.ErrorCode == "9999") {
        this.warehouseList = res.Data.Results;
      }
    }
  }
};
</script>
<style lang="less">
.warehouse-wrap {
  .content {
    position: relative;
    margin: 10px;
    .van-tab__text {
      font-size: 16px;
    }
    .defalut-tag {
      position: absolute;
      z-index: 100;
      left: 0;
      top: 0;
    }
  }
}
</style>
