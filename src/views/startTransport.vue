<template>
  <!-- 添加拼邮包裹，添加预报订单 -->
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
          :value="goodsTypeName"
          label="申报类型"
          placeholder="点击选择"
          @click="showProductType = true"
          :rules="[{ required: true, message: '请选择申报类型' }]"
        />

        <van-field
          required
          v-model="form.trackNo"
          label="快递单号"
          rows="3"
          autosize
          type="textarea"
          placeholder="可以填写多个快递单号，请用逗号,分号，空格，回车键隔开"
          :rules="[{ required: true, message: '请填写快递单号' }]"
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
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
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
        @onChooseType="onChooseType"
      ></chooseProductTypePop>
    </van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  NavBar,
  Form,
  Field,
  Button,
  Col,
  Row,
  Cell,
  Popup,
  Toast,
} from "vant";
import chooseProductTypePop from "./components/chooseProductTypePop";
import {
  findTbWarehouseApi,
  addPackageCustomApi,
  saveGroupDetailCustomApi,
} from "@/api/index";
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
    [Toast.name]: Toast,
  },
  data() {
    return {
      showProductType: false, //默认
      warehouseForm: {}, //仓库地址
      groupName: "",
      groupId: "",
      goodsTypeName: "",
      headTitle: "预报订单",
      form: {
        customName: "",
        customid: "",
        goodsType: 1,
        trackNo: "",
        warehouseid: 1,
        remark: "",
      },
    };
  },
  created() {
    this.form.customName = this.$store.state.employee.employeeName;
    this.form.customid = this.$store.state.employee.id;
    this.groupId = this.$route.query.groupId ? this.$route.query.groupId : "";
    if (this.groupId) {
      //添加拼邮包裹
      this.headTitle = "添加拼邮包裹";
      this.groupName = this.$route.query.groupName;
      this.form.warehouseid = Number(this.$route.query.warehouseid);
      this.initPinyouAddress(this.form.warehouseid);
    } else {
      //初始化仓库地址
      this.initAddress();
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //初始化获取仓库地址列表
    async initAddress() {
      var sendData = { companyid: this.$store.state.employee.companyid };
      let res = await findTbWarehouseApi(sendData);
      if (res && res.ack == 200 && res.data.length > 0) {
        this.warehouseForm = res.data[0]; //默认仓库第一个
        this.form.warehouseid = this.warehouseForm.id;
      } else {
        Toast.fail(res.msg);
      }
    },

    //拼邮过来的时候，根据warehouseid 初始化仓库地址
    async initPinyouAddress(id) {
      var sendData = { companyid: this.$store.state.employee.companyid };
      let res = await findTbWarehouseApi(sendData);
      if (res && res.ack == 200 && res.data.length > 0) {
        this.warehouseForm = res.data.filter((item) => {
          return item.id == id;
        })[0];
      } else {
        Toast.fail(res.msg);
      }
    },
    //选择申报类型
    closeProductTypePop() {
      this.showProductType = false;
    },
    onChooseType(item) {
      console.log(item);
      this.showProductType = false;
      this.form.goodsType = Number(item.id);
      this.goodsTypeName = item.name;
    },
    //去邮寄限制页面
    goToPostLimit() {
      this.$router.push("/postLimit");
    },
    //更换仓库地址,暂时只有一个仓库
    onChangeWarehouse() {
      this.$router.push("/warehouse");
    },
    //添加拼邮包裹接口
    async saveGroupDetailCustom() {
      var sendData = {
        customName: this.form.customName,
        customid: this.form.customid,
        warehouseid: this.form.warehouseid,
        groupid: this.groupId,
        packageList: [
          {
            goodsType: this.form.goodsType,
            remark: this.form.remark,
            trackNo: this.form.trackNo,
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
        Toast.success(res.msg);
      } else {
        Toast.fail(res.msg);
      }
    },
    //添加新的预报订单接口
    async addPackageCustom() {
      let res = await addPackageCustomApi(this.form);
      if (res && res.ack == 200) {
        this.$router.push({
          path: "/orderManage",
          query: {
            status: "1",
          },
        });
        Toast.success(res.msg);
      } else {
        Toast.fail(res.msg);
      }
    },
    //提交
    onSubmit(values) {
      console.log(this.form);
      // let trackNos =
      //   (this.form.trackNo &&
      //     this.form.trackNo.split(/,|，|\s |\r | ；|;/gi)) ||
      //   [];
      if (this.groupId) {
        this.saveGroupDetailCustom();
      } else {
        this.addPackageCustom();
      }
    },
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
