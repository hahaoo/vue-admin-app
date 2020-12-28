<template>
  <!-- 修改预报物流，添加拼邮包裹，添加预报订单 -->
  <div class="transport-wrap">
    <div class="header">
      <van-nav-bar :title="headTitle" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <div class="pinyou-team-box" v-if="groupName">{{ groupName }}</div>
      <van-form @submit="onSubmit" class="form">
        <van-field
          required
          readonly
          clickable
          :value="form.type"
          label="申报类型"
          placeholder="点击选择"
          @click="showProductType = true"
        />

        <van-field
          required
          v-model="form.trackNumber"
          label="快递单号"
          rows="3"
          autosize
          type="textarea"
          placeholder="可以填写多个快递单号，请用逗号,分号，空格，回车键隔开"
        >
        </van-field>
        <van-field
          v-model="form.remark"
          label="商品备注"
          rows="3"
          autosize
          type="textarea"
          placeholder="在这里您可以告诉我们商品颜色尺寸等信息"
        ></van-field>

        <div class="address-info">
          <div class="address-inner">
            <van-cell icon="location-o" is-link @click="onChangeWarehouse()">
              <template #title>
                <div class="van-address-item__name">
                  {{ warehouseForm.contact }}转{{ warehouseForm.creatorName }}
                  {{ warehouseForm.tel }}
                </div>
                <div class="van-address-item__address">
                  {{ warehouseForm.province }}{{ warehouseForm.city
                  }}{{ warehouseForm.district }}{{ warehouseForm.address }}({{
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
            <span class="note">
              详见
              <a style="color: #1096f0" @click="goToPostLimit()"
                >《邮寄限制》
              </a>
            </span>
          </van-row>
          <van-row>
            <span class="title">收费标准:</span>
            <span class="note"
              >入库重量和预估运费仅做参考，实际计费重量和运费以打包之后的数据为准，打包完成会根据实际费用选择合适的运输方式寄送。</span
            >
          </van-row>
          <van-row>
            <span class="title">注意:</span>
            <span class="note">提交包裹后注意去添加物流信息</span>
          </van-row>
        </div>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>

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
  </div>
</template>

<script>
// @ is an alias to /src
import { NavBar, Form, Field, Button, Col, Row, Cell, Popup } from "vant";
import chooseProductTypePop from "./components/chooseProductTypePop";
import { findTbWarehouseApi } from "@/api/index";
export default {
  name: "package",
  components: {
    chooseProductTypePop,
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
  },
  data() {
    return {
      showProductType: false, //默认
      warehouseForm: {}, //仓库地址
      groupName: "",
      groupId: "",
      headTitle: "预报订单",
      form: {
        number: "",
        addressId: "",
      },
    };
  },
  created() {
    this.groupId = this.$route.query.groupId ? this.$route.query.groupId : "";
    if (this.groupId) {
      //添加拼邮包裹
      this.headTitle = "添加拼邮包裹";
      this.groupName = this.$route.query.groupName;
    }
    //初始化仓库地址
    this.initData();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    //初始化获取仓库地址列表
    async initData() {
      let res = await findTbWarehouseApi();
      if (res && res.ack == 200 && res.data.length > 0) {
        this.warehouseForm = res.data[0]; //默认仓库
        this.form.addressId = this.warehouseForm.id;
      }
    },

    closeProductTypePop() {
      this.showProductType = false;
    },
    goToPostLimit() {
      this.$router.push("/postLimit");
    },
    //更换仓库地址
    onChangeWarehouse() {
      this.$router.push("/warehouse");
    },
    //添加拼邮包裹

    //添加新的预报订单
    onSubmit() {},
  },
};
</script>
<style lang="less">
.transport-wrap {
  .content {
    .pinyou-team-box {
      background: #fff;
      margin: 10px 0;
      padding: 10px;
      font-size: 16px;
      color: #1087eb;
    }
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
