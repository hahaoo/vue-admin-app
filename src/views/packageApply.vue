<template>
  <div class="package-apply-wrap">
    <div class="header">
      <van-nav-bar :title="headTitle" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <van-form @submit="onSubmit" class="form">
        <van-field
          v-model="form.packageRemark"
          label="包裹备注名"
          placeholder="请输入商品包裹备注"
        />
        <van-field
          required
          v-model="form.trackNumber"
          label="快递单号"
          rows="3"
          autosize
          type="textarea"
          placeholder="可以填写多个快递单号，请用逗号,分号，空格，回车键隔开"
          :rules="[{ required: true, message: '请填写快递单号' }]"
        >
        </van-field>

        <div class="address-info">
          <div class="address-inner">
            <van-cell icon="location-o" is-link @click="onChangeWarehouse()">
              <template #title>
                <div class="van-address-item__name">
                  {{ warehouseForm.receiver }}转{{ warehouseForm.customerName }}
                  {{ warehouseForm.mobile }}
                </div>
                <div class="van-address-item__address">
                  {{ warehouseForm.province }}{{ warehouseForm.city
                  }}{{ warehouseForm.area }}{{ warehouseForm.address }}({{
                    warehouseForm.id
                  }})
                </div>
              </template>
            </van-cell>
          </div>
        </div>
        <div class="detail-info">
          <van-row>
            <span class="title">邮寄限制:</span>
            <span class="note"
              >详见
              <a style="color: #1096f0" @click="goToPostLimit()">
                《邮寄限制》
              </a>
            </span>
          </van-row>
          <van-row>
            <span class="title">收费标准:</span>
            <span class="note">
              入库重量和预估运费仅做参考，实际计费重量和运费以打包之后的数据为准，打包完成会根据实际费用选择合适的运输方式寄送。</span
            >
          </van-row>
          <van-row>
            <span class="title">注意:</span>
            <span class="note">提交包裹后注意去国内包裹添加物流信息</span>
          </van-row>
        </div>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  NavBar,
  Form,
  Popup,
  Field,
  Button,
  Picker,
  Col,
  Row,
  Cell,
} from "vant";
import {
  findTbWarehouseApi,
  addByDistributorApi,
  changeByUserApi,
} from "@/api/index";
export default {
  name: "package",
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
  },
  data() {
    return {
      actionType: "add", //默认
      warehouseForm: {}, //仓库地址
      headTitle: "包裹预报",
      // trackNumber: "", //填写的是字符串，提交的是数组
      form: {
        packageRemark: "",
        trackNumber: "",
        addressId: "",
      },
    };
  },
  created() {
    this.actionType = this.$route.query.actionType;
    if (this.actionType == "edit") {
      this.headTitle = "修改物流";
      this.form = JSON.parse(this.$route.query.row);
      this.initAddressData(this.form.addressId);
    } else {
      this.initData();
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    goToPostLimit() {
      this.$router.push("/postLimit");
    },

    addNumber() {},
    //初始化获取仓库地址列表
    async initData() {
      let res = await findTbWarehouseApi();
      if (res.ErrorCode == "9999") {
        let list = res.Data.Results; //默认仓库
        this.warehouseForm = list.filter((item) => {
          return item.isDefault == "1";
        })[0];
        this.form.addressId = this.warehouseForm.id;
      }
    },
    //编辑的时候初始化地址
    async initAddressData(id) {
      let res = await findTbWarehouseApi();
      if (res.ErrorCode == "9999") {
        let list = res.Data.Results; //默认仓库
        this.warehouseForm = list.filter((item) => {
          return item.id == id;
        })[0];
      }
    },
    //更换仓库地址
    onChangeWarehouse() {
      this.$router.push("/warehouse");
    },
    async onSubmit() {
      let trackNumbers =
        (this.form.trackNumber &&
          this.form.trackNumber.split(/,|，|\s |\r | ；|;/gi)) ||
        [];
      // debugger
      if (this.actionType == "edit") {
        var res = await changeByUserApi(this.form);
      } else {
        //提交预报的时候，可以提交多个单号
        let sendData = {
          packageRemark: this.form.packageRemark,
          addressId: this.form.addressId,
          trackNumbers: trackNumbers,
        };
        res = await addByDistributorApi(sendData);
      }

      if (res.ErrorCode == "9999" && res.Data.Results) {
        console.log(res.Data.Results);
        this.$toast.success("提交成功");
        this.$router.go(-1);
      }
    },
  },
};
</script>
<style lang="less">
.package-apply-wrap {
  .content {
    .form {
      margin: 10px 0;
    }
    .address-info {
      margin: 10px 0;
      .van-cell {
        align-items: center;
        .van-icon {
          font-size: 20px;
        }
        .van-icon-location-o {
          color: #1087eb;
          margin-right: 10px;
        }
        .van-icon-arrow {
          color: #aaa;
        }
        .van-cell__title {
          text-align: left;
        }
      }
    }
    .detail-info {
      margin: 10px 0;
      .van-row {
        background-color: #fff;
        padding: 8px 10px;
        text-align: left;
        // margin: 5px 0;
        .title {
          font-weight: 600;
          margin-right: 5px;
          font-size: 14px;
        }
        .note {
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
