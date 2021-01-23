<template>
  <div class="address-detail-wrap">
    <div class="header">
      <van-nav-bar :title="headTitle" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          label="收货人:"
          label-width="80px"
          placeholder="收货人姓名"
          v-model="form.receiverName"
          required
          :rules="[{ required: true, message: '请填写收货人' }]"
        />
        <van-field
          label="手机号码:"
          type="digit"
          label-width="80px"
          placeholder="收货人手机号"
          v-model="form.receiverMobile"
          required
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          label="固定电话:"
          placeholder="固定电话"
          label-width="80px"
          v-model="form.receiverTel"
        />
        <van-field
          label="E-mail:"
          placeholder="收货人E-mail"
          label-width="80px"
          v-model="form.receiverEmail"
        />
        <van-field
          label="邮政编码:"
          label-width="80px"
          placeholder="邮政编码"
          v-model="form.receiverZipcode"
          required
          :rules="[{ required: true, message: '请填写邮政编码' }]"
        />
        <van-field
          label="国家:"
          label-width="80px"
          placeholder="点击选择国家"
          readonly
          clickable
          @click="onOpenCountryPop()"
          v-model="form.receiverCountry"
          required
          :rules="[{ required: true, message: '请选择国家' }]"
        />
        <van-field
          label="省份/州:"
          label-width="80px"
          placeholder="请填写省份/州"
          v-model="form.receiverProvince"
          required
          :rules="[{ required: true, message: '请选择填写省份/州' }]"
        />
        <van-field
          label="城市:"
          label-width="80px"
          placeholder="请填写城市"
          v-model="form.receiverCity"
          required
          :rules="[{ required: true, message: '请填写城市' }]"
        />
        <van-field
          label="街道详细:"
          rows="1"
          autosize
          type="textarea"
          label-width="80px"
          placeholder="请填写详细地址"
          v-model="form.receiverAddress"
          required
          :rules="[{ required: true, message: '请填写详细地址' }]"
        />
        <div class="default-box">
          <span>设为默认地址</span>
          <van-switch v-model="isDefault" />
        </div>
        <div style="margin: 26px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            style="margin-bottom: 16px"
            >保存</van-button
          >
        </div>
      </van-form>
      <div style="margin: 0px 26px">
        <van-button
          v-if="form.id"
          round
          block
          type="danger"
          plain
          @click="onDelete"
          >删除</van-button
        >
      </div>
    </div>

    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '100%', background: '#f2f2f2' }"
      get-container="#app"
    >
      <chooseCountryPop
        :totalCountryData="totalCountryData"
        @closeCountryPop="closeCountryPop"
        @onChooseCountry="onChooseCountry"
      ></chooseCountryPop>
    </van-popup>
  </div>
</template>
<script>
import {
  saveReceivePlusApi,
  updateReceivePlusApi,
  deleteReceivePlusApi,
  findCountryApi,
} from "@/api/index";
import { NavBar, Form, Field, Button, Popup, Switch, Picker } from "vant";
import chooseCountryPop from "./components/chooseCountryPop";
export default {
  components: {
    chooseCountryPop,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [Switch.name]: Switch,
    [Picker.name]: Picker,
  },
  data() {
    return {
      totalCountryData: [],
      countryCode: "",
      headTitle: "地址新增",
      actionType: "",
      tempCountryName: "",
      actionFrom: "",
      countryList: [],
      isDefault: true, //
      form: {
        receiverName: "",
        receiverMobile: "",
        receiverTel: "",
        receiverEmail: "",
        receiverCountry: "", //国家
        receiverProvince: "",
        receiverCity: "",
        receiverAddress: "",
        receiverZipcode: "",
        isDefault: 1, //默认2为否 1 为是
      },
      show: false,
    };
  },
  created() {
    this.actionType = this.$route.query.actionType;
    let row = this.$route.query.item;
    this.initData();
    if (this.actionType == "edit") {
      this.headTitle = "地址编辑";
      this.form = JSON.parse(row);
      this.isDefault = this.form.isDefault == 1 ? true : false; //界面显示
    }
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async initData() {
      let res = await findCountryApi();
      if (res && res.ack == "200") {
        this.totalCountryData = res.data;
      }
    },
    onOpenCountryPop() {
      this.show = true;
    },
    closeCountryPop() {
      this.show = false;
    },
    onChooseCountry(data) {
      console.log(data);
      this.form.receiverCountry = data.nameCN;
      this.show = false;
    },

    async onDelete() {
      let res = await deleteReceivePlusApi({ id: this.form.id });
      if (res && res.ack == "200") {
        this.$toast.success("删除成功");
        this.$router.go(-1);
      }
    },
    async onSubmit() {
      console.log(this.form);
      // alert(JSON.stringify(this.form));
      this.form.isDefault = this.isDefault ? 1 : 2;
      if (this.actionType == "edit") {
        var res = await updateReceivePlusApi(this.form);
      } else {
        res = await saveReceivePlusApi(this.form);
      }
      console.log(res);
      if (res && res.ack == "200") {
        this.$toast.success("保存成功");
        this.$router.go(-1);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.address-detail-wrap {
  .content {
    margin: 8px;
  }
  .default-box {
    display: flex;
    background-color: #fff;
    background-color: #fff;
    margin: 10px 0;
    padding: 10px;
    text-align: left;
    span {
      font-size: 14px;
      line-height: 30px;
      margin-right: 10px;
    }
  }
}
</style>
