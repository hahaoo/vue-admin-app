<template>
  <div class="confirm-send-wrap">
    <div class="header">
      <van-nav-bar title="确认寄送" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <div class="address-info">
        <div class="address-inner" v-if="this.addressForm.id">
          <van-cell icon="location-o" is-link @click="onEdit()">
            <template #title>
              <div class="van-address-item__name">
                {{ addressForm.contact }} {{ addressForm.city }}
              </div>
              <div class="van-address-item__address">
                {{ addressForm.province }}{{ addressForm.address
                }}{{ addressForm.mobile }}
              </div>
            </template>
          </van-cell>
        </div>
        <div v-else class="add-address">
          <van-button
            icon="plus"
            size="small"
            round
            plain
            block
            type="info"
            @click="onAdd"
          >
            添加收货地址
          </van-button>
        </div>
      </div>
      <div class="package-info">累计 {{ form.totalPackage }} 个包裹</div>
      <div class="logistics-info">
        <div class="title">配送方式</div>
        <div class="box">
          <van-radio-group v-model="form.shippingId">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in logisticsList"
                :key="index"
                clickable
                @click="form.shippingId = item.id"
              >
                <template #icon>
                  <van-radio :name="item.id" />
                </template>
                <template #title>
                  <div class="">{{ item.logistics }}</div>
                </template>
                <template #label>
                  <div class="">{{ item.desc }}</div>
                </template>
                <template #right-icon>
                  <div class="right-item1">{{ item.day }}</div>
                  <div class="right-item2">{{ item.price }}</div>
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </div>
      <div class="package-info">
        实重： {{ form.weight }} (g), 体积重： {{ form.volume }} cm3
      </div>
      <div class="other-info">
        <van-field
          v-model="form.declareRemark"
          label="备注："
          rows="3"
          autosize
          type="textarea"
          placeholder="其他要求"
        />
      </div>
      <div class="submit">
        <van-button round block type="info" @click="onSubmit">
          确定
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  findByDistributorAddressApi,
  findByDistributorShipApi,
  transportByDistributorApi,
} from "@/api/index";
import {
  NavBar,
  RadioGroup,
  Radio,
  Button,
  Cell,
  CellGroup,
  Field,
} from "vant";
export default {
  name: "package",
  components: {
    [NavBar.name]: NavBar,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
  },
  data() {
    return {
      addressList: [],
      addressForm: {},
      form: {
        totalPackage: 0,
        weight: 0,
        volumeArr: [],
        volume: 0, //体积重
        ids: [],
        addressId: 0,
        shippingId: "",
        declareFee: "",
        declareRemark: "", //申报内容
      },
      volumetricWeight: "", //体积重系数
      logisticsList: [],
    };
  },
  created() {
    // debugger
    var data = JSON.parse(this.$route.query.data);
    this.form.totalPackage = data.ids.length;
    this.form.weight = this.$route.query.weight;
    this.form.ids = data.ids;
    this.form.volumeArr = data.volumeArr;
    // this.initData();
    console.log("11", this.form.ids);
  },
  watch: {
    "addressForm.id": function (value) {
      if (value) {
        console.log(value);
        this.getShipList();
      }
    },
    "form.shippingId": function (value) {
      if (value) {
        console.log(value);
        this.calVolume(value);
      }
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      this.$store.commit("setCustomerCurrentAddress", { data: {} });
    },
    async initData() {
      if (this.$store.state.customerCurrentAddress.id) {
        this.addressForm = this.$store.state.customerCurrentAddress;
      } else {
        let res = await findByDistributorAddressApi();
        if (res.ErrorCode == "9999") {
          this.addressList = res.Data.Results;
          this.addressForm = this.addressList.filter((item) => {
            return item.isDefault == "1";
          })[0];
        }
      }
      this.getShipList();
    },
    //根据地址查询物流渠道
    async getShipList() {
      let res1 = await findByDistributorShipApi({
        countryCode: this.addressForm.countryCode,
      });
      if (res1.ErrorCode == "9999") {
        this.logisticsList = res1.Data.Results;
      }
    },
    //根据物流渠道计算体积重
    calVolume(value) {
      let item = this.logisticsList.filter((item) => {
        return item.id == value;
      });
      // debugger;
      let volumetricWeight = Number(item[0].volumetricWeight);
      console.log(this.form.volumeArr);
      this.form.volume = this.form.volumeArr.reduce((x, y) => {
        let sum = Number(x) / volumetricWeight + Number(y) / volumetricWeight;
        return parseFloat(sum).toFixed(2);
      }, 0);
    },
    onEdit() {
      console.log();
      this.$router.push({
        path: "/addressManage",
        query: {
          id: this.addressForm.id,
          actionType: "select",
        },
      });
    },
    onAdd() {
      this.$router.push({
        path: "/addressManage",
        query: {
          actionType: "select",
        },
      });
    },
    async onSubmit() {
      let sendData = {
        ids: this.form.ids,
        shippingId: this.form.shippingId,
        addressId: this.addressForm.id,
        declareFee: this.form.declareFee,
        declareRemark: this.form.declareRemark,
      };
      if (sendData.addressId && sendData.shippingId) {
        console.log(sendData);
        //提交成功后清空地址信息
        let res = await transportByDistributorApi(sendData);
        if (res.ErrorCode == "9999") {
          this.$toast.success("提交成功");
          this.onClickLeft();
        }
      } else {
        this.$notify("地址和物流渠道都必选");
      }
    },
  },
};
</script>
<style lang="less">
.confirm-send-wrap {
  .content {
    margin: 10px;
    .address-info {
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
    .logistics-info {
      background-color: #fff;
      margin: 8px 0;
      .title {
        text-align: left;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        padding: 10px;
      }
      .box {
        text-align: left;
        .van-cell {
          align-items: center;
        }
        .van-cell__title {
          margin: 0 6px;
        }
        .right-item1 {
          width: 50px;
          margin: 0 6px;
        }
        .right-item2 {
          width: 60px;
        }
      }
    }
    .package-info {
      background-color: #fff;
      margin: 10px 0;
      padding: 10px;
      color: #1087eb;
      font-size: 14px;
    }
    .submit {
      margin: 30px 0;
    }
  }
}
</style>
