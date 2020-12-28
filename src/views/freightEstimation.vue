<template>
  <div class="freight-wrap">
    <div class="header">
      <van-nav-bar :title="headTitle" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          label="出发地:"
          label-width="80px"
          readonly
          class="depature"
          v-model="form.departure"
        />

        <van-field
          label="目的地:"
          label-width="80px"
          placeholder="点击选择目的地国家"
          readonly
          clickable
          @click="onChooseCountry()"
          v-model="tempCountryName"
        />
        <van-field
          readonly
          clickable
          :value="form.type"
          label="申报类型"
          placeholder="点击选择"
          @click="showProductType = true"
        />
        <van-field
          label="包裹重量:"
          label-width="80px"
          type="number"
          placeholder="请填写包裹重量（kg）"
          v-model="form.weight"
        />
        <van-field name="stepper" label-width="80px" label="体积:">
          <template #input>
            <div>
              长：
              <van-stepper
                v-model="form.voloum"
                step="0.2"
                :decimal-length="2"
                input-width="50px"
                button-size="30px"
              />
            </div>
          </template>
        </van-field>

        <div class="note-box">
          <p class="red">温馨提示：</p>
          <p class="red">
            *因近期国内外疫情影响，航班持续调价，建议有需要的客户尽快提交转运订单，
            避免价格波动补差价的情况。物流时效 预计延迟
            5-7个工作日，谢谢大家的理解和支持。
          </p>
          <P>
            <span class="red">*</span
            >以上查询到的运费默认按普货计算，计费重量按体积重（长*宽*高/6000）与实重中较大者计算。
          </P>
          <p><span class="red">*</span>食品和化妆品另加收￥20.00/kg。</p>
          <p>
            <span class="red">*</span>带点电磁商品另加收￥10.00/kg
            处理费，每单最低按￥80.00 收取。
          </p>
        </div>
        <div style="margin: 26px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            style="margin-bottom: 16px"
            >立即查询</van-button
          >
        </div>
      </van-form>
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
    <!-- 申报类型展示 -->
    <van-popup
      v-model="showProductType"
      position="right"
      :style="{ height: '100%', width: '100%', background: '#f2f2f2' }"
    >
      <chooseProductTypePop
        @closeProductTypePop="closeProductTypePop"
      ></chooseProductTypePop>
    </van-popup>
    <van-popup
      v-model="showFeeList"
      :style="{ height: '100%', width: '100%' }"
      get-container="#app"
    >
      <div class="header">
        <van-nav-bar title="邮寄查询" left-arrow @click-left="onClosePop" />
      </div>

      <div class="result-content">
        <van-row class="header">
          <van-col span="12">
            <div class="label">目的地</div>
            <div>{{ tempCountryName }}</div>
          </van-col>
          <van-col span="12">
            <div class="label">包裹重量</div>
            <div>{{ form.weight ? form.weight : 0 }} (kg)</div>
          </van-col>
        </van-row>

        <div v-if="feeList.length > 0">
          <div class="list">
            <van-cell-group>
              <van-cell
                :value="'￥' + item.shippingFee"
                v-for="(item, index) in feeList"
                :key="index"
              >
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <span class="custom-title">{{ item.logistics }}</span>
                </template>
                <template #right-icon>
                  <van-button round size="mini" type="info" @click="goToApply()"
                    >立即转运</van-button
                  >
                </template>
              </van-cell>
            </van-cell-group>
          </div>
        </div>
        <div v-else>
          <h2>暂无数据</h2>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import chooseProductTypePop from "./components/chooseProductTypePop";
import { getCountrysApi } from "@/api/index";
import {
  NavBar,
  Form,
  Field,
  Button,
  Popup,
  Picker,
  Col,
  Row,
  Cell,
  CellGroup,
  Stepper,
} from "vant";
export default {
  components: {
    chooseProductTypePop,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Stepper.name]: Stepper,
  },
  data() {
    return {
      headTitle: "运费估算",
      tempCountryName: "测试",
      countryList: [],
      isDefault: false, //
      form: {
        departure: "中国仓",
        countryCode: "",
        weight: "",
        voloum: "",
      },
      showProductType: false, //默认
      show: false, //国家的选择
      showFeeList: false, // 查询结果
      feeList: [
        {
          tempCountryName: "测试",
          shippingFee: "100",
          logistics: "测试渠道",
        },
        {
          tempCountryName: "测试",
          shippingFee: "100",
          logistics: "测试渠道",
        },
      ],
    };
  },
  created() {
    // this.initData();
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
      this.show = true;
    },
    onConfirm(item) {
      console.log(item);
      var checkedValue = this.$refs.picker.getValues();
      this.tempCountryName = item[1];
      this.form.countryCode = checkedValue[1].code2;
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    async onSubmit() {
      console.log(this.form);
      this.showFeeList = true;
      // var volumeArr = (this.form.voloum &&
      //   this.form.voloum.split(/,|，/gi)) || [0, 0, 0];
      // var sendData = {
      //   countryCode: this.form.countryCode,
      //   weight: 1000 * Number(this.form.weight),
      //   long: Number(volumeArr[0]),
      //   width: Number(volumeArr[1]),
      //   height: Number(volumeArr[2]),
      // };
      // let res = await getShippingFeeByWeight(sendData);
      // if (res && res.ErrorCode == "9999") {
      //   this.showFeeList = true;
      //   this.feeList = res.Data.Results;
      // }
    },
    onClosePop() {
      this.showFeeList = false;
    },
    closeProductTypePop() {
      this.showProductType = false;
    },
    goToApply() {
      this.$router.push("/startTransport");
    },
  },
};
</script>
<style lang="less">
.freight-wrap {
  .content {
    margin: 8px 0;
    .depature {
      .van-field__control {
        color: #1087eb;
      }
    }
    .note-box {
      text-align: left;
      padding: 20px 10px;
      p {
        font-size: 12px;
        margin-bottom: 8px;
        color: #999;
      }
      .red {
        color: red;
      }
    }
  }
}
.result-content {
  // margin: 10px 0;
  .header {
    font-size: 14px;
    background: #eee;
    padding: 10px;
    .label {
      color: #999;
      font-size: 12px;
    }
  }

  .list {
    // margin: 30px 10px;
    .van-cell__value {
      text-align: center;
      color: red;
    }
  }
}
</style>
