<template>
  <div class="pinyou-detail-wrap">
    <div class="header">
      <van-nav-bar :title="headTitle" left-arrow @click-left="onClickLeft" />
    </div>

    <div class="content">
      <div class="section-one">
        <van-grid column-num="2">
          <van-grid-item>
            <template #icon>
              <span class="red">RMB {{ form.price }}</span>
            </template>
            <template #text>
              <span class="gray">{{ form.priceDesc }}</span>
            </template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <span class="red"
                >{{ form.rate }}% ({{ form.signWeight }}kg)</span
              >
            </template>
            <template #text>
              <span class="gray">重量（总重{{ form.maxWeight }}kg）</span>
            </template>
          </van-grid-item>
        </van-grid>
        <van-grid column-num="1" clickable>
          <van-grid-item to="/warehouse">
            <div class="address">
              收货仓库：{{ warehouseAddress }}
              <van-icon name="arrow" />
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <van-form>
        <van-field
          label="进群方式:"
          label-width="80px"
          readonly
          v-model="form.joinType"
        />
        <van-field
          label="收费标准:"
          label-width="80px"
          readonly
          rows="1"
          type="textarea"
          autosize
          v-model="form.feeStandard"
        />
        <van-field
          label="团长名称:"
          label-width="80px"
          readonly
          v-model="form.captain"
        />
        <van-field
          label="联系方式:"
          label-width="80px"
          readonly
          v-model="form.contact"
        />
        <van-field
          label="取货地址:"
          label-width="80px"
          readonly
          rows="1"
          type="textarea"
          autosize
          v-model="form.totalPickupAddress"
        />
        <van-field
          label="取货时间:"
          label-width="80px"
          readonly
          rows="1"
          type="textarea"
          autosize
          v-model="form.pickupDesc"
        />
        <van-field
          label="邮寄限制:"
          label-width="80px"
          readonly
          rows="1"
          type="textarea"
          autosize
          v-model="form.contraband"
        />
      </van-form>
      <div class="fixed-footer">
        <van-button
          round
          block
          type="info"
          @click="onHandleAdd()"
          v-if="!showAddBtn"
          >添加包裹
        </van-button>

        <!-- 已预报的包裹上架了，可以直接参与拼团 -->
        <van-button
          round
          block
          type="info"
          @click="onAddPinyou()"
          v-if="showAddBtn"
          >立即加入
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, Form, Field, Button, Grid, GridItem, Icon } from "vant";
import {
  findGroupOrderApi,
  findTbWarehouseApi,
  saveGroupDetailCustomApi,
} from "@/api/index";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
  },
  data() {
    return {
      headTitle: "拼邮团详情",
      groupName: "",
      groupId: "",
      actionType: "",
      warehouseAddress: "",
      pinyouForm: {},
      form: {
        address: "",
        captain: "",
        city: "",
        companyid: 0,
        contact: "",
        contraband: "",
        country: "",
        declaredWeight: 0,
        endTime: 0,
        groupName: "",
        id: 0,
        joinType: "",
        logisticsid: 0,
        maxWeight: 0,
        pickupDesc: "",
        price: 0,
        priceDesc: "",
        province: "",
        remark: "",
        signWeight: 0,
        warehouseid: 0,
      },
      showAddBtn: false,
    };
  },
  created() {
    this.groupName = this.$route.query.groupName;
    this.groupId = Number(this.$route.query.groupId);
    this.headTitle = this.$route.query.groupName;
    this.initData();
    if (this.$route.query.pinyouData) {
      this.pinyouForm = JSON.parse(this.$route.query.pinyouData);
      this.showAddBtn = true;
    }
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async initAddress(warehouseid) {
      let res = await findTbWarehouseApi({ id: warehouseid });
      if (res && res.ack == 200 && res.data.length > 0) {
        console.log(res.data[0].province + res.data[0].city);
        this.warehouseAddress = res.data[0].province + res.data[0].city;
        console.log(this.warehouseAddress);
      }
    },
    async initData() {
      let res = await findGroupOrderApi({ id: this.groupId });
      if (res && res.ack == "200" && res.data.length > 0) {
        this.form = res.data[0];
        this.form.rate = (
          (res.data[0].signWeight * 100) /
          res.data[0].maxWeight
        ).toFixed(2);
        this.form.totalPickupAddress =
          this.form.country +
          this.form.province +
          (this.form.city == this.form.province ? "" : this.form.city) +
          this.form.address;
        this.initAddress(res.data[0].warehouseid);
      }

      console.log(this.warehouseAddress);
    },
    onHandleAdd() {
      this.$router.push({
        path: "/startTransport",
        query: {
          groupName: this.groupName,
          groupId: this.groupId,
          warehouseid: this.form.warehouseid,
        },
      });
    },
    async onAddPinyou() {
      var sendData = {
        customName: this.$store.state.employee.employeeName,
        customid: this.$store.state.employee.id,
        warehouseid: this.form.warehouseid,
        groupid: this.groupId,
        packageList: [
          {
            goodsType: this.pinyouForm.goodsType,
            remark: this.pinyouForm.remark,
            trackNo: this.pinyouForm.trackNo,
          },
        ],
      };
      let res = await saveGroupDetailCustomApi(sendData);
      if (res && res.ack == 200) {
        this.$router.push({
          path: "/orderManage",
          query: {
            status: "1",
          },
        });
        this.$toast.success(res.msg);
      } else {
        this.$toast.fail(res.msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.pinyou-detail-wrap {
  .content {
    margin: 8px;
    .section-one {
      margin-bottom: 8px;
      .address {
        font-size: 15px;
        .van-icon {
          vertical-align: middle;
        }
      }
      .red {
        color: red;
        font-size: 16px;
        font-weight: 600;
      }
      .gray {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .fixed-footer {
    // position: fixed;
    margin: 20px;
  }
}
</style>
