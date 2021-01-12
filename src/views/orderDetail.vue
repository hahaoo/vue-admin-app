<template>
  <div class="order-detail">
    <div class="header">
      <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <div class="address">
        <h3>收货地址</h3>
        <van-form size="mini">
          <van-field
            label="收货人:"
            label-width="80px"
            placeholder="收货人姓名"
            readonly
            v-model="addressForm.customerName"
          />
          <van-field
            label="手机号码:"
            label-width="80px"
            readonly
            v-model="addressForm.customerMobile"
          />
          <van-field
            label="E-mail:"
            placeholder="无"
            label-width="80px"
            readonly
            v-model="addressForm.customerEmail"
          />
          <van-field
            label="邮政编码:"
            placeholder="无"
            label-width="80px"
            readonly
            v-model="addressForm.customerZipcode"
          />
          <van-field
            label="国家:"
            placeholder="无"
            label-width="80px"
            readonly
            v-model="addressForm.customerCountry"
          />
          <van-field
            label="省份/州:"
            label-width="80px"
            readonly
            v-model="addressForm.customerProvince"
          />
          <van-field
            label="城市:"
            label-width="80px"
            readonly
            v-model="addressForm.customerCity"
          />
          <van-field
            label="街道详细:"
            rows="1"
            autosize
            type="textarea"
            label-width="80px"
            readonly
            v-model="addressForm.customerAddress"
          />
        </van-form>
      </div>
      <div class="package">
        <h3>包裹详情 ({{ basicForm.packageNo }}个)</h3>
        <div class="order-card" v-for="(item, index) in packages" :key="index">
          <van-cell-group>
            <van-cell>
              <template #title>
                <div class="title">
                  <span class="custom-title"
                    >({{ parseInt(index) + 1 }}) 国内物流单号：{{
                      item.trackNo
                    }}
                  </span>
                </div>
              </template>
            </van-cell>
          </van-cell-group>
          <van-card
            :title="item.remark"
            :desc="item.type == 2 ? item.groupName : ''"
            :thumb="item.pic ? item.pic : '3.png'"
            currency=""
          >
          </van-card>
          <van-cell-group>
            <van-cell>
              <template #title>
                <span class="summary-title">
                  <span style="display: inline-blocl; margin-right: 10px"
                    >实重：{{ item.weight }}(g)</span
                  >体积：{{ item[length] }}*{{ item.width }}*{{ item.height }}
                  cm³
                </span>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>

      <div class="summary">
        <h3>出库重量</h3>
        <div class="text">总重量：{{ basicForm.weight }}(g)</div>
      </div>

      <div class="fee">
        <h3>运费详情</h3>
        <div class="text">
          <p>物流渠道：{{ basicForm.actualLogistics }}</p>
          <p>转运包裹单号：{{ basicForm.deliverTrackNo }}</p>
          <p>实际运费（￥）：{{ basicForm.shippingFee }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { NavBar, Form, Field, Cell, CellGroup, Card } from "vant";
import { findDeliverOrderDetailApi } from "@/api/index";
export default {
  name: "postLimit",
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Form.name]: Form,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Card.name]: Card,
  },
  data() {
    return {
      basicForm: {},
      addressForm: {},
      packages: [],
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async getDetail() {
      var id = this.$route.query.id;
      let res = await findDeliverOrderDetailApi({
        companyid: this.$store.state.employee.companyid,
        id: id,
      });
      if (res && res.ack == 200) {
        this.addressForm = res.data.deliverPlus;
        this.packages = res.data.pgList;
        this.basicForm = res.data.deliverOrder;
      }
    },
  },
};
</script>
<style lang="less">
.order-detail {
  margin-bottom: 30px;
  h3 {
    font-size: 14px;
    text-align: left;
    margin: 10px;
  }
}

.address {
  .van-cell {
    line-height: 18px;
    font-size: 13px;
    padding: 6px 15px;
  }
}
.package {
  .order-card {
    text-align: left;
    margin-top: 5px;
    .van-card {
      margin-top: 0px;
      background-color: #fff;

      .van-card__title {
        font-size: 14px;
        margin: 5px 0;
      }

      .van-card__desc {
        margin: 6px 0px;
        font-size: 12px;
      }
      .van-card__price-integer {
        color: red;
        font-size: 12px;
      }
      .van-card__num {
        font-size: 14px;
      }
    }
  }
}
.summary {
  text-align: left;
  .text {
    padding: 10px 10px;
    background-color: #fff;
    font-size: 14px;
  }
}
.fee {
  text-align: left;
  .text {
    padding: 10px;
    background-color: #fff;
    font-size: 14px;
  }
  p {
    margin-bottom: 5px;
  }
}
</style>
