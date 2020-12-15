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
          v-model="form.contact"
          required
          :rules="[{ required: true, message: '请填写收货人' }]"
        />
        <van-field
          label="手机号码:"
          type="digit"
          label-width="80px"
          placeholder="收货人手机号"
          v-model="form.mobile"
          required
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          label="固定电话:"
          placeholder="固定电话"
          label-width="80px"
          v-model="form.telephone"
        />
        <van-field
          label="E-mail:"
          placeholder="收货人E-mail"
          label-width="80px"
          v-model="form.email"
        />
        <van-field
          label="邮政编码:"
          label-width="80px"
          placeholder="邮政编码"
          v-model="form.postCode"
          required
          :rules="[{ required: true, message: '请填写邮政编码' }]"
        />
        <van-field
          label="国家:"
          label-width="80px"
          placeholder="点击选择国家"
          readonly
          clickable
          @click="onChooseCountry()"
          v-model="tempCountryName"
          required
          :rules="[{ required: true, message: '请选择国家' }]"
        />
        <van-field
          label="省份/州:"
          label-width="80px"
          placeholder="请填写省份/州"
          v-model="form.province"
          required
          :rules="[{ required: true, message: '请选择填写省份/州' }]"
        />
        <van-field
          label="城市:"
          label-width="80px"
          placeholder="请填写城市"
          v-model="form.city"
          required
          :rules="[{ required: true, message: '请填写城市' }]"
        />
        <van-field
          label="街道详细:"
          rows="1"
          autosize
          type="textarea"
          label-width="80px"
          placeholder="详细地址"
          v-model="form.address"
          required
          :rules="[{ required: true, message: '请填写详细地址' }]"
        />
        <div class="default-box">
          <span>设为默认地址</span>
          <van-switch v-model="isDefault" />
        </div>
        <div style="margin: 26px;">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            style="margin-bottom: 16px;"
          >
            保存
          </van-button>
        </div>
      </van-form>
      <div style="margin: 0px 26px;">
        <van-button
          v-if="form.id"
          round
          block
          type="danger"
          plain
          @click="onDelete"
        >
          删除
        </van-button>
      </div>
    </div>

    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="#app"
    >
      <van-picker
        ref="picker"
        show-toolbar
        title="国家"
        :columns="countryList"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>
<script>
import {
  getCountrysApi,
  addByDistributorAddressApi,
  changeByDistributorAddressApi,
  deleteByDistributorAddressApi,
  setDefaultByDistributorApi,
} from "@/api/index";
import { NavBar, Form, Field, Button, Popup, Switch, Picker } from "vant";
export default {
  components: {
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
      headTitle: "地址新增",
      actionType: "",
      tempCountryName: "",
      actionFrom: "",
      countryList: [],
      isDefault: false, //
      form: {
        contact: "",
        mobile: "",
        telephone: "",
        countryCode: "",
        province: "",
        city: "",
        address: "",
        postCode: "",
        email: "",
        isDefault: "2", //默认2为否 1 为是
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
      this.isDefault = this.form.isDefault == "1" ? true : false; //界面显示
      this.tempCountryName = this.form.countryInfo.nameCN;
    }
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async initData() {
      let res = await getCountrysApi();
      if (res.ErrorCode == "9999") {
        let arr = res.Data.Results.country;
        var temparr = [];
        for (let i in arr) {
          // console.log(arr[i]);
          let item = {
            text: i,
            children: [],
          };
          for (let j in arr[i]) {
            arr[i][j].text = arr[i][j].nameCN;
            item.children.push(arr[i][j]);
          }

          temparr.push(item);
        }
        this.countryList = temparr;
      }
    },
    onChooseCountry() {
      this.actionFrom = "country";
      this.show = true;
    },
    onConfirm(item, index) {
      console.log(item, index);
      console.log(this.countryList);
      //版本更新之后 getValues（） 方法用不了
      // var checkedValue = this.$refs.picker.getValues();
      this.tempCountryName = item[1];
      this.getCountryCode(index);
      this.show = false;
    },
    getCountryCode(arr) {
      console.log(arr[0], arr[1]);
      var temp1 = this.countryList.filter((item, index) => {
        return index == arr[0];
      });
      var temp2 = temp1[0].children.filter((item, index) => {
        return index == arr[1];
      });
      console.log(temp1, temp2);
      this.form.countryCode = temp2[0].code2;
    },
    onCancel() {
      this.show = false;
    },
    async onSwitch() {
      let res = await setDefaultByDistributorApi({ id: this.form.id });
      if (res.ErrorCode == "9999" && res.Data.Results) {
        // this.$toast.success("设置成功");
        // this.$router.go(-1);
      }
    },
    async onDelete() {
      let res = await deleteByDistributorAddressApi({ id: this.form.id });
      if (res.ErrorCode == "9999" && res.Data.Results) {
        this.$toast.success("删除成功");
        this.$router.go(-1);
      }
    },
    async onSubmit() {
      console.log(this.form);
      this.form.isDefault = this.isDefault ? "1" : "2";
      // debugger
      if (this.actionType == "edit") {
        var res = await changeByDistributorAddressApi(this.form);
      } else {
        res = await addByDistributorAddressApi(this.form);
      }
      if (res.ErrorCode == "9999" && res.Data.Results) {
        console.log(res.Data.Results);
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
