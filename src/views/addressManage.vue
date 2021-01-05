<template>
  <div class="address-wrap">
    <div class="header">
      <van-nav-bar title="收货地址管理" left-arrow @click-left="onClickLeft" />
    </div>

    <div class="content">
      <van-address-list
        v-model="chosenAddressId"
        default-tag-text="默认"
        :list="list"
        @select="onSelect()"
        @add="onAdd"
        @edit="onEdit"
      >
        <template #item-bottom></template>
      </van-address-list>
    </div>
  </div>
</template>
<script>
import { findReceivePlusApi } from "@/api/index";
import { NavBar, AddressList, Button } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [AddressList.name]: AddressList,
  },
  data() {
    return {
      actionType: "",
      chosenAddressId: "",
      originList: [],
      list: [],
      searchParam: {
        currentPage: 1,
        pageSize: 100,
      },
    };
  },
  created() {
    this.initData();
    //区分选择地址还是查看地址
    this.actionType = this.$route.query.actionType;
    this.chosenAddressId = this.$route.query.id;
  },
  methods: {
    onClickLeft() {
      if (this.actionType == "select" && this.chosenAddressId) {
        let row = this.originList.filter((item) => {
          return item.id == this.chosenAddressId;
        });
        this.$store.commit("setCustomerCurrentAddress", { data: row[0] });
      }
      this.$router.go(-1);
    },
    async initData() {
      let res = await findReceivePlusApi(this.searchParam);
      if (res && res.ack == "200") {
        let listData = res.data;
        this.originList = res.data;
        this.list = listData.map((item) => {
          return {
            id: item.id,
            name: item.receiverName,
            tel: item.receiverCity,
            address: item.receiverAddress + "," + item.receiverMobile,
            isDefault: item.isDefault == 1 ? true : false,
          };
        });
      }
    },
    onSelect() {
      // this.onClickLeft();
      // this.$router.go(-1);
      // console.log(this.chosenAddressId);
    },
    onDelete() {},
    onAdd() {
      this.$router.push({
        path: "/addressDetail",
        query: {
          actionType: "add",
        },
      });
    },

    onEdit(item) {
      //此处需要转换数据
      var row = this.originList.filter((filterItem) => {
        return item.id == filterItem.id;
      });
      console.log(row);
      var row = JSON.stringify(row[0]);
      this.$router.push({
        path: "/addressDetail",
        query: {
          actionType: "edit",
          item: row,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.address-wrap {
  .van-address-item__edit {
    // display: none; //改变原有布局，隐藏编辑
  }
  //修改默认样式
  .van-address-list__bottom {
    .van-button--danger {
      color: #fff;
      background-color: #1087eb;
      border: 1px solid #1087eb;
    }
  }
  .btn-box {
    text-align: right;
    margin-top: 8px;
  }
}
</style>
