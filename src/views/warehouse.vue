<template>
  <div class="warehouse-wrap">
    <div class="header">
      <van-nav-bar title="仓库地址" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content" v-for="(item, index) in warehouseList" :key="index">
      <van-tag type="warning" class="defalut-tag" v-if="item.isDefault == '1'"
        >默认仓库</van-tag
      >
      <van-tabs color="#1087eb" title-inactive-color="#939393">
        <van-tab :title="item.warehouseName">
          <van-form>
            <van-field
              label="收货人:"
              label-width="70px"
              readonly
              v-model="item.contact"
            />
            <van-field
              label="所在地区:"
              rows="1"
              autosize
              type="textarea"
              label-width="70px"
              readonly
            >
              <template #input>
                <div>{{ item.province + item.city + item.district }}</div>
              </template>
            </van-field>
            <van-field
              label="街道地址:"
              rows="1"
              autosize
              type="textarea"
              label-width="70px"
              readonly
              v-model="item.address"
            />
            <van-field
              label="手机号码:"
              label-width="70px"
              readonly
              v-model="item.tel"
            />
            <van-field
              label="邮政编码:"
              label-width="70px"
              readonly
              v-model="item.zipcode"
            />
            <van-field
              label="备注信息:"
              label-width="70px"
              type="textarea"
              rows="5"
              autosize
              readonly
              v-model="item.remark"
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
import { findTbWarehouseApi } from "@/api/index";
export default {
  name: "package",
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Tag.name]: Tag,
  },
  data() {
    return {
      searchParam: {
        state: 1,
      },
      showTag: false,
      warehouseList: [
        {
          warehouseName: "",
          zipcode: "",
          remark:
            "强调：若使用淘宝的定位功能，麻烦不要定位至（盛富公寓),离我们仓库实际距离1500米，若是错误定位导致的包裹丢失或未成功正确妥投的责任由客户自行承担",
        },
      ],
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
      let res = await findTbWarehouseApi(this.searchParam);
      if (res && res.ack == 200 && res.data.length > 0) {
        this.warehouseList = res.data;
      }
    },
  },
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
